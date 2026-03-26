'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { PageHero } from '@/app/components/PageHero'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'
import type { CarListing, CarsFiltersResponse, CarsListResponse } from '@/app/lib/cars-api'
import { buildCarsQuery, getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

const SORT_MAP: Record<string, string> = {
  newest: 'newest',
  'price-asc': 'price_asc',
  'price-desc': 'price_desc',
  'year-asc': 'year_asc',
  'year-desc': 'year_desc',
}

export default function NewCarsPage() {
  const searchParams = useSearchParams()
  const [selectedBrands, setSelectedBrands] = useState<number[]>([])
  const [selectedModelId, setSelectedModelId] = useState<number | ''>('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFuel, setSelectedFuel] = useState<string[]>([])
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([])
  const [yearMin, setYearMin] = useState('')
  const [yearMax, setYearMax] = useState('')
  const [seatingCapacity, setSeatingCapacity] = useState('')
  const [engineCapacityMin, setEngineCapacityMin] = useState('')
  const [engineCapacityMax, setEngineCapacityMax] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)
  const [cars, setCars] = useState<CarListing[]>([])
  const [meta, setMeta] = useState<CarsListResponse['meta'] | null>(null)
  const [filters, setFilters] = useState<CarsFiltersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const toggleBrand = (brandId: number) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    )
  }

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    )
  }

  const toggleFuel = (fuelId: string) => {
    setSelectedFuel(prev => 
      prev.includes(fuelId) 
        ? prev.filter(f => f !== fuelId)
        : [...prev, fuelId]
    )
  }

  const toggleTransmission = (transId: string) => {
    setSelectedTransmission(prev => 
      prev.includes(transId) 
        ? prev.filter(t => t !== transId)
        : [...prev, transId]
    )
  }

  const [filtersOpen, setFiltersOpen] = useState(false)

  // Sync URL params from ServiceTabs (e.g. /new-cars?brand=hyundai&price_min=500000)
  useEffect(() => {
    const brandId = searchParams.get('brand_id')
    if (brandId && !Number.isNaN(Number(brandId))) setSelectedBrands([Number(brandId)])
    const pMin = searchParams.get('price_min')
    const pMax = searchParams.get('price_max')
    if (pMin != null || pMax != null) {
      setPriceRange([
        pMin ? Math.max(0, Math.min(100, Number(pMin) / 100000)) : 0,
        pMax ? Math.max(0, Math.min(100, Number(pMax) / 100000)) : 100,
      ])
    }
  }, [searchParams])

  const fetchCars = useCallback(async () => {
    setLoading(true)
    setFetchError(null)
    const params: Record<string, unknown> = {
      per_page: 15,
      page,
      sort: SORT_MAP[sortBy] ?? 'newest',
    }
    if (searchQuery.trim()) params.search = searchQuery.trim()
    if (priceRange[0] > 0) params.price_min = Math.round(priceRange[0] * 100000)
    if (priceRange[1] < 100) params.price_max = Math.round(priceRange[1] * 100000)
    if (selectedBrands.length > 0) params.brand_id = selectedBrands.length === 1 ? selectedBrands[0] : selectedBrands
    if (selectedModelId !== '') params.vehicle_model_id = selectedModelId
    if (selectedCategoryId !== '') params.category_id = selectedCategoryId
    if (selectedTypes.length > 0) params.body_type = selectedTypes[0]
    if (selectedFuel.length > 0) params.fuel_type = selectedFuel[0]
    if (selectedTransmission.length > 0) params.transmission = selectedTransmission[0]
    if (yearMin.trim()) params.year_min = Number(yearMin)
    if (yearMax.trim()) params.year_max = Number(yearMax)
    if (seatingCapacity.trim()) params.seating_capacity = Number(seatingCapacity)
    if (engineCapacityMin.trim()) params.engine_capacity_min = Number(engineCapacityMin)
    if (engineCapacityMax.trim()) params.engine_capacity_max = Number(engineCapacityMax)
    const query = buildCarsQuery(params)
    try {
      const res = await fetch(`/api/cars/new${query ? `?${query}` : ''}`)
      const data = await res.json()
      if (!res.ok) {
        setFetchError((data as { message?: string }).message ?? 'Failed to load cars')
        setCars([])
        setMeta(null)
        return
      }
      const raw = data as CarsListResponse & { data?: CarsListResponse }
      const list = raw.data ?? raw
      setCars(list.cars ?? [])
      setMeta(list.meta ?? null)
    } catch {
      setFetchError('Failed to load cars')
      setCars([])
      setMeta(null)
    } finally {
      setLoading(false)
    }
  }, [page, sortBy, searchQuery, priceRange, selectedBrands, selectedModelId, selectedCategoryId, selectedTypes, selectedFuel, selectedTransmission, yearMin, yearMax, seatingCapacity, engineCapacityMin, engineCapacityMax])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  useEffect(() => {
    fetch('/api/cars/filters?type=new')
      .then((res) => res.json())
      .then((data) => {
        const raw = data as CarsFiltersResponse & { data?: CarsFiltersResponse }
        setFilters(raw.data ?? raw)
      })
      .catch(() => setFilters(null))
  }, [])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, priceRange, selectedBrands, selectedModelId, selectedCategoryId, selectedTypes, selectedFuel, selectedTransmission, yearMin, yearMax, seatingCapacity, engineCapacityMin, engineCapacityMax])

  const brands = filters?.brands ?? []
  const modelOptions = filters?.vehicle_models ?? []
  const categoryOptions = filters?.categories ?? []
  const fuelTypes = filters?.fuel_types ?? []
  const transmissionTypes = filters?.transmissions ?? []
  const bodyTypes = filters?.body_types ?? []

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        eyebrow="Browse & compare"
        title={
          <>
            New <span className="text-[var(--pbmit-xclean-global-color)]">Cars</span>
          </>
        }
        subtitle="Find your perfect new car from authorized dealers. Filter by brand, budget, fuel type, and more."
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Input 
            type="text" 
            placeholder="Search by car name or brand..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 min-w-0"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              Filters
            </button>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 border rounded-md text-sm flex-1 sm:flex-initial min-w-0"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-asc">Year: Old to New</option>
              <option value="year-desc">Year: New to Old</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <Card className="lg:sticky lg:top-24">
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button type="button" className="lg:hidden p-1 rounded hover:bg-gray-100" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="mb-2 block">Price Range (₹ Lakh)</Label>
                  <Slider 
                    value={priceRange} 
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]} Lakh</span>
                    <span>₹{priceRange[1]} Lakh+</span>
                  </div>
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <Label className="mb-2 block">Brand</Label>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`new-brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onCheckedChange={() => toggleBrand(brand.id)}
                        />
                        <Label htmlFor={`new-brand-${brand.id}`} className="text-sm cursor-pointer flex-1">
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="mb-2 block">Model</Label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  >
                    <option value="">All models</option>
                    {modelOptions.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <Label className="mb-2 block">Category</Label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-white"
                  >
                    <option value="">All categories</option>
                    {categoryOptions.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Type */}
                <div className="mb-6">
                  <Label className="mb-2 block">Body Type</Label>
                  <div className="space-y-2">
                    {bodyTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`body-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => toggleType(type)}
                        />
                        <Label htmlFor={`body-${type}`} className="text-sm cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-2">
                  <div>
                    <Label className="mb-2 block">Year min</Label>
                    <Input value={yearMin} onChange={(e) => setYearMin(e.target.value)} placeholder="e.g. 2020" />
                  </div>
                  <div>
                    <Label className="mb-2 block">Year max</Label>
                    <Input value={yearMax} onChange={(e) => setYearMax(e.target.value)} placeholder="e.g. 2025" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="mb-2 block">Seating capacity</Label>
                  <Input value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} placeholder="e.g. 5" />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-2">
                  <div>
                    <Label className="mb-2 block">Engine min (cc)</Label>
                    <Input value={engineCapacityMin} onChange={(e) => setEngineCapacityMin(e.target.value)} placeholder="e.g. 1000" />
                  </div>
                  <div>
                    <Label className="mb-2 block">Engine max (cc)</Label>
                    <Input value={engineCapacityMax} onChange={(e) => setEngineCapacityMax(e.target.value)} placeholder="e.g. 2500" />
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="mb-6">
                  <Label className="mb-2 block">Fuel Type</Label>
                  <div className="space-y-2">
                    {fuelTypes.map((fuel) => (
                      <div key={fuel} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`fuel-${fuel}`}
                          checked={selectedFuel.includes(fuel)}
                          onCheckedChange={() => toggleFuel(fuel)}
                        />
                        <Label htmlFor={`fuel-${fuel}`} className="text-sm cursor-pointer">
                          {fuel}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="mb-6">
                  <Label className="mb-2 block">Transmission</Label>
                  <div className="space-y-2">
                    {transmissionTypes.map((trans) => (
                      <div key={trans} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`trans-${trans}`}
                          checked={selectedTransmission.includes(trans)}
                          onCheckedChange={() => toggleTransmission(trans)}
                        />
                        <Label htmlFor={`trans-${trans}`} className="text-sm cursor-pointer">
                          {trans}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedBrands([])
                    setSelectedModelId('')
                    setSelectedCategoryId('')
                    setSelectedTypes([])
                    setSelectedFuel([])
                    setSelectedTransmission([])
                    setYearMin('')
                    setYearMax('')
                    setSeatingCapacity('')
                    setEngineCapacityMin('')
                    setEngineCapacityMax('')
                    setPriceRange([0, 100])
                    setSearchQuery('')
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Cars Grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm sm:text-base text-gray-600">
                {meta ? `${meta.total} cars found` : loading ? 'Loading…' : fetchError ? '' : '0 cars found'}
              </p>
            </div>

            {fetchError && (
              <div className="py-8 text-center">
                <p className="text-destructive mb-4">{fetchError}</p>
                <Button variant="outline" onClick={() => fetchCars()}>Try again</Button>
              </div>
            )}

            {loading && !fetchError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-video bg-gray-100 animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                      <div className="h-5 bg-gray-100 rounded animate-pulse w-1/2" />
                      <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3 mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && !fetchError && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {cars.map((car) => {
                    const name = getCarDisplayName(car)
                    const imageUrl = getCarImageUrl(car)
                    return (
                      <Link href={`/cars/${car.id}`} key={car.id}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                          <div className="aspect-video relative bg-white flex items-center justify-center p-3 sm:p-4">
                            {imageUrl ? (
                              <img src={imageUrl} alt={name} className="max-w-full max-h-full object-contain" />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">No image</div>
                            )}
                          </div>
                          <CardContent className="p-3 sm:p-4">
                            <p className="text-xs sm:text-sm text-gray-500">{car.vehicleModel?.brand?.name ?? '—'}</p>
                            <h3 className="font-semibold text-base sm:text-lg">{name}</h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                              {car.fuel_type && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.fuel_type}</span>}
                              {car.transmission && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.transmission}</span>}
                              {car.seating_capacity != null && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.seating_capacity} Seats</span>}
                            </div>
                            {car.price != null && (
                              <p className="text-primary font-bold text-lg sm:text-xl mt-2">
                                ₹{car.price.toLocaleString('en-IN')}
                              </p>
                            )}
                            <Button className="w-full mt-2" size="sm">
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>

                {meta && meta.last_page > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                    <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600 px-2">
                      Page {meta.current_page} of {meta.last_page}
                    </span>
                    <Button variant="outline" size="sm" disabled={page >= meta.last_page} onClick={() => setPage((p) => p + 1)}>
                      Next
                    </Button>
                  </div>
                )}

                {cars.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No cars match your filters</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSelectedBrands([])
                        setSelectedModelId('')
                        setSelectedCategoryId('')
                        setSelectedTypes([])
                        setSelectedFuel([])
                        setSelectedTransmission([])
                        setYearMin('')
                        setYearMax('')
                        setSeatingCapacity('')
                        setEngineCapacityMin('')
                        setEngineCapacityMax('')
                        setPriceRange([0, 100])
                        setSearchQuery('')
                        setPage(1)
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

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
import type { CarListing, CarsListResponse } from '@/app/lib/cars-api'
import { buildCarsQuery, getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

const carBrands = [
  { id: 'maruti', label: 'Maruti Suzuki', count: 45 },
  { id: 'hyundai', label: 'Hyundai', count: 32 },
  { id: 'tata', label: 'Tata', count: 28 },
  { id: 'mahindra', label: 'Mahindra', count: 22 },
  { id: 'toyota', label: 'Toyota', count: 18 },
  { id: 'honda', label: 'Honda', count: 15 },
  { id: 'kia', label: 'Kia', count: 12 },
  { id: 'mg', label: 'MG', count: 10 },
  { id: 'volkswagen', label: 'Volkswagen', count: 8 },
  { id: 'skoda', label: 'Skoda', count: 7 },
]

const budgetRanges = [
  { id: '5-10', label: '₹5 - 10 Lakh', min: 5, max: 10 },
  { id: '10-15', label: '₹10 - 15 Lakh', min: 10, max: 15 },
  { id: '15-20', label: '₹15 - 20 Lakh', min: 15, max: 20 },
  { id: '20-30', label: '₹20 - 30 Lakh', min: 20, max: 30 },
  { id: '30-50', label: '₹30 - 50 Lakh', min: 30, max: 50 },
  { id: '50+', label: '₹50 Lakh+', min: 50, max: 100 },
]

const vehicleTypes = [
  { id: 'suv', label: 'SUV', icon: '🚙' },
  { id: 'sedan', label: 'Sedan', icon: '🚗' },
  { id: 'hatchback', label: 'Hatchback', icon: '🚙' },
  { id: 'mpv', label: 'MPV', icon: '🚐' },
  { id: 'coupe', label: 'Coupe', icon: '🏎️' },
  { id: 'convertible', label: 'Convertible', icon: '🏎️' },
]

const fuelTypes = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'electric', label: 'Electric' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'cng', label: 'CNG' },
]

const transmissionTypes = [
  { id: 'manual', label: 'Manual' },
  { id: 'automatic', label: 'Automatic' },
]

const SORT_MAP: Record<string, string> = {
  popular: 'newest',
  'price-low': 'price_asc',
  'price-high': 'price_desc',
  name: 'year_desc',
}

export default function NewCarsPage() {
  const searchParams = useSearchParams()
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFuel, setSelectedFuel] = useState<string[]>([])
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [page, setPage] = useState(1)
  const [cars, setCars] = useState<CarListing[]>([])
  const [meta, setMeta] = useState<CarsListResponse['meta'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(b => b !== brandId)
        : [...prev, brandId]
    )
  }

  const toggleBudget = (budgetId: string) => {
    setSelectedBudget(prev => 
      prev.includes(budgetId) 
        ? prev.filter(b => b !== budgetId)
        : [...prev, budgetId]
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
    const brand = searchParams.get('brand')
    if (brand) setSelectedBrands([brand])
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
    if (selectedTypes.length > 0) params.body_type = selectedTypes[0]
    if (selectedFuel.length > 0) params.fuel_type = selectedFuel[0]
    if (selectedTransmission.length > 0) params.transmission = selectedTransmission[0]
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
  }, [page, sortBy, searchQuery, priceRange, selectedBrands, selectedTypes, selectedFuel, selectedTransmission])

  useEffect(() => {
    fetchCars()
  }, [fetchCars])

  useEffect(() => {
    setPage(1)
  }, [searchQuery, priceRange, selectedBrands, selectedTypes, selectedFuel, selectedTransmission])

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
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
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
                    {carBrands.map(brand => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={brand.id}
                          checked={selectedBrands.includes(brand.id)}
                          onCheckedChange={() => toggleBrand(brand.id)}
                        />
                        <Label htmlFor={brand.id} className="text-sm cursor-pointer flex-1">
                          {brand.label}
                        </Label>
                        <span className="text-xs text-gray-500">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vehicle Type */}
                <div className="mb-6">
                  <Label className="mb-2 block">Vehicle Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicleTypes.map(type => (
                      <div 
                        key={type.id}
                        className={`p-2 border rounded-md text-center cursor-pointer ${
                          selectedTypes.includes(type.id) ? 'border-primary bg-primary/10' : ''
                        }`}
                        onClick={() => toggleType(type.id)}
                      >
                        <span className="text-lg">{type.icon}</span>
                        <p className="text-xs">{type.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="mb-6">
                  <Label className="mb-2 block">Fuel Type</Label>
                  <div className="space-y-2">
                    {fuelTypes.map(fuel => (
                      <div key={fuel.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`fuel-${fuel.id}`}
                          checked={selectedFuel.includes(fuel.id)}
                          onCheckedChange={() => toggleFuel(fuel.id)}
                        />
                        <Label htmlFor={`fuel-${fuel.id}`} className="text-sm cursor-pointer">
                          {fuel.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div className="mb-6">
                  <Label className="mb-2 block">Transmission</Label>
                  <div className="space-y-2">
                    {transmissionTypes.map(trans => (
                      <div key={trans.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`trans-${trans.id}`}
                          checked={selectedTransmission.includes(trans.id)}
                          onCheckedChange={() => toggleTransmission(trans.id)}
                        />
                        <Label htmlFor={`trans-${trans.id}`} className="text-sm cursor-pointer">
                          {trans.label}
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
                    setSelectedBudget([])
                    setSelectedTypes([])
                    setSelectedFuel([])
                    setSelectedTransmission([])
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
                        setSelectedBudget([])
                        setSelectedTypes([])
                        setSelectedFuel([])
                        setSelectedTransmission([])
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

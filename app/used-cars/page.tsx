'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Filter, X } from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'

const carBrands = [
  { id: 'maruti', label: 'Maruti Suzuki', count: 156 },
  { id: 'hyundai', label: 'Hyundai', count: 98 },
  { id: 'honda', label: 'Honda', count: 67 },
  { id: 'tata', label: 'Tata', count: 54 },
  { id: 'toyota', label: 'Toyota', count: 45 },
  { id: 'mahindra', label: 'Mahindra', count: 38 },
  { id: 'vw', label: 'Volkswagen', count: 29 },
  { id: 'ford', label: 'Ford', count: 24 },
  { id: 'kia', label: 'Kia', count: 18 },
  { id: 'mg', label: 'MG', count: 15 },
]

const budgetRanges = [
  { id: '1-3', label: '₹1 - 3 Lakh', min: 1, max: 3 },
  { id: '3-5', label: '₹3 - 5 Lakh', min: 3, max: 5 },
  { id: '5-10', label: '₹5 - 10 Lakh', min: 5, max: 10 },
  { id: '10-15', label: '₹10 - 15 Lakh', min: 10, max: 15 },
  { id: '15-25', label: '₹15 - 25 Lakh', min: 15, max: 25 },
  { id: '25+', label: '₹25 Lakh+', min: 25, max: 100 },
]

const vehicleTypes = [
  { id: 'suv', label: 'SUV', icon: '🚙' },
  { id: 'sedan', label: 'Sedan', icon: '🚗' },
  { id: 'hatchback', label: 'Hatchback', icon: '🚙' },
  { id: 'mpv', label: 'MPV', icon: '🚐' },
]

const fuelTypes = [
  { id: 'petrol', label: 'Petrol' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'cng', label: 'CNG' },
]

const transmissionTypes = [
  { id: 'manual', label: 'Manual' },
  { id: 'automatic', label: 'Automatic' },
]

const yearRanges = [
  { id: '2024', label: '2024 & Above' },
  { id: '2023', label: '2023 & Above' },
  { id: '2022', label: '2022 & Above' },
  { id: '2021', label: '2021 & Above' },
  { id: '2020', label: '2020 & Above' },
]

const cities = [
  { id: 'delhi', label: 'Delhi NCR', count: 245 },
  { id: 'mumbai', label: 'Mumbai', count: 189 },
  { id: 'bangalore', label: 'Bangalore', count: 156 },
  { id: 'hyderabad', label: 'Hyderabad', count: 98 },
  { id: 'chennai', label: 'Chennai', count: 87 },
  { id: 'pune', label: 'Pune', count: 76 },
]

const usedCars = [
  { id: 1, brand: 'Hyundai', name: 'Grand i10', price: 284000, year: 2014, km: 45000, fuel: 'petrol', transmission: 'manual', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-15/ed81e15b2dbc4b4188efcadb2ce5d2ee/raw/file.JPG' },
  { id: 2, brand: 'Hyundai', name: 'Eon', price: 277000, year: 2019, km: 32000, fuel: 'petrol', transmission: 'manual', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-15/72a701a0fd584b3497978dd36454c007/raw/file.JPG' },
  { id: 3, brand: 'Hyundai', name: 'Santro', price: 311000, year: 2019, km: 38000, fuel: 'petrol', transmission: 'manual', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-14/6dc40f28fabe47a0991f05d1f670e1c0/raw/file.JPG' },
  { id: 4, brand: 'Maruti', name: 'Baleno', price: 387000, year: 2017, km: 52000, fuel: 'petrol', transmission: 'manual', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-12/cfbfd6c56b3d4e6b8262d1b10f72c5dd/raw/file.JPG' },
  { id: 5, brand: 'Honda', name: 'City', price: 699000, year: 2018, km: 41000, fuel: 'petrol', transmission: 'automatic', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-11/47aab35b75dd4c80825fffafc68dfb62/raw/file.JPG' },
  { id: 6, brand: 'Maruti', name: 'Baleno', price: 690000, year: 2023, km: 12000, fuel: 'petrol', transmission: 'automatic', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-13/62d353a458f24839840abb0315cefef3/raw/file.JPG' },
  { id: 7, brand: 'Volkswagen', name: 'Taigun', price: 1247208, year: 2023, km: 18000, fuel: 'petrol', transmission: 'automatic', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-13/205ccdebf2494aada99efcb11e4ad63a/raw/file.JPG' },
  { id: 8, brand: 'MG', name: 'Hector', price: 1119993, year: 2019, km: 55000, fuel: 'petrol', transmission: 'automatic', city: 'Delhi', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-11/10070d5fa703420aa1185e3893eeeaf5/raw/file.JPG' },
  { id: 9, brand: 'Maruti', name: 'Swift', price: 450000, year: 2021, km: 28000, fuel: 'petrol', transmission: 'manual', city: 'Mumbai', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-10/abc123def456/raw/file.JPG' },
  { id: 10, brand: 'Tata', name: 'Nexon', price: 550000, year: 2022, km: 22000, fuel: 'petrol', transmission: 'automatic', city: 'Bangalore', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-09/xyz789abc123/raw/file.JPG' },
  { id: 11, brand: 'Kia', name: 'Seltos', price: 850000, year: 2021, km: 35000, fuel: 'diesel', transmission: 'automatic', city: 'Hyderabad', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-08/kia123seltos/raw/file.JPG' },
  { id: 12, brand: 'Toyota', name: 'Glanza', price: 420000, year: 2020, km: 42000, fuel: 'petrol', transmission: 'manual', city: 'Chennai', image: 'https://mda.spinny.com/sp-file-system/public/2025-12-07/toyota456glanza/raw/file.JPG' },
]

export default function UsedCarsPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFuel, setSelectedFuel] = useState<string[]>([])
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('relevance')

  const toggleBrand = (brandId: string) => {
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

  const toggleCity = (cityId: string) => {
    setSelectedCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(c => c !== cityId)
        : [...prev, cityId]
    )
  }

  const toggleYear = (yearId: string) => {
    setSelectedYears(prev => 
      prev.includes(yearId) 
        ? prev.filter(y => y !== yearId)
        : [...prev, yearId]
    )
  }

  const filteredCars = usedCars.filter(car => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand.toLowerCase())) return false
    if (selectedTypes.length > 0) return false // Need to add type to car data
    if (selectedFuel.length > 0 && !selectedFuel.includes(car.fuel)) return false
    if (selectedTransmission.length > 0 && !selectedTransmission.includes(car.transmission)) return false
    if (selectedCities.length > 0 && !selectedCities.includes(car.city.toLowerCase().replace(' ', ''))) return false
    if (car.price < priceRange[0] * 100000 || car.price > priceRange[1] * 100000) return false
    if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase()) && !car.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const [filtersOpen, setFiltersOpen] = useState(false)

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'km-low': return a.km - b.km
      case 'newest': return b.year - a.year
      default: return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 sm:py-10 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">Used Cars</h1>
          <p className="text-sm sm:text-base lg:text-lg opacity-90">Find verified used cars from trusted dealers</p>
        </div>
      </div>

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
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="km-low">Kilometers: Low to High</option>
              <option value="newest">Year: Newest First</option>
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

                {/* City */}
                <div className="mb-6">
                  <Label className="mb-2 block">City</Label>
                  <div className="space-y-2">
                    {cities.map(city => (
                      <div key={city.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`city-${city.id}`}
                          checked={selectedCities.includes(city.id)}
                          onCheckedChange={() => toggleCity(city.id)}
                        />
                        <Label htmlFor={`city-${city.id}`} className="text-sm cursor-pointer flex-1">
                          {city.label}
                        </Label>
                        <span className="text-xs text-gray-500">({city.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brand */}
                <div className="mb-6">
                  <Label className="mb-2 block">Brand</Label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {carBrands.map(brand => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onCheckedChange={() => toggleBrand(brand.id)}
                        />
                        <Label htmlFor={`brand-${brand.id}`} className="text-sm cursor-pointer flex-1">
                          {brand.label}
                        </Label>
                        <span className="text-xs text-gray-500">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Year */}
                <div className="mb-6">
                  <Label className="mb-2 block">Model Year</Label>
                  <div className="space-y-2">
                    {yearRanges.map(year => (
                      <div key={year.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`year-${year.id}`}
                          checked={selectedYears.includes(year.id)}
                          onCheckedChange={() => toggleYear(year.id)}
                        />
                        <Label htmlFor={`year-${year.id}`} className="text-sm cursor-pointer">
                          {year.label}
                        </Label>
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
                          id={`fuel-used-${fuel.id}`}
                          checked={selectedFuel.includes(fuel.id)}
                          onCheckedChange={() => toggleFuel(fuel.id)}
                        />
                        <Label htmlFor={`fuel-used-${fuel.id}`} className="text-sm cursor-pointer">
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
                          id={`trans-used-${trans.id}`}
                          checked={selectedTransmission.includes(trans.id)}
                          onCheckedChange={() => toggleTransmission(trans.id)}
                        />
                        <Label htmlFor={`trans-used-${trans.id}`} className="text-sm cursor-pointer">
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
                    setSelectedTypes([])
                    setSelectedFuel([])
                    setSelectedTransmission([])
                    setSelectedCities([])
                    setSelectedYears([])
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
            <div className="mb-3 sm:mb-4">
              <p className="text-sm sm:text-base text-gray-600">{sortedCars.length} cars found</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {sortedCars.map(car => (
                <Link href="/used-cars-in-delhi" key={car.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full">
                    <div className="aspect-video relative bg-gray-100">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-medium">
                        {car.city}
                      </div>
                    </div>
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-gray-500">{car.brand}</p>
                          <h3 className="font-semibold text-base sm:text-lg truncate">{car.name}</h3>
                        </div>
                        <p className="text-primary font-bold text-lg sm:text-xl flex-shrink-0">
                          ₹{(car.price / 100000).toFixed(1)} L
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.year}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.km.toLocaleString()} km</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.fuel}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.transmission}</span>
                      </div>
                      <Button className="w-full mt-2 sm:mt-3" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {sortedCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No cars match your filters</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedBrands([])
                    setSelectedTypes([])
                    setSelectedFuel([])
                    setSelectedTransmission([])
                    setSelectedCities([])
                    setSelectedYears([])
                    setPriceRange([0, 100])
                    setSearchQuery('')
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Checkbox } from '@/app/components/ui/checkbox'
import { Label } from '@/app/components/ui/label'
import { Slider } from '@/app/components/ui/slider'

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

const newCars = [
  { id: 1, brand: 'Mahindra', name: 'BE 6e', price: 1890000, image: '/img/home/be6Tranding.svg', type: 'suv', fuel: 'electric', transmission: 'automatic', seats: 5 },
  { id: 2, brand: 'MG', name: 'Windsor EV', price: 1549800, image: '/img/home/windsorTranding.svg', type: 'suv', fuel: 'electric', transmission: 'automatic', seats: 5 },
  { id: 3, brand: 'Mahindra', name: 'XEV 9e', price: 2190000, image: '/img/home/xevTranding.svg', type: 'suv', fuel: 'electric', transmission: 'automatic', seats: 5 },
  { id: 4, brand: 'Mahindra', name: 'Thar Roxx', price: 1699000, image: '/img/home/roxTranding.svg', type: 'suv', fuel: 'diesel', transmission: 'manual', seats: 5 },
  { id: 5, brand: 'BMW', name: 'M2', price: 9989875, image: '/img/home/m2Tranding.svg', type: 'coupe', fuel: 'petrol', transmission: 'automatic', seats: 4 },
  { id: 6, brand: 'Toyota', name: 'Camry', price: 4616753, image: '/img/home/camreyTranding.svg', type: 'sedan', fuel: 'hybrid', transmission: 'automatic', seats: 5 },
  { id: 7, brand: 'Hyundai', name: 'Creta', price: 1150000, image: '/img/home/creta.svg', type: 'suv', fuel: 'petrol', transmission: 'manual', seats: 5 },
  { id: 8, brand: 'Maruti', name: 'Swift', price: 685000, image: '/img/home/swift.svg', type: 'hatchback', fuel: 'petrol', transmission: 'manual', seats: 5 },
  { id: 9, brand: 'Tata', name: 'Nexon', price: 750000, image: '/img/home/nexon.svg', type: 'suv', fuel: 'petrol', transmission: 'manual', seats: 5 },
  { id: 10, brand: 'Kia', name: 'Seltos', price: 1090000, image: '/img/home/seltos.svg', type: 'suv', fuel: 'petrol', transmission: 'manual', seats: 5 },
  { id: 11, brand: 'Honda', name: 'City', price: 1185000, image: '/img/home/city.svg', type: 'sedan', fuel: 'petrol', transmission: 'manual', seats: 5 },
  { id: 12, brand: 'Volkswagen', name: 'Virtus', price: 1125000, image: '/img/home/virtus.svg', type: 'sedan', fuel: 'petrol', transmission: 'manual', seats: 5 },
]

export default function NewCarsPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedBudget, setSelectedBudget] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFuel, setSelectedFuel] = useState<string[]>([])
  const [selectedTransmission, setSelectedTransmission] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 100])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

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

  const filteredCars = newCars.filter(car => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(car.brand.toLowerCase())) return false
    if (selectedTypes.length > 0 && !selectedTypes.includes(car.type)) return false
    if (selectedFuel.length > 0 && !selectedFuel.includes(car.fuel)) return false
    if (selectedTransmission.length > 0 && !selectedTransmission.includes(car.transmission)) return false
    if (car.price < priceRange[0] * 100000 || car.price > priceRange[1] * 100000) return false
    if (searchQuery && !car.name.toLowerCase().includes(searchQuery.toLowerCase()) && !car.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'name': return a.name.localeCompare(b.name)
      default: return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">New Cars</h1>
          <p className="text-lg opacity-90">Find your perfect new car from authorized dealers</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6 flex gap-4">
          <Input 
            type="text" 
            placeholder="Search by car name or brand..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Filters</h3>
                
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
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">{sortedCars.length} cars found</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCars.map(car => (
                <Link href={`/new-cars/${car.brand.toLowerCase()}/${car.name.toLowerCase().replace(' ', '-')}`} key={car.id}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video relative bg-white flex items-center justify-center p-4">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">{car.brand}</p>
                      <h3 className="font-semibold text-lg">{car.name}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{car.fuel}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{car.seats} Seats</span>
                      </div>
                      <p className="text-primary font-bold text-xl mt-2">
                        ₹{car.price.toLocaleString('en-IN')}
                      </p>
                      <Button className="w-full mt-2" size="sm">
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

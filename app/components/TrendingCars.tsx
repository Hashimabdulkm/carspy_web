'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import type { CarListing, CarsListResponse } from '@/app/lib/cars-api'
import { getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

export function TrendingCars() {
  const [cars, setCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cars/new?per_page=8&page=1&sort=newest')
      .then((res) => res.json())
      .then((data) => {
        const raw = data as CarsListResponse & { data?: CarsListResponse }
        const list = raw.data ?? raw
        setCars(list.cars ?? [])
      })
      .catch(() => setCars([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="w-full py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base sm:text-lg lg:text-2xl">Trending New Cars</h4>
          <Link href="/new-cars" className="text-sm font-medium text-[var(--pbmit-xclean-global-color)] hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="mt-4 flex gap-4 sm:gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden flex-shrink-0 w-[260px] sm:w-[300px] snap-start">
                <div className="aspect-video bg-gray-100 animate-pulse" />
                <CardContent className="p-4 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="h-5 bg-gray-100 rounded animate-pulse w-1/2" />
                  <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3 mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-4 flex gap-4 sm:gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
            {cars.map((car) => {
              const name = getCarDisplayName(car)
              const imageUrl = getCarImageUrl(car)
              const numericPrice = car.price != null ? Number(car.price) : null
              return (
                <Link
                    key={car.id}
                    href={`/cars/${car.id}`}
                    className="flex-shrink-0 w-[260px] sm:w-[300px] snap-start"
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full">
                      <div className="aspect-video relative bg-gray-100">
                        {imageUrl ? (
                          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                        )}
                      </div>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm text-gray-500">{car.vehicleModel?.brand?.name ?? '—'}</p>
                            <h3 className="font-semibold text-base sm:text-lg truncate">{name}</h3>
                          </div>
                          {numericPrice != null && !Number.isNaN(numericPrice) && (
                            <p className="text-primary font-bold text-lg sm:text-xl flex-shrink-0">
                              ₹{(numericPrice / 100000).toFixed(1)} L
                            </p>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                          {car.year != null && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.year}</span>}
                          {car.fuel_type && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.fuel_type}</span>}
                          {car.transmission && <span className="text-xs bg-gray-100 px-2 py-0.5 sm:py-1 rounded">{car.transmission}</span>}
                        </div>
                        <Button className="w-full mt-2 sm:mt-3" size="sm">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

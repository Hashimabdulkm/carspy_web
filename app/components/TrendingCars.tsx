'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <section className="home_newCars__DMUEA w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base sm:text-lg lg:text-2xl">Trending New Cars</h4>
          <Link href="/new-cars" className="text-sm font-medium text-[var(--pbmit-xclean-global-color)] hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="home_carsList__37U1g flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="home_carItem__1Q0kL flex-shrink-0 w-[180px] animate-pulse">
                <div className="home_carImage__4chct aspect-square bg-gray-200 rounded" />
                <div className="home_carspy__BlvS5 mt-2 h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="home_carsList__37U1g">
            {cars.map((car) => {
              const name = getCarDisplayName(car)
              const imageUrl = getCarImageUrl(car)
              return (
                <Link
                  key={car.id}
                  className="home_carItem__1Q0kL"
                  href={`/cars/${car.id}`}
                >
                  <div className="home_carImage__4chct">
                    {imageUrl ? (
                      <img alt={name} src={imageUrl} />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm min-h-[120px]">No image</div>
                    )}
                  </div>
                  <div className="home_carspy__BlvS5">
                    <h5>{name}</h5>
                    <p>{car.price != null ? `₹ ${car.price.toLocaleString('en-IN')}` : '—'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
        {!loading && cars.length > 0 && (
          <div className="home_slideArrow__4ilZN home_rightArrow__08Aiq" aria-hidden>&gt;</div>
        )}
      </div>
    </section>
  )
}

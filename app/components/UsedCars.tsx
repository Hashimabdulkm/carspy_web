'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { CarListing, CarsListResponse } from '@/app/lib/cars-api'
import { getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

export function UsedCars() {
  const [cars, setCars] = useState<CarListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cars/old?per_page=8&page=1&sort=newest')
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
    <section className="usedcar_usedCars__gfKSs w-full">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-base sm:text-lg lg:text-2xl">Used Cars Around You</h4>
          <Link href="/used-cars" className="text-sm font-medium text-[var(--pbmit-xclean-global-color)] hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="usedcar_carsList__X1XqF flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="usedcar_carItem__LEwKP flex-shrink-0 w-[180px] animate-pulse">
                <div className="usedcar_carImage__BBdL9 aspect-video bg-gray-200 rounded" />
                <div className="usedcar_carspy__2wCCL mt-2 h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="usedcar_carsList__X1XqF">
            {cars.map((car) => {
              const name = getCarDisplayName(car)
              const imageUrl = getCarImageUrl(car)
              return (
                <Link
                  key={car.id}
                  className="usedcar_carItem__LEwKP"
                  href={`/cars/${car.id}`}
                >
                  <div className="usedcar_carImage__BBdL9">
                    {imageUrl ? (
                      <img alt={name} src={imageUrl} />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm min-h-[120px]">No image</div>
                    )}
                  </div>
                  <div className="usedcar_carspy__2wCCL">
                    <h5>{name}</h5>
                    <p>{car.price != null ? `₹ ${car.price.toLocaleString('en-IN')}` : '—'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
        {!loading && cars.length > 0 && (
          <div className="usedcar_slideArrow__z9an_ usedcar_rightArrow__Hetvq" aria-hidden>&gt;</div>
        )}
      </div>
    </section>
  )
}

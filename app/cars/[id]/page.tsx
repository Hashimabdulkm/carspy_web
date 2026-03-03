'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { useAuth } from '@/app/context/AuthContext'
import type { CarListing } from '@/app/lib/cars-api'
import { getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

export default function CarDetailPage() {
  const params = useParams()
  const id = params?.id as string | undefined
  const { token, user } = useAuth()
  const [car, setCar] = useState<CarListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const leadSentRef = useRef(false)

  // Derive error when we don't need to fetch (avoid setState in effect)
  const derivedError = !id
    ? 'Invalid car ID'
    : !token
      ? 'Please log in to view this listing.'
      : error

  const isFetching = !!id && !!token && loading

  useEffect(() => {
    if (!id || !token) return
    let cancelled = false
    const headers: HeadersInit = { Accept: 'application/json', Authorization: `Bearer ${token}` }
    queueMicrotask(() => {
      if (!cancelled) {
        setLoading(true)
        setError(null)
      }
    })
    fetch(`/api/cars/${encodeURIComponent(id)}`, { headers })
      .then(async (res) => {
        const data = await res.json()
        if (cancelled) return
        if (!res.ok) {
          const msg = (data as { message?: string }).message
          if (res.status === 401) {
            setError(msg === 'Token not provided' || msg?.includes('Unauthenticated') ? 'Please log in to view this listing.' : msg ?? 'Please log in to view this listing.')
          } else {
            setError(msg ?? (res.status === 404 ? 'Car not found' : 'Failed to load'))
          }
          setCar(null)
          return
        }
        const raw = data as { car?: CarListing; data?: CarListing }
        const listing = raw.car ?? raw.data ?? (data as CarListing)
        setCar(listing?.id != null ? listing : null)
        if (!listing?.id) setError('Car not found')
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load car')
          setCar(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id, token])

  // Automatically create a lead once the detail view is visible for a logged-in user
  useEffect(() => {
    if (!token || !user || !car?.id) return
    if (leadSentRef.current) return
    leadSentRef.current = true

    const payload = {
      dealer_listing_id: car.id,
      full_name: user.name ?? '',
      email: user.email ?? undefined,
      phone_number: user.phone ?? '',
      whatsapp_number: user.phone ?? undefined,
    }

    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }).catch(() => {
      // ignore lead errors on UI
    })
  }, [car?.id, token, user])

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48" />
            <div className="aspect-video bg-gray-200 rounded-lg" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    )
  }

  if (derivedError || !car) {
    const isAuthError = derivedError?.toLowerCase().includes('log in') ?? false
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <p className="text-destructive text-lg mb-4">{derivedError ?? 'Car not found'}</p>
          {isAuthError && (
            <Link href="/login" className="inline-block mb-3">
              <Button>Log in</Button>
            </Link>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/new-cars">
              <Button variant="outline">Browse new cars</Button>
            </Link>
            <Link href="/used-cars">
              <Button variant="outline">Browse used cars</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const name = getCarDisplayName(car)
  const photos = car.photos ?? []
  const primaryImage = getCarImageUrl(car)

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/new-cars" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to listings
        </Link>

        <Card className="overflow-hidden">
          <div className="aspect-video sm:aspect-[2/1] bg-gray-100 relative">
            {primaryImage ? (
              <img src={primaryImage} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
          {photos.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto border-t">
              {photos.slice(0, 6).map((p, i) => (
                <button
                  key={p.id ?? i}
                  type="button"
                  className="flex-shrink-0 w-20 h-20 rounded overflow-hidden border border-gray-200"
                >
                  <img src={p.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">{car.vehicleModel?.brand?.name ?? '—'}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1">{name}</h1>
            {car.price != null && (
              <p className="text-primary font-bold text-xl mt-2">₹{car.price.toLocaleString('en-IN')}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {car.year != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.year}</span>}
              {car.mileage != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.mileage.toLocaleString()} km</span>}
              {car.fuel_type && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.fuel_type}</span>}
              {car.transmission && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>}
              {car.body_type && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.body_type}</span>}
              {car.seating_capacity != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.seating_capacity} Seats</span>}
            </div>
            {car.description && (
              <div className="mt-6 pt-6 border-t">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600 whitespace-pre-wrap">{car.description}</p>
              </div>
            )}
            {car.user?.name && (
              <p className="text-sm text-gray-500 mt-4">Listed by {car.user.name}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

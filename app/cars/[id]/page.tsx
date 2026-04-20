'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { AddPhoneModal } from '@/app/components/AddPhoneModal'
import { LoginModal } from '@/app/components/LoginModal'
import { useAuth } from '@/app/context/AuthContext'
import type { CarListing } from '@/app/lib/cars-api'
import { getCarDisplayName, getCarImageUrl } from '@/app/lib/cars-api'

function formatLabel(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'number') return value.toLocaleString('en-IN')
  return String(value)
}

function formatCurrencyValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'number') return `₹${value.toLocaleString('en-IN')}`
  const asNumber = Number(value)
  if (!Number.isNaN(asNumber)) return `₹${asNumber.toLocaleString('en-IN')}`
  return String(value)
}

export default function CarDetailPage() {
  const params = useParams()
  const id = params?.id as string | undefined
  const { token, user } = useAuth()
  const [car, setCar] = useState<CarListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [leadError, setLeadError] = useState<string | null>(null)
  const leadSentRef = useRef(false)
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null)

  // Derive error when we don't need to fetch (avoid setState in effect)
  const derivedError = !id
    ? 'Invalid car ID'
    : !token
      ? 'Please log in to view this listing.'
      : error

  const isFetching = !!id && !!token && loading
  const previewPhotos = car?.photos ?? []
  const previewPrimaryImage = car ? getCarImageUrl(car) : undefined
  const previewImageUrls = previewPhotos.map((photo) => photo.url).filter((url): url is string => Boolean(url))
  const totalGalleryImages = previewImageUrls.length > 0 ? previewImageUrls.length : previewPrimaryImage ? 1 : 0

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

    queueMicrotask(() => {
      setLeadStatus('pending')
      setLeadError(null)
    })

    fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (res.ok) {
          setLeadStatus('success')
          return
        }

        const msg = (data as { message?: string }).message ?? ''
        const errors = (data as { errors?: { phone_number?: string[] } }).errors
        const isPhoneRequired =
          /phone number.*required/i.test(msg) ||
          (Array.isArray(errors?.phone_number) && errors.phone_number.length > 0)

        if (isPhoneRequired) {
          leadSentRef.current = false
          setShowPhoneModal(true)
          setLeadStatus('error')
          setLeadError('Please add your phone number to continue.')
        } else {
          leadSentRef.current = false
          setLeadStatus('error')
          setLeadError(msg || 'Failed to register your interest for this car.')
        }
      })
      .catch(() => {
        leadSentRef.current = false
        setLeadStatus('error')
        setLeadError('Failed to register your interest. Please try again.')
      })
  }, [car?.id, token, user])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [car?.id])

  useEffect(() => {
    if (totalGalleryImages <= 1) return
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName
      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        setActiveImageIndex((prev) => (prev === 0 ? totalGalleryImages - 1 : prev - 1))
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        setActiveImageIndex((prev) => (prev === totalGalleryImages - 1 ? 0 : prev + 1))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [totalGalleryImages])

  useEffect(() => {
    if (totalGalleryImages <= 1) return
    const strip = thumbnailStripRef.current
    if (!strip) return
    const activeThumb = strip.querySelector<HTMLButtonElement>(`button[data-thumb-index="${activeImageIndex}"]`)
    activeThumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeImageIndex, totalGalleryImages])

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-32 bg-gray-200 rounded mb-6" />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-8 rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="aspect-video sm:aspect-[16/8] bg-gray-200" />
                <div className="border-t bg-white px-3 py-3 sm:px-4">
                  <div className="mx-auto flex w-full max-w-3xl gap-2 overflow-hidden rounded-xl bg-gray-50 p-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-20 sm:w-24 aspect-video rounded-lg bg-gray-200 flex-shrink-0" />
                    ))}
                  </div>
                </div>
                <div className="p-6 sm:p-7">
                  <div className="h-4 w-28 bg-gray-200 rounded mb-3" />
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
                  <div className="h-7 w-40 bg-gray-200 rounded mb-5" />
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-7 w-20 bg-gray-200 rounded" />
                    ))}
                  </div>
                  <div className="pt-6 border-t border-gray-100 space-y-3">
                    <div className="h-5 w-28 bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>

              <div className="xl:col-span-4 space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="h-5 bg-gray-200 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Valid id but not logged in: show page with reusable login modal
  if (id && !token) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <p className="text-muted-foreground mb-6">Log in to view this listing.</p>
        </div>
        <LoginModal title="Log in to view this listing" />
      </div>
    )
  }

  // Other errors (invalid id, car not found, fetch error)
  if (derivedError || !car) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <p className="text-destructive text-lg mb-4">{derivedError ?? 'Car not found'}</p>
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

  // Car is loaded but lead has not yet succeeded – gate the detail view on /api/leads 200
  if (leadStatus === 'idle' || leadStatus === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        </div>
        {showPhoneModal && (
          <AddPhoneModal
            title="Add phone number"
            onSuccess={() => {
              setShowPhoneModal(false)
              setLeadStatus('idle')
            }}
          />
        )}
      </div>
    )
  }

  // Lead failed for a non-phone reason – show error instead of details
  if (leadStatus === 'error' && !showPhoneModal) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <p className="text-destructive text-lg mb-4">
            {leadError ?? 'We could not register your interest for this car.'}
          </p>
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

  // Phone modal open: show neutral background only (no car card behind modal)
  if (showPhoneModal) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <p className="text-sm text-muted-foreground">Add your phone number to continue viewing this listing.</p>
          </div>
        </div>
        <AddPhoneModal
          title="Add phone number"
          onSuccess={() => {
            setShowPhoneModal(false)
            setLeadStatus('idle')
          }}
        />
      </div>
    )
  }

  const name = getCarDisplayName(car)
  const photos = car.photos ?? []
  const primaryImage = getCarImageUrl(car)
  const imageUrls = photos.map((photo) => photo.url).filter((url): url is string => Boolean(url))
  const galleryImages = imageUrls.length > 0 ? imageUrls : primaryImage ? [primaryImage] : []
  const currentImage = galleryImages[activeImageIndex] ?? null
  const modelData = car.vehicleModel ?? car.vehicle_model
  const carMileage = car.mileage ?? car.mileage_km

  const goToPreviousImage = () => {
    if (galleryImages.length <= 1) return
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    if (galleryImages.length <= 1) return
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const mainFields: Array<{ key: string; value: unknown; currency?: boolean }> = [
    { key: 'type', value: car.type },
    { key: 'price', value: car.price, currency: true },
    { key: 'on_road_price', value: car.on_road_price, currency: true },
    { key: 'year', value: car.year },
    { key: 'mileage_km', value: carMileage },
    { key: 'transmission', value: car.transmission },
    { key: 'fuel_type', value: car.fuel_type },
    { key: 'drivetrain', value: car.drivetrain },
    { key: 'engine_capacity_cc', value: car.engine_capacity_cc ?? car.engine_capacity },
    { key: 'mileage_fuel_efficiency', value: car.mileage_fuel_efficiency },
    { key: 'body_type', value: car.body_type },
    { key: 'seating_capacity', value: car.seating_capacity },
    { key: 'boot_space', value: car.boot_space },
    { key: 'ground_clearance', value: car.ground_clearance },
    { key: 'safety_rating_ncap', value: car.safety_rating_ncap },
    { key: 'airbags_count', value: car.airbags_count },
    { key: 'abs_esc', value: car.abs_esc },
    { key: 'infotainment_features', value: car.infotainment_features },
    { key: 'maintenance_cost', value: car.maintenance_cost },
    { key: 'insurance_cost', value: car.insurance_cost, currency: true },
    { key: 'resale_value', value: car.resale_value, currency: true },
    { key: 'warranty', value: car.warranty },
    { key: 'registration_number', value: car.registration_number },
    { key: 'chassis_number', value: car.chassis_number },
    { key: 'status', value: car.status },
    { key: 'model_name', value: modelData?.name },
    { key: 'model_brand', value: modelData?.brand?.name },
    { key: 'model_category', value: modelData?.category?.name },
  ]

  const metaFields: Array<{ key: string; value: unknown }> = [
    { key: 'id', value: car.id },
    { key: 'user_id', value: car.user_id ?? car.user?.id },
    { key: 'vehicle_model_id', value: car.vehicle_model_id },
    { key: 'created_at', value: car.created_at },
    { key: 'updated_at', value: car.updated_at },
    { key: 'deleted_at', value: car.deleted_at },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <Link href="/new-cars" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to listings
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <Card className="overflow-hidden xl:col-span-8">
            <div className="aspect-video sm:aspect-[16/8] bg-gradient-to-b from-gray-100 to-gray-200 relative group">
              {currentImage ? (
                <img src={currentImage} alt={name} className="w-full h-full object-contain p-2 sm:p-3" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
              )}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-900 shadow-md hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 text-gray-900 shadow-md hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs text-white">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/40 px-2 py-1">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={`dot-${idx}`}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === activeImageIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/70 hover:bg-white'
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="border-t bg-white px-3 py-3 sm:px-4">
                <div
                  ref={thumbnailStripRef}
                  className="mx-auto flex w-full max-w-3xl gap-2 overflow-x-auto rounded-xl bg-gray-50 p-2 scrollbar-thin"
                >
                  {galleryImages.map((url, i) => (
                    <button
                      key={`${url}-${i}`}
                      data-thumb-index={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative flex-shrink-0 w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border transition-all ${
                        i === activeImageIndex
                          ? 'border-primary ring-2 ring-primary/30 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <CardContent className="p-6 sm:p-7">
              <p className="text-sm text-gray-500">{modelData?.brand?.name ?? '—'}</p>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">{name}</h1>
              {car.price != null && (
                <p className="text-primary font-bold text-xl md:text-2xl mt-2">{formatCurrencyValue(car.price)}</p>
              )}

              <div className="flex flex-wrap gap-2 mt-4">
                {car.year != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.year}</span>}
                {carMileage != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{formatValue(carMileage)} km</span>}
                {car.fuel_type && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.fuel_type}</span>}
                {car.transmission && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.transmission}</span>}
                {car.body_type && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.body_type}</span>}
                {car.seating_capacity != null && <span className="text-sm bg-gray-100 px-2 py-1 rounded">{car.seating_capacity} Seats</span>}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {car.description || 'No description available.'}
                </p>
                {car.user?.name && (
                  <p className="text-xs text-gray-500 mt-3">Listed by {car.user.name}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="xl:col-span-4 space-y-6">
            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold mb-3">Vehicle Details</h2>
                <div className="space-y-2 text-sm">
                  {mainFields
                    .filter((field) => field.value !== undefined && field.value !== null && field.value !== '')
                    .map((field) => (
                      <div key={field.key} className="flex justify-between gap-3 border-b border-dashed border-gray-200 py-1">
                        <span className="text-gray-500">{formatLabel(field.key)}</span>
                        <span className="text-right font-medium break-all">
                          {field.currency ? formatCurrencyValue(field.value) : formatValue(field.value)}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

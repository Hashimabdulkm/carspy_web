/** Response from GET /api/cars/new or GET /api/cars/old */
export interface CarsListResponse {
  cars: CarListing[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

/** Single listing (new or old) from list or GET /api/cars/{id} */
export interface CarListing {
  id: number
  title?: string
  description?: string
  price?: number
  year?: number
  mileage?: number
  transmission?: string
  fuel_type?: string
  body_type?: string
  seating_capacity?: number
  engine_capacity?: number
  vehicle_model_id?: number
  vehicleModel?: {
    id?: number
    name?: string
    brand?: { id: number; name: string }
    category?: { id: number; name: string }
  }
  photos?: { id?: number; url: string }[]
  user?: { id: number; name: string }
  [key: string]: unknown
}

/** Query params for GET /api/cars/new */
export interface NewCarsParams {
  brand_id?: number | number[]
  vehicle_model_id?: number
  category_id?: number
  price_min?: number
  price_max?: number
  year_min?: number
  year_max?: number
  transmission?: string
  fuel_type?: string
  body_type?: string
  seating_capacity?: number
  engine_capacity_min?: number
  engine_capacity_max?: number
  search?: string
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'year_asc' | 'year_desc'
  per_page?: number
  page?: number
}

/** Query params for GET /api/cars/old (extends new with mileage) */
export interface OldCarsParams extends NewCarsParams {
  mileage_min?: number
  mileage_max?: number
  sort?: NewCarsParams['sort'] | 'mileage_asc' | 'mileage_desc'
}

export function buildCarsQuery(params: Record<string, unknown>): string {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    if (Array.isArray(value)) {
      value.forEach((v) => q.append(key, String(v)))
    } else {
      q.set(key, String(value))
    }
  })
  return q.toString()
}

export function getCarDisplayName(car: CarListing): string {
  const model = car.vehicleModel?.name
  const brand = car.vehicleModel?.brand?.name
  if (model && brand) return `${brand} ${model}`
  if (car.title) return car.title
  return `Car #${car.id}`
}

export function getCarImageUrl(car: CarListing): string | undefined {
  const photos = car.photos
  if (Array.isArray(photos) && photos.length > 0 && photos[0]?.url) {
    return photos[0].url
  }
  return undefined
}

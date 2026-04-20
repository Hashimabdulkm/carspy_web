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
  user_id?: number
  type?: string
  title?: string
  description?: string
  price?: number | string
  year?: number
  mileage_km?: number
  mileage?: number
  registration_number?: string
  chassis_number?: string
  status?: string
  transmission?: string
  fuel_type?: string
  engine_capacity_cc?: number
  mileage_fuel_efficiency?: string
  drivetrain?: string
  body_type?: string
  seating_capacity?: number
  boot_space?: string
  ground_clearance?: string
  safety_rating_ncap?: string
  airbags_count?: number
  abs_esc?: string
  infotainment_features?: string
  on_road_price?: number | string | null
  maintenance_cost?: string | null
  insurance_cost?: number | string | null
  resale_value?: number | string | null
  warranty?: string | null
  engine_capacity?: number
  vehicle_model_id?: number
  vehicleModel?: {
    id?: number
    brand_id?: number
    category_id?: number
    name?: string
    created_at?: string | null
    updated_at?: string | null
    brand?: { id: number; name: string }
    category?: { id: number; name: string; base_price?: string | null }
  }
  vehicle_model?: {
    id?: number
    brand_id?: number
    category_id?: number
    name?: string
    created_at?: string | null
    updated_at?: string | null
    brand?: { id: number; name: string }
    category?: { id: number; name: string; base_price?: string | null }
  }
  photos?: { id?: number; path?: string; sort_order?: number; url: string }[]
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
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

export interface CarsFiltersResponse {
  brands: { id: number; name: string }[]
  vehicle_models: { id: number; name: string; brand_id: number; category_id: number }[]
  categories: { id: number; name: string }[]
  transmissions: string[]
  fuel_types: string[]
  body_types: string[]
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
  const modelData = car.vehicleModel ?? car.vehicle_model
  const model = modelData?.name
  const brand = modelData?.brand?.name
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

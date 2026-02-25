import { NextRequest, NextResponse } from 'next/server'

const VEHICLE_DETAILS_API_URL =
  process.env.BASE_API_URL

export type VehicleDetailsBody =
  | { vehiclenumber: string }
  | { chasisnumber: string }
  | { enginenumber: string }

export interface VehicleDetailsData {
  stautsMessage?: string
  stateCd?: string
  rtoCd?: string
  rcRegnNo?: string
  rcRegnDt?: string
  rcChasiNo?: string
  rcEngNo?: string
  rcVhClassDesc?: string
  rcMakerDesc?: string
  rcMakerModel?: string
  rcBodyTypeDesc?: string
  rcFuelDesc?: string
  rcColor?: string
  rcOwnerName?: string
  rcFitUpto?: string
  rcNormsDesc?: string
  rcRegisteredAt?: string
  rcStatus?: string
  rcInsuranceComp?: string
  rcInsuranceUpto?: string
  [key: string]: unknown
}

export interface VehicleDetailsResponse {
  status: 'success' | 'error'
  data?: VehicleDetailsData
  message?: string
}

export async function POST(request: NextRequest) {
  if (!VEHICLE_DETAILS_API_URL) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Vehicle details API is not configured (VEHICLE_DETAILS_API_URL or ULIP_API_URL)',
      },
      { status: 503 }
    )
  }

  let body: VehicleDetailsBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const hasVehicle = 'vehiclenumber' in body && typeof body.vehiclenumber === 'string' && body.vehiclenumber.trim()
  const hasChassis = 'chasisnumber' in body && typeof body.chasisnumber === 'string' && body.chasisnumber.trim()
  const hasEngine = 'enginenumber' in body && typeof body.enginenumber === 'string' && body.enginenumber.trim()

  if (!hasVehicle && !hasChassis && !hasEngine) {
    return NextResponse.json(
      { status: 'error', message: 'Provide vehiclenumber, chasisnumber, or enginenumber' },
      { status: 400 }
    )
  }

  const url = VEHICLE_DETAILS_API_URL.replace(/\/$/, '')
  const endpoint = url.includes('vehicle-details') ? url : `${url}/api/ulip/vehicle-details-json`

  const authHeader = request.headers.get('authorization')

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (authHeader?.startsWith('Bearer ')) {
    headers.Authorization = authHeader
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(
        { status: 'error', data: json, message: json.message || res.statusText },
        { status: res.status }
      )
    }
    return NextResponse.json(json)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Request failed'
    return NextResponse.json(
      { status: 'error', message },
      { status: 502 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'

const VEHICLE_DETAILS_API_URL =
  process.env.BASE_API_URL

export type VehicleDetailsBody =
  | { vehiclenumber: string }
  | { chasisnumber: string }
  | { enginenumber: string }

/** Validation aligned with ULIP API (chasisnumber/enginenumber: 5–24 non-whitespace; vehiclenumber: 5–11 alphanumeric) */
const RC_VALIDATION = {
  vehiclenumber: {
    pattern: /^[a-zA-Z0-9]{5,11}$/,
    message: 'Vehicle number must be 5–11 letters or numbers (e.g. UP91L0001).',
  },
  chasisnumber: {
    pattern: /^[^\s]{5,24}$/,
    message: 'Chassis number must be 5–24 characters with no spaces.',
  },
  enginenumber: {
    pattern: /^[^\s]{5,24}$/,
    message: 'Engine number must be 5–24 characters with no spaces.',
  },
} as const

/** Extract ULIP validation message from backend 500 response and return user-friendly message + 400 */
function parseUlipErrorFromBackend(json: Record<string, unknown>): { status: 400; message: string } | null {
  const data = json?.data as { message?: string } | undefined
  const msg = (typeof json?.message === 'string' ? json.message : data?.message) as string | undefined
  if (!msg || typeof msg !== 'string') return null
  const ulipMatch = msg.match(/ULIP API request failed:\s*400\s*-\s*(\{[\s\S]*\})/);
  if (!ulipMatch) return null
  try {
    const inner = JSON.parse(ulipMatch[1]) as { message?: string }
    const innerMsg = inner?.message
    if (typeof innerMsg === 'string' && innerMsg.length) {
      const cleaned = innerMsg
        .replace(/Format should follow\s*\^[^"]+\^?/i, 'Check the format (see hint below).')
        .replace(/Data format failed OR wrong value entered at:\s*/i, '')
        .trim()
      return {
        status: 400,
        message: cleaned || 'Invalid format. Please check the value and try again.',
      }
    }
  } catch {
    // fallback: use a generic message derived from the raw string
    if (/chasisnumber|chassis/i.test(msg))
      return { status: 400, message: 'Chassis number must be 5–24 characters with no spaces.' }
    if (/enginenumber|engine/i.test(msg))
      return { status: 400, message: 'Engine number must be 5–24 characters with no spaces.' }
    if (/vehiclenumber|vehicle/i.test(msg))
      return { status: 400, message: 'Vehicle number must be 5–11 letters or numbers.' }
    return { status: 400, message: 'Invalid format. Please check the value and try again.' }
  }
  return null
}

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
      { status: 'error', message: 'Invalid request. Please send a valid JSON body with vehiclenumber, chasisnumber, or enginenumber.' },
      { status: 400 }
    )
  }

  let bodyToSend: VehicleDetailsBody
  const raw = body as Record<string, unknown>

  if (typeof raw.vehiclenumber === 'string' && raw.vehiclenumber.trim()) {
    const value = raw.vehiclenumber.trim()
    if (!RC_VALIDATION.vehiclenumber.pattern.test(value)) {
      return NextResponse.json(
        { status: 'error', message: RC_VALIDATION.vehiclenumber.message },
        { status: 400 }
      )
    }
    bodyToSend = { vehiclenumber: value }
  } else if (typeof raw.chasisnumber === 'string' && raw.chasisnumber.trim()) {
    const value = raw.chasisnumber.trim()
    if (!RC_VALIDATION.chasisnumber.pattern.test(value)) {
      return NextResponse.json(
        { status: 'error', message: RC_VALIDATION.chasisnumber.message },
        { status: 400 }
      )
    }
    bodyToSend = { chasisnumber: value }
  } else if (typeof raw.enginenumber === 'string' && raw.enginenumber.trim()) {
    const value = raw.enginenumber.trim()
    if (!RC_VALIDATION.enginenumber.pattern.test(value)) {
      return NextResponse.json(
        { status: 'error', message: RC_VALIDATION.enginenumber.message },
        { status: 400 }
      )
    }
    bodyToSend = { enginenumber: value }
  } else {
    return NextResponse.json(
      { status: 'error', message: 'Please provide a vehicle number, chassis number, or engine number.' },
      { status: 400 }
    )
  }

  const url = VEHICLE_DETAILS_API_URL.replace(/\/$/, '')
  const endpoint = `${url}/api/ulip/vehicle`

  const authHeader = request.headers.get('authorization')
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (authHeader?.startsWith('Bearer ')) {
    headers.Authorization = authHeader
  }

  const bodyStr = JSON.stringify(bodyToSend)

  try {
    // Use redirect: 'manual' so a 302 from the backend isn't followed with GET (which would cause 405)
    let res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: bodyStr,
      redirect: 'manual',
    })
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location')
      if (location) {
        res = await fetch(location, {
          method: 'POST',
          headers,
          body: bodyStr,
          redirect: 'manual',
        })
      }
    }
    const json = await res.json().catch(() => ({})) as Record<string, unknown>
    if (!res.ok) {
      const ulipParsed = res.status === 500 ? parseUlipErrorFromBackend(json) : null
      if (ulipParsed) {
        return NextResponse.json(
          { status: 'error', message: ulipParsed.message },
          { status: ulipParsed.status }
        )
      }
      const backendMessage =
        (json?.data && typeof json.data === 'object' && (json.data as { message?: string }).message) ||
        (typeof json?.message === 'string' && json.message) ||
        res.statusText
      const message =
        res.status === 400
          ? backendMessage || 'Invalid vehicle details. Please check the value and try again.'
          : res.status === 401
            ? backendMessage || 'Please log in again to fetch RC details.'
            : res.status === 422
              ? backendMessage || 'The value could not be processed. Please check and try again.'
              : backendMessage || 'Something went wrong. Please try again.'
      return NextResponse.json(
        { status: 'error', data: json, message },
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

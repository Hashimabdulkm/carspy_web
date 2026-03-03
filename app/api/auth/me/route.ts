import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.BASE_API_URL ?? ''

function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  return token || null
}

export async function GET(request: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { message: 'Auth API is not configured (BASE_API_URL)' },
      { status: 503 }
    )
  }

  const token = getTokenFromRequest(request)

  if (!token) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  const url = `${BASE_URL.replace(/\/$/, '')}/api/auth/me`
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : 'Request failed' },
      { status: 502 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { message: 'Auth API is not configured (BASE_API_URL)' },
      { status: 503 }
    )
  }

  const token = getTokenFromRequest(request)
  if (!token) {
    return NextResponse.json(
      { message: 'Authorization token required' },
      { status: 401 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  const url = `${BASE_URL.replace(/\/$/, '')}/api/auth/me`
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    return NextResponse.json(
      { message: err instanceof Error ? err.message : 'Request failed' },
      { status: 502 }
    )
  }
}


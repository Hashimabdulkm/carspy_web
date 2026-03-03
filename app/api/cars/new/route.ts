import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.BASE_API_URL ?? ''

export async function GET(request: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { message: 'Cars API is not configured (BASE_API_URL)' },
      { status: 503 }
    )
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.toString()
  const url = `${BASE_URL.replace(/\/$/, '')}/api/cars/new${query ? `?${query}` : ''}`

  try {
    const authHeader = request.headers.get('authorization')
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (authHeader?.startsWith('Bearer ')) headers.Authorization = authHeader

    const res = await fetch(url, { method: 'GET', headers })
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

import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = process.env.BASE_API_URL ?? ''

export async function POST(request: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { message: 'Leads API is not configured (BASE_API_URL)' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  const url = `${BASE_URL.replace(/\/$/, '')}/api/leads`

  try {
    const authHeader = request.headers.get('authorization')
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    if (authHeader?.startsWith('Bearer ')) {
      headers.Authorization = authHeader
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
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


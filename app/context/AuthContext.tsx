'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const AUTH_TOKEN_KEY = 'carspy_auth_token'
const AUTH_USER_KEY = 'carspy_auth_user'

export interface AuthRole {
  id?: number
  name?: string
}

export interface AuthUser {
  id?: number
  name?: string
  email?: string
  phone?: string | null
  status?: string
  roles?: AuthRole[]
  [key: string]: unknown
}

interface AuthState {
  user: AuthUser | null
  token: string | null
  isReady: boolean
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (params: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => Promise<{ error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStored(): { token: string | null; user: AuthUser | null } {
  if (typeof window === 'undefined') return { token: null, user: null }
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const userRaw = localStorage.getItem(AUTH_USER_KEY)
    const user = userRaw ? (JSON.parse(userRaw) as AuthUser) : null
    return { token, user }
  } catch {
    return { token: null, user: null }
  }
}

function persist(token: string, user: AuthUser) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

function clearStorage() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isReady: false,
  })

  useEffect(() => {
    const { token, user } = readStored()
    setState({ token, user, isReady: true })
  }, [])

  // Fetch full user (with roles) from GET /api/auth/me when we have a token
  useEffect(() => {
    if (!state.token || !state.isReady) return

    let cancelled = false
    const controller = new AbortController()

    fetch('/api/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${state.token}` },
      signal: controller.signal,
    })
      .then((res) => {
        if (cancelled) return
        if (res.status === 401) {
          clearStorage()
          setState({ token: null, user: null, isReady: true })
          return
        }
        return res.json()
      })
      .then((json) => {
        if (cancelled || !json) return
        const user = json?.data?.user ?? json?.user
        if (user && typeof user === 'object') {
          persist(state.token!, user)
          setState((prev) => ({ ...prev, user }))
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Network or parse error – keep existing user from storage
        }
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [state.token, state.isReady])

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const raw = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { error: raw.message || 'Login failed' }
    }
    // Backend may return { data: { access_token, user } } or { access_token, user } directly
    const data = raw.data && typeof raw.data === 'object' ? raw.data : raw
    const token =
      typeof data.access_token === 'string'
        ? data.access_token
        : typeof data.accessToken === 'string'
          ? data.accessToken
          : typeof data.token === 'string'
            ? data.token
            : null
    const user = data.user ?? { email, name: data.user?.name ?? '' }
    if (token) {
      persist(token, user)
      setState({ token, user, isReady: true })
      return {}
    }
    return {
      error:
        'Login succeeded but no token was returned. Expected access_token, accessToken, or token in the response.',
    }
  }, [])

  const register = useCallback(
    async (params: {
      name: string
      email: string
      password: string
      password_confirmation: string
    }) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      const raw = await res.json().catch(() => ({}))
      if (!res.ok) {
        return { error: raw.message || 'Registration failed' }
      }
      const data = raw.data && typeof raw.data === 'object' ? raw.data : raw
      const token =
        typeof data.access_token === 'string'
          ? data.access_token
          : typeof data.accessToken === 'string'
            ? data.accessToken
            : typeof data.token === 'string'
              ? data.token
              : null
      const user = data.user ?? { email: params.email, name: params.name }
      if (token) {
        persist(token, user)
        setState({ token, user, isReady: true })
        return {}
      }
      return {
        error:
          'Registration succeeded but no token was returned. Expected access_token, accessToken, or token in the response.',
      }
    },
    []
  )

  const logout = useCallback(async () => {
    const { token } = readStored()
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch {
        // ignore
      }
    }
    clearStorage()
    setState({ token: null, user: null, isReady: true })
  }, [])

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    isAuthenticated: !!state.token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

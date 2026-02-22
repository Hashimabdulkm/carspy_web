'use client'

import { ReactNode } from 'react'

interface RouterProviderWrapperProps {
  children: ReactNode
}

export function ClientRouterProvider({ children }: RouterProviderWrapperProps) {
  // This provider ensures SSR works properly
  // In Next.js App Router, all components are server-rendered by default
  return <>{children}</>
}

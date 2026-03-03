'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageHero } from '@/app/components/PageHero'
import { Footer } from '@/app/components/Footer'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { useAuth } from '@/app/context/AuthContext'

export default function SignUpPage() {
  const router = useRouter()
  const { register, isAuthenticated } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    router.replace('/profile')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    const result = await register({
      name,
      email,
      phone: phone || undefined,
      password,
      password_confirmation: passwordConfirmation,
    })
    setLoading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    router.replace('/profile')
  }

  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow="Account"
        title={
          <>
            <span className="text-[var(--pbmit-xclean-global-color)]">Sign up</span>
          </>
        }
        subtitle="Create an account to save your vehicles and access all services."
      />

      <div className="content-wrapper py-12 sm:py-16">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-5"
          >
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="signup-name">Name</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="signup-phone">Phone number</Label>
              <Input
                id="signup-phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="signup-password-confirm">Confirm password</Label>
              <Input
                id="signup-password-confirm"
                type="password"
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="mt-1.5"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Creating account…' : 'Create account'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

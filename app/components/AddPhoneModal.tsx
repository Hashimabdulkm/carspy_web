'use client'

import { useState } from 'react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { useAuth } from '@/app/context/AuthContext'

interface AddPhoneModalProps {
  /** Called after phone is saved successfully (e.g. to retry lead or close) */
  onSuccess?: () => void
  title?: string
}

export function AddPhoneModal({ onSuccess, title = 'Add phone number' }: AddPhoneModalProps) {
  const { user, updateProfile } = useAuth()
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const value = phone.trim()
    if (!value) {
      setError('Please enter a phone number.')
      return
    }
    setLoading(true)
    const result = await updateProfile({ phone: value })
    setLoading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    onSuccess?.()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-phone-modal-title"
    >
      <div
        className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="add-phone-modal-title" className="text-xl font-semibold text-center mb-2">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          A phone number is required to submit your interest for this listing.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}
          <div>
            <Label htmlFor="add-phone-input">Phone number</Label>
            <Input
              id="add-phone-input"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Saving…' : 'Save & continue'}
          </Button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/app/components/PageHero'
import { Footer } from '@/app/components/Footer'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import {
  User,
  Mail,
  Phone,
  Car,
  FileText,
  CreditCard,
  Shield,
  Wrench,
  Plus,
  ChevronRight,
  Pencil,
} from 'lucide-react'

// Placeholder – replace with real auth state
const defaultUser = {
  name: 'Rahul Sharma',
  email: 'rahul@example.com',
  phone: '+91 98765 43210',
}

const quickLinks = [
  { label: 'RC Details', href: '/rc-search', icon: FileText },
  { label: 'Challans', href: '/e-challan-check', icon: CreditCard },
  { label: 'Insurance', href: '/car-insurance', icon: Shield },
  { label: 'Service History', href: '/service-history', icon: Wrench },
]

// Placeholder saved vehicles
const savedVehicles = [
  { number: 'DL 01 AB 1234', label: 'Maruti Swift' },
  { number: 'DL 02 CD 5678', label: 'Honda City' },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(defaultUser)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow="Account"
        title={
          <>
            My <span className="text-[var(--pbmit-xclean-global-color)]">Profile</span>
          </>
        }
        subtitle="Manage your details and quick access to vehicle services."
      />

      <div className="bg-white pt-12 sm:pt-16 lg:pt-20">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile card */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[var(--pbmit-xclean-global-color)]/10 flex items-center justify-center text-2xl font-bold text-[var(--pbmit-xclean-global-color)]">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={user.name}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-foreground">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={user.email}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-foreground">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={user.phone}
                          onChange={handleChange}
                          className="mt-1.5"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button type="submit">Save changes</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold text-[var(--pbmit-xclean-blackish-color)]">
                            {user.name}
                          </h2>
                          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {user.email}
                            </span>
                            <span className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {user.phone}
                            </span>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1.5"
                          onClick={() => setIsEditing(true)}
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Quick actions */}
            <section>
              <h3 className="text-lg font-semibold text-[var(--pbmit-xclean-blackish-color)] mb-4">
                Quick actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-[var(--pbmit-xclean-global-color)]/30 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--pbmit-xclean-global-color)]/10 flex items-center justify-center text-[var(--pbmit-xclean-global-color)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-[var(--pbmit-xclean-blackish-color)] flex-1">
                        {item.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* My vehicles */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--pbmit-xclean-blackish-color)]">
                  My vehicles
                </h3>
                <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add vehicle
                </Button>
              </div>
              {savedVehicles.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 border-dashed p-8 text-center text-gray-500">
                  <Car className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-sm">No vehicles added yet.</p>
                  <p className="text-xs mt-1">Add a vehicle to quickly check RC, challans, and more.</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Add your first vehicle
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedVehicles.map((vehicle) => (
                    <Link
                      key={vehicle.number}
                      href="/rc-search"
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white hover:border-[var(--pbmit-xclean-global-color)]/30 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[var(--pbmit-xclean-blackish-color)]">
                          {vehicle.label}
                        </p>
                        <p className="text-sm text-gray-500">{vehicle.number}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Sign out / app link */}
            <section className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                For the full experience, use the carspy app to save vehicles, get alerts, and more.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.cuvora.carspy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Download app
                </Link>
                <Button variant="outline" className="text-gray-600">
                  Sign out
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

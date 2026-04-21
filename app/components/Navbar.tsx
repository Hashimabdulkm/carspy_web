'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Car, 
  FileText, 
  CreditCard, 
  Bike, 
  Tag, 
  Search,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'

interface NavItem {
  label: string
  href?: string
  children?: { label: string; href: string; icon: React.ReactNode }[]
}

export function Navbar() {
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()
  const displayName = user?.name ?? user?.email?.split('@')[0] ?? null
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleLogout = async () => {
    await logout()
    setMobileMenuOpen(false)
    router.push('/')
  }

  const navItems: NavItem[] = [
    {
      label: 'Vehicle Info',
      children: [
        { label: 'RC Details', href: '/rc-search', icon: <FileText className="w-4 h-4" /> },
        { label: 'Challans', href: '/e-challan-check', icon: <CreditCard className="w-4 h-4" /> },
        { label: 'RTO Details', href: '/rto-vehicle-registration-detail', icon: <Tag className="w-4 h-4" /> },
      ]
    },
    {
      label: 'Buy Car',
      children: [
        { label: 'New Cars', href: '/new-cars', icon: <Car className="w-4 h-4" /> },
        { label: 'Used Cars', href: '/used-cars', icon: <Car className="w-4 h-4" /> },
        { label: 'Car Inspection', href: 'https://certifide.in/', icon: <Car className="w-4 h-4" /> },
      ]
    },
    // {
    //   label: 'Insurance',
    //   children: [
    //     { label: 'Car Insurance', href: '/car-insurance', icon: <Car className="w-4 h-4" /> },
    //     { label: 'Bike Insurance', href: '/bike-insurance', icon: <Bike className="w-4 h-4" /> },
    //   ]
    // },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 flex-shrink-0 px-1 py-0.5">
            <img
              src="/Add%20a%20heading.svg"
              alt="carspy logo"
              className="h-40 lg:h-40 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 lg:-ml-76">
            {navItems.map((item, idx) => (
              <div 
                key={idx}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50">
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link 
                    href={item.href || '#'} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && (
                  <div className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible transform -translate-y-2 transition-all duration-200 ${activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : ''}`}>
                    {item.children.map((child, childIdx) => (
                      <Link
                        key={childIdx}
                        href={child.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors duration-150"
                      >
                        <span className="text-primary/70">{child.icon}</span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-full border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all duration-200 cursor-pointer hover:bg-gray-100">
                <Search className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm text-gray-500">Search Vehicle No.</span>
              </div>
            </div>

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  title="My profile"
                >
                  <span className="p-1.5 rounded-full bg-primary/10 text-primary">
                    <User className="w-4 h-4" />
                  </span>
                  {displayName && (
                    <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate hidden xl:block">
                      {displayName}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors inline-flex"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-2">
          {/* Mobile Search */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl mb-4">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Vehicle No." 
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Mobile Nav Items */}
          {navItems.map((item, idx) => (
            <div key={idx}>
              {item.children ? (
                <div className="space-y-1">
                  <button 
                    className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/20 space-y-1">
                      {item.children.map((child, childIdx) => (
                        <Link
                          key={childIdx}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-primary/5"
                        >
                          <span className="text-primary/70">{child.icon}</span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="block px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Profile / Log in / Log out */}
          {isAuthenticated ? (
            <div className="mt-4 space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 w-full px-4 py-3 bg-primary text-white rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium block">My Profile</span>
                  {displayName && (
                    <span className="text-sm text-white/80 truncate block">{displayName}</span>
                  )}
                </div>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white font-medium rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

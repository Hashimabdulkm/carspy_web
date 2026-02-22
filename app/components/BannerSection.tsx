'use client'

import Link from 'next/link'
import { Car, Shield, ArrowRight, CreditCard } from 'lucide-react'

const banners = [
  {
    href: '/new-cars',
    label: 'Explore Cars',
    title: 'Popular Cars at Best Prices',
    icon: Car,
    accent: 'bg-orange-500',
  },
  {
    href: '/car-insurance',
    label: 'Insure Now',
    title: 'Stay Insured & Ride Worry-Free',
    icon: Shield,
    accent: 'bg-primary',
  },
  {
    href: '/e-challan-check',
    label: 'Check Challans',
    title: 'Check Challans for your vehicle',
    icon: CreditCard,
    accent: 'bg-blue-600',
  },
]

export function BannerSection() {
  return (
    <div className="content-wrapper">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-6 sm:py-8">
        {banners.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-xl bg-secondary/50 hover:bg-secondary border border-border min-h-[100px] sm:min-h-[112px] transition-colors duration-200"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.accent} flex items-center justify-center text-white`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base font-semibold text-foreground truncate">
                  {item.title}
                </p>
                <span className="inline-flex items-center gap-1 mt-1 text-xs sm:text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {item.label}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Receipt, Car, BadgeCheck, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Settle Your Challans Instantly',
    description: 'Check history and pay challans in one place.',
    points: ['Challan History', 'Instant Settlement'],
    button: 'Pay Challans',
    link: '/e-challan-check',
    icon: Receipt,
    image: '/img/home/payChallanPoster.png',
    accent: 'primary',
  },
  {
    title: 'Sell Your Car From Home',
    description: 'Get the best value with instant payment.',
    points: ['Get The Best Value', 'Instant Payment'],
    button: 'Sell Car',
    link: '/sell-car',
    icon: Car,
    image: '/img/home/sellCarPoster.png',
    accent: 'secondary',
  },
  {
    title: 'Your Dream Car In Your Budget',
    description: 'Trusted sellers and exclusive deals.',
    points: ['Trusted Sellers', 'Exclusive Deals'],
    button: 'Explore Used Cars',
    link: '/used-cars-in-delhi',
    icon: BadgeCheck,
    image: '/img/home/dreamCarPoster.png',
    accent: 'neutral',
  },
]

export function CuratedServices() {
  return (
    <section className="w-full py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--pbmit-xclean-blackish-color)] m-0 mb-2">
            Curated Services For You
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Quick access to challan payment, car selling, and used car discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            const isPrimary = service.accent === 'primary'
            return (
              <Link
                key={service.link}
                href={service.link}
                className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[var(--pbmit-xclean-global-color)]/30 transition-all duration-300"
              >
                <div className="relative h-36 sm:h-40 bg-gray-100">
                  <img
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div
                    className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center ${
                      isPrimary
                        ? 'bg-[var(--pbmit-xclean-global-color)] text-white'
                        : 'bg-white/95 text-[var(--pbmit-xclean-blackish-color)]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--pbmit-xclean-blackish-color)] mt-0 mb-2 group-hover:text-[var(--pbmit-xclean-global-color)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-gray-700"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--pbmit-xclean-global-color)] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--pbmit-xclean-global-color)] group-hover:gap-2.5 transition-[gap]">
                    {service.button}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

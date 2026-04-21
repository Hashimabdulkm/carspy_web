'use client'

import { ServiceTabs } from './ServiceTabs'
import { QrCode, Smartphone, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--pbmit-xclean-blackish-bg-color)]">
        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 20%, var(--pbmit-xclean-global-color) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(251,163,17,0.2) 0%, transparent 50%)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,24,55,0.4)_100%)]" />

        <div className="content-wrapper relative z-10 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center pt-6 sm:pt-8 lg:pt-10">
            <p className="text-[var(--pbmit-xclean-global-color)] text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              Vehicle Information Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Your virtual
              <br />
              <span className="text-[var(--pbmit-xclean-global-color)]">car companion</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              Choose. Cruise. Care. All in one place.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <Link
                href="https://play.google.com/store/apps/details?id=com.cuvora.carspy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white text-[var(--pbmit-xclean-blackish-color)] font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <QrCode className="w-6 h-6 text-[var(--pbmit-xclean-global-color)]" />
                <span>Download app</span>
              </Link>
              {/* <div className="flex items-center gap-3 text-white">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-[var(--pbmit-xclean-global-color)] text-lg">★</span>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Rating</span>
              </div> */}
            </div>

            <div className="mt-10 sm:mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[var(--pbmit-xclean-global-color)]" />
                One app for all vehicles
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[var(--pbmit-xclean-global-color)]" />
                Secure & private
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--pbmit-xclean-global-color)]" />
                Instant RC & challan check
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="content-wrapper">
        <div className="home_ourServiceDesktop__MqRUH">
          <ServiceTabs />
        </div>
      </div>
    </>
  )
}

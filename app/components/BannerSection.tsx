'use client'

import Link from 'next/link'
import { Car, Shield, Wrench, ArrowRight, Tag } from 'lucide-react'

export function BannerSection() {
  return (
    <div className="content-wrapper">
      <div className="home_newBannerDesktop__N6Ey_">
        <Link href="/new-cars">
          <div className="home_bannerItem__nKvzx home_orangeBg__RA31I">
            <div className="home_bannerIcon__Qwv0m">
              <Car className="w-16 h-16" />
            </div>
            <div className="home_bannerText__55BfP flex-1 min-w-0">
              <h5 className="home_bannerHeading__OYj_g">Popular Cars at Best Prices!</h5>
              <p className="home_bannerSubText__rB8ga">Planning to buy a car? Discover latest cars and their specifications</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm sm:text-base">Explore Cars</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        </Link>
        
        <Link href="/car-insurance">
          <div className="home_bannerItem__nKvzx home_greenBg__Ntf_L">
            <div className="home_bannerIcon__Qwv0m">
              <Shield className="w-16 h-16" />
            </div>
            <div className="home_bannerText__55BfP flex-1 min-w-0">
              <h5 className="home_bannerHeading__OYj_g">Stay Insured & Ride Worry-Free!</h5>
              <p className="home_bannerSubText__rB8ga">Grab the best deals on vehicle insurance</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm sm:text-base">Insure Now</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        </Link>
        
        <Link href="/service-history">
          <div className="home_bannerItem__nKvzx home_blueBg__gv_v1">
            <div className="home_bannerIcon__Qwv0m">
              <Wrench className="w-16 h-16" />
            </div>
            <div className="home_bannerText__55BfP flex-1 min-w-0">
              <h5 className="home_bannerHeading__OYj_g">Service History at your Fingertips</h5>
              <p className="home_bannerSubText__rB8ga">Buying a used cars get it&apos;s complete service history</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm sm:text-base">View Report</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

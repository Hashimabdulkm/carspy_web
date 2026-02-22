'use client'

import { ServiceTabs } from './ServiceTabs'
import { QrCode } from 'lucide-react'

export function HeroSection() {
  return (
    <>
      <div className="home_topBannerBackground__WtICw">
        <div className="home_topBanner__E2_8C content-wrapper">
          <div className="home_topBannerHeader__yGa6N">
            <h1>Your Virtual</h1>
            <h3>Car Assistant!</h3>
          </div>
          <div className="home_topBannerInformation__ekIwh">
            <div className="home_qrImage__Styuy bg-white p-2 rounded-lg">
              <QrCode className="w-16 h-16 text-gray-800" />
            </div>
            <div className="home_infoText__P7CYz">
              <p><span className="text-2xl font-bold">4.6+</span> Rating</p>
              <p>Scan to Download</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-wrapper">
        <div className="home_ourServiceDesktop__MqRUH">
          <ServiceTabs />
        </div>
      </div>
    </>
  )
}

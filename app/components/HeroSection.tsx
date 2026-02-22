'use client'

import { ServiceTabs } from './ServiceTabs'

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
            <div className="home_qrImage__Styuy">
              <img alt="qr icon" src="/img/home/qrIcon.svg" width={80} height={80} />
            </div>
            <div className="home_infoText__P7CYz">
              <p><span>4.6+</span> Rating</p>
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

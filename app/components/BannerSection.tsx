'use client'

import Link from 'next/link'

export function BannerSection() {
  return (
    <div className="content-wrapper">
      <div className="home_newBannerDesktop__N6Ey_">
        <Link href="/new-cars">
          <div className="home_bannerItem__nKvzx home_orangeBg__RA31I">
            <div className="home_bannerIcon__Qwv0m">
              <img alt="newcar feature logo" src="https://files.carinfo.app/September8th2025/newCarsIcon.svg" />
            </div>
            <div className="home_bannerText__55BfP">
              <h5 className="home_bannerHeading__OYj_g">Popular Cars at Best Prices!</h5>
              <p className="home_bannerSubText__rB8ga">Planning to buy a car? Discover latest cars and their specifications</p>
              <img alt="explore newcars logo" src="https://files.carinfo.app/September8th2025/exploreCarsIcon.svg" />
            </div>
          </div>
        </Link>
        
        <Link href="/car-insurance">
          <div className="home_bannerItem__nKvzx home_greenBg__Ntf_L">
            <div className="home_bannerIcon__Qwv0m">
              <img alt="stay insured icon" src="/img/home/stayInsuredIcon.svg" />
            </div>
            <div className="home_bannerText__55BfP">
              <h5 className="home_bannerHeading__OYj_g">Stay Insured & Ride Worry-Free!</h5>
              <p className="home_bannerSubText__rB8ga">Grab the best deals on vehicle insurance</p>
              <img alt="insure now" src="/img/home/insureNowGreen.svg" />
            </div>
          </div>
        </Link>
        
        <Link href="/service-history">
          <div className="home_bannerItem__nKvzx home_blueBg__gv_v1">
            <div className="home_bannerIcon__Qwv0m">
              <img alt="service history instant icon" src="/img/home/serviceHistoryinstantIcon.svg" />
            </div>
            <div className="home_bannerText__55BfP">
              <h5 className="home_bannerHeading__OYj_g">Service History at your Fingertips</h5>
              <p className="home_bannerSubText__rB8ga">Buying a used cars get it&apos;s complete service history</p>
              <img alt="view report" src="/img/home/viewReportBlue.svg" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

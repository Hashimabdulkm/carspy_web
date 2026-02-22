'use client'

import Link from 'next/link'

const popularSUVs = [
  { name: 'Hyundai Creta', link: '/new-cars/hyundai/creta' },
  { name: 'Maruti Grand-vitara', link: '/new-cars/maruti-suzuki/grand-vitara' },
  { name: 'Nissan Magnite', link: '/new-cars/nissan/magnite' },
  { name: 'Skoda Kushaq', link: '/new-cars/skoda/kushaq' },
  { name: 'Tata Nexon', link: '/new-cars/tata/nexon' },
  { name: 'Mahindra Scorpio N', link: '/new-cars/mahindra/scorpio-n' },
]

const popularSedans = [
  { name: 'Honda City', link: '/new-cars/honda/city' },
  { name: 'Volkswagen Virtus', link: '/new-cars/volkswagen/virtus' },
  { name: 'Hyundai Aura', link: '/new-cars/hyundai/aura' },
  { name: 'Tata Tigor', link: '/new-cars/tata/tigor' },
  { name: 'Skoda Slavia', link: '/new-cars/skoda/slavia' },
  { name: 'Hyundai Verna', link: '/new-cars/hyundai/verna' },
]

const popularHatchbacks = [
  { name: 'Hyundai i20', link: '/new-cars/hyundai/i20' },
  { name: 'Maruti Swift', link: '/new-cars/maruti-suzuki/swift' },
  { name: 'Tata Altroz', link: '/new-cars/tata/altroz' },
  { name: 'Tata Tiago', link: '/new-cars/tata/tiago' },
  { name: 'Maruti Celerio', link: '/new-cars/maruti-suzuki/celerio' },
  { name: 'Maruti Baleno', link: '/new-cars/maruti-suzuki/baleno' },
]

export function Footer() {
  return (
    <div className="layout_homeFooterLayout__lTHto">
      <div className="MuiBox-root">
        <div className="MuiContainer-root MuiContainer-maxWidthLg">
          <div className="MuiBox-root">
            <div className="MuiBox-root">
              <div className="MuiBox-root">
                <img alt="car info" src="/_next/static/media/carinfofooter.74afa9f5.svg" />
                <div className="MuiBox-root">
                  <p className="MuiTypography-root MuiTypography-body1">
                    CarInfo is your all-in-one app for all your vehicle info needs and RTO vehicle information. Now manage all your vehicles in one place. Trace your car number with owner name
                  </p>
                  <div className="MuiBox-root">
                    <div className="MuiBox-root">
                      <img src="/img/footer/phoneicon.svg" alt="phone" />
                      <Link href="tel:+91 93-55-777-529" style={{ color: 'black', textDecoration: 'none' }}>
                        <p className="MuiTypography-root MuiTypography-body1">93-55-777-529</p>
                      </Link>
                    </div>
                    <div className="MuiBox-root">
                      <img alt="email icon" src="/img/home/emailIcon.svg" />
                      <Link href="mailto:support@carinfo.app" style={{ color: 'black', textDecoration: 'none' }}>
                        <p className="MuiTypography-root MuiTypography-body1">support@carinfo.app</p>
                      </Link>
                    </div>
                    <div className="MuiBox-root">
                      <img alt="location" src="/_next/static/media/locationcarinfo.27e08ce9.svg" />
                      <p className="MuiTypography-root MuiTypography-body1">Delhi</p>
                    </div>
                  </div>
                </div>
                <div className="MuiBox-root">
                  <p>Follow Our Journey:</p>
                  <Link href="https://www.facebook.com/carinfoapp">
                    <img alt="facebook icon" src="/_next/static/media/Frame (1).e182ab86.svg" />
                  </Link>
                  <Link href="http://instagram.com/carinfoapp">
                    <img alt="insta icon" src="/_next/static/media/Frame.2efcfdbb.svg" />
                  </Link>
                  <Link href="https://in.linkedin.com/company/carinfoapp">
                    <img alt="linkedin icon" src="/img/home/linkedInIcon.svg" />
                  </Link>
                </div>
              </div>
              
              <div className="MuiBox-root">
                <div className="MuiBox-root">
                  <div className="MuiBox-root">
                    <Link href="/about-us"><p>About Us</p></Link>
                    <Link href="/terms-condition"><p>Terms and Conditions</p></Link>
                    <Link href="/privacy-policy"><p>Privacy Policy</p></Link>
                    <Link href="/refund-policy"><p>Refunds & Cancellations Policy</p></Link>
                    <Link href="/shipping-policy"><p>Shipping & Delivery Policy</p></Link>
                    <Link href="/sitemap"><p>Sitemap</p></Link>
                    <Link href="/rc-search"><p>Check RC Details</p></Link>
                    <Link href="/rto-vehicle-registration-detail"><p>Check RTO Details</p></Link>
                    <Link href="/e-challan-check"><p>Check Challans</p></Link>
                    <Link href="/faq"><p>FAQs</p></Link>
                  </div>
                </div>
                
                <div className="MuiBox-root">
                  <p>Popular SUVs</p>
                  <div className="MuiBox-root">
                    {popularSUVs.map((car, index) => (
                      <Link key={index} href={car.link}><p>{car.name}</p></Link>
                    ))}
                  </div>
                </div>
                
                <div className="MuiBox-root">
                  <p>Popular Sedans</p>
                  <div className="MuiBox-root">
                    {popularSedans.map((car, index) => (
                      <Link key={index} href={car.link}><p>{car.name}</p></Link>
                    ))}
                  </div>
                </div>
                
                <div className="MuiBox-root">
                  <p>Popular Hatchbacks</p>
                  <div className="MuiBox-root">
                    {popularHatchbacks.map((car, index) => (
                      <Link key={index} href={car.link}><p>{car.name}</p></Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="MuiBox-root">
            <div className="MuiBox-root">
              <div className="MuiBox-root">
                <p>Download the</p>
                <p>CarInfo App:</p>
              </div>
              <Link href="https://play.google.com/store/apps/details?id=com.cuvora.carinfo" target="__blank">
                <img alt="play store icon" src="/img/footer/playStoreBanner.svg" />
              </Link>
              <Link href="https://apps.apple.com/in/app/carinfo-vehicle-information/id1146173741" target="__blank">
                <img alt="app store icon" src="/img/footer/appStoreBanner.svg" />
              </Link>
            </div>
            <img alt="footer car icon" src="/img/home/footerCar.svg" />
          </div>
        </div>
      </div>
      
      <footer className="main-footer">
        All rights reserved ©2026 CarInfo.
      </footer>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube, Twitter, Car, PlayCircle, Apple } from 'lucide-react'

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
    <footer className="layout_homeFooterLayout__lTHto bg-gray-900 text-white pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Car className="w-7 h-7 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
              <span className="text-xl sm:text-2xl font-bold">carspy</span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 max-w-md">
              carspy is your all-in-one app for all your vehicle info needs and RTO vehicle information. Now manage all your vehicles in one place.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <Link href="tel:+91 93-55-777-529" className="hover:text-white break-all">93-55-777-529</Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <Link href="mailto:support@carspy.app" className="hover:text-white break-all">support@carspy.app</Link>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Delhi</span>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-4">
              <Link href="https://www.facebook.com/carspyapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="http://instagram.com/carspyapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://in.linkedin.com/company/carspyapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              <li><Link href="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/terms-condition" className="text-gray-400 hover:text-white">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="text-gray-400 hover:text-white">Refunds & Cancellations</Link></li>
              <li><Link href="/shipping-policy" className="text-gray-400 hover:text-white">Shipping & Delivery</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* Vehicle Services */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Vehicle Services</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              <li><Link href="/rc-search" className="text-gray-400 hover:text-white">Check RC Details</Link></li>
              <li><Link href="/rto-vehicle-registration-detail" className="text-gray-400 hover:text-white">Check RTO Details</Link></li>
              <li><Link href="/e-challan-check" className="text-gray-400 hover:text-white">Check Challans</Link></li>
            </ul>
          </div>

          {/* Popular SUVs */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Popular SUVs</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-sm">
              {popularSUVs.map((car, index) => (
                <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white">{car.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Popular Sedans & Hatchbacks */}
          <div>
            <div className="mb-3 sm:mb-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Popular Sedans</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                {popularSedans.slice(0, 3).map((car, index) => (
                  <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white text-sm">{car.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Popular Hatchbacks</h4>
              <ul className="space-y-1.5 sm:space-y-2 text-sm">
                {popularHatchbacks.slice(0, 3).map((car, index) => (
                  <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white text-sm">{car.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-sm sm:text-base">Download the carspy App:</h4>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="https://play.google.com/store/apps/details?id=com.cuvora.carspy" className="bg-black border border-gray-700 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-gray-800">
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Get it on</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </Link>
            <Link href="https://apps.apple.com/in/app/carspy-vehicle-information/id1146173741" className="bg-black border border-gray-700 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-gray-800">
              <Apple className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm px-2">
          All rights reserved ©2026 carspy.
        </div>
      </div>
    </footer>
  )
}

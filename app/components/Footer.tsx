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
    <div className="layout_homeFooterLayout__lTHto bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">CarInfo</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              CarInfo is your all-in-one app for all your vehicle info needs and RTO vehicle information. Now manage all your vehicles in one place.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <Link href="tel:+91 93-55-777-529" className="hover:text-white">93-55-777-529</Link>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <Link href="mailto:support@carinfo.app" className="hover:text-white">support@carinfo.app</Link>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Delhi</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.facebook.com/carinfoapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="http://instagram.com/carinfoapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://in.linkedin.com/company/carinfoapp" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
            <h4 className="font-semibold mb-4">Vehicle Services</h4>
            <ul className="space-y-2">
              <li><Link href="/rc-search" className="text-gray-400 hover:text-white">Check RC Details</Link></li>
              <li><Link href="/rto-vehicle-registration-detail" className="text-gray-400 hover:text-white">Check RTO Details</Link></li>
              <li><Link href="/e-challan-check" className="text-gray-400 hover:text-white">Check Challans</Link></li>
              <li><Link href="/service-history" className="text-gray-400 hover:text-white">Service History</Link></li>
            </ul>
          </div>

          {/* Popular SUVs */}
          <div>
            <h4 className="font-semibold mb-4">Popular SUVs</h4>
            <ul className="space-y-2">
              {popularSUVs.map((car, index) => (
                <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white">{car.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Popular Sedans & Hatchbacks */}
          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Popular Sedans</h4>
              <ul className="space-y-2">
                {popularSedans.slice(0, 3).map((car, index) => (
                  <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white text-sm">{car.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Popular Hatchbacks</h4>
              <ul className="space-y-2">
                {popularHatchbacks.slice(0, 3).map((car, index) => (
                  <li key={index}><Link href={car.link} className="text-gray-400 hover:text-white text-sm">{car.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold">Download the CarInfo App:</h4>
          </div>
          <div className="flex gap-4">
            <Link href="https://play.google.com/store/apps/details?id=com.cuvora.carinfo" className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800">
              <PlayCircle className="w-6 h-6" />
              <div>
                <p className="text-xs text-gray-400">Get it on</p>
                <p className="text-sm font-semibold">Google Play</p>
              </div>
            </Link>
            <Link href="https://apps.apple.com/in/app/carinfo-vehicle-information/id1146173741" className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-800">
              <Apple className="w-6 h-6" />
              <div>
                <p className="text-xs text-gray-400">Download on the</p>
                <p className="text-sm font-semibold">App Store</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          All rights reserved ©2026 CarInfo.
        </div>
      </div>
    </div>
  )
}

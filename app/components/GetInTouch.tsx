'use client'

import Link from 'next/link'
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'

export function GetInTouch() {
  return (
    <section className="home_getInTouchLayout__DtIEf">
      <div className="home_getInTouchContainer__WOOXR content-wrapper">
        <div className="home_heading__oW6N7">
          <h4>Get In Touch</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-lg transition-shadow min-w-0">
            <div className="bg-green-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h6 className="font-semibold text-sm sm:text-base">Chat with us</h6>
              <p className="text-xs sm:text-sm text-gray-500 truncate">Send us a message</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          </div>
          
          <Link href="tel:+91 93-55-777-529" className="bg-white rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-lg transition-shadow text-inherit no-underline min-w-0">
            <div className="bg-blue-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h6 className="font-semibold text-sm sm:text-base">Talk to us</h6>
              <p className="text-xs sm:text-sm text-gray-500">93-55-777-529</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          </Link>
          
          <Link href="mailto:support@carspy.app" className="bg-white rounded-lg p-4 sm:p-5 flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-lg transition-shadow text-inherit no-underline min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="bg-orange-100 p-2.5 sm:p-3 rounded-full flex-shrink-0">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h6 className="font-semibold text-sm sm:text-base">Write to us</h6>
              <p className="text-xs sm:text-sm text-gray-500 truncate">support@carspy.app</p>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { MessageCircle, Phone, Mail, ArrowRight } from 'lucide-react'

export function GetInTouch() {
  return (
    <div className="home_getInTouchLayout__DtIEf">
      <div className="home_getInTouchContainer__WOOXR content-wrapper">
        <div className="home_heading__oW6N7">
          <h4>Get In Touch</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h6 className="font-semibold">Chat with us</h6>
              <p className="text-sm text-gray-500">Send us a message</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
          </div>
          
          <Link href="tel:+91 93-55-777-529" className="bg-white rounded-lg p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow text-decoration-none text-inherit">
            <div className="bg-blue-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h6 className="font-semibold">Talk to us</h6>
              <p className="text-sm text-gray-500">93-55-777-529</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
          </Link>
          
          <Link href="mailto:support@carinfo.app" className="bg-white rounded-lg p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-shadow text-decoration-none text-inherit">
            <div className="bg-orange-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h6 className="font-semibold">Write to us</h6>
              <p className="text-sm text-gray-500">support@carinfo.app</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
          </Link>
        </div>
      </div>
    </div>
  )
}

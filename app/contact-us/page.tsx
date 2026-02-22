'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Footer } from '@/app/components/Footer'
import { PageHero } from '@/app/components/PageHero'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react'

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: send to API or email service
    console.log('Contact form:', formState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Contact <span className="text-[var(--pbmit-xclean-global-color)]">Us</span>
          </>
        }
        subtitle="Have a question or need help? We're here for you. Reach out via phone, email, or the form below."
      />

      <div className="bg-white pt-12 sm:pt-16 lg:pt-20">
        <div className="content-wrapper pb-10 sm:pb-14">
        {/* Contact options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <Link
            href="#"
            className="flex items-center gap-4 p-5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Chat with us</h3>
              <p className="text-sm text-muted-foreground">Send us a message</p>
            </div>
          </Link>
          <Link
            href="tel:+919355777529"
            className="flex items-center gap-4 p-5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Call us</h3>
              <p className="text-sm text-muted-foreground">93-55-777-529</p>
            </div>
          </Link>
          <Link
            href="mailto:support@carspy.app"
            className="flex items-center gap-4 p-5 rounded-xl bg-secondary/50 border border-border hover:bg-secondary transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Email us</h3>
              <p className="text-sm text-muted-foreground">support@carspy.app</p>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact form */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Send a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formState.subject}
                  onChange={handleChange}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1.5 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]"
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Send message
              </Button>
            </form>
          </div>

          {/* Address & info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Office</h2>
            <div className="space-y-4 p-5 rounded-xl bg-secondary/30 border border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">Delhi, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <Link href="tel:+919355777529" className="text-sm text-primary hover:underline">
                    93-55-777-529
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <Link href="mailto:support@carspy.app" className="text-sm text-primary hover:underline">
                    support@carspy.app
                  </Link>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              We typically respond within 24 hours on business days. For urgent vehicle or RC-related queries, you can also use our app for instant results.
            </p>
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

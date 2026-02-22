import Link from 'next/link'
import { Footer } from '@/app/components/Footer'
import { PageHero } from '@/app/components/PageHero'
import { Shield, FileText, CreditCard, Wrench, Target, Heart, Zap } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white min-w-0 overflow-x-hidden">
      <PageHero
        eyebrow="Who we are"
        title={
          <>
            About <span className="text-[var(--pbmit-xclean-global-color)]">carspy</span>
          </>
        }
        subtitle="Your trusted partner for vehicle information, RC details, challans, insurance, and more. We help millions of vehicle owners stay informed and in control."
      />

      <div className="bg-white pt-12 sm:pt-16 lg:pt-20">
        <div className="content-wrapper pb-10 sm:pb-14">
        {/* Mission */}
        <section className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            carspy is your all-in-one app for all your vehicle info needs and RTO vehicle information. We believe every vehicle owner deserves easy access to RC details, challan status, service history, and insurance—all in one place. Our goal is to simplify vehicle ownership and keep you on the road with confidence.
          </p>
        </section>

        {/* What we do */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-10">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: 'RC & RTO Details', desc: 'Check vehicle registration and RTO information instantly.' },
              { icon: CreditCard, title: 'Challan Check & Pay', desc: 'View and pay traffic challans in one place.' },
              { icon: Shield, title: 'Insurance', desc: 'Car and bike insurance with quick quotes and renewal.' },
              { icon: Wrench, title: 'Service History', desc: 'Access vehicle service history for buying or selling.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Accuracy', desc: 'We source data from official channels to give you reliable vehicle information.' },
              { icon: Zap, title: 'Speed', desc: 'Instant results for RC checks, challans, and service history—no long waits.' },
              { icon: Heart, title: 'Trust', desc: 'Millions of users rely on carspy. We take your privacy and data security seriously.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 sm:p-10 rounded-2xl bg-primary/5 border border-primary/10">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">Ready to get started?</h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Download the carspy app or explore our services online. We&apos;re here to help you manage your vehicle with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <span className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white h-10 px-6 hover:bg-primary/90">
                Explore services
              </span>
            </Link>
            <Link href="/contact-us">
              <span className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background h-10 px-6 hover:bg-accent">
                Contact us
              </span>
            </Link>
          </div>
        </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | carspy',
  description: 'carspy is your all-in-one app for vehicle information, RC details, challans, service history, and insurance. Learn about our mission and what we offer.',
}

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

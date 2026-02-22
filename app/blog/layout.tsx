import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | carspy – Auto News, Challan, RTO & Vehicle Tips',
  description: 'Stay updated with the latest auto news, challan updates, RTO information, insurance tips, and vehicle guides from carspy.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | carspy',
  description: 'Get in touch with carspy. Call us, email support@carspy.app, or send a message. We\'re here to help with RC details, challans, insurance, and more.',
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

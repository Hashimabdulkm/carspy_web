import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Profile | carspy',
  description: 'Manage your carspy profile, saved vehicles, and quick access to RC details, challans, and insurance.',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

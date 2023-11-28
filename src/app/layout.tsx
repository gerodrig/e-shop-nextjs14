import type { Metadata } from 'next'
import { inter } from '@/config';

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | My E-shop',
    default: 'Home',
  },
  description: 'My E-shop with innovative products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

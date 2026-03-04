import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppNav } from '@/components/app-nav'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Oil Spill Detector - Satellite Image Analysis',
  description: 'Upload satellite or aerial imagery to detect oil spills using machine learning. Fast, accurate, and easy to use.',
  generator: 'v0.app',
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AppNav />
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'

import { cn } from '@/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { AdminBar } from '../components/AdminBar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LivePreviewListener } from '../components/LivePreviewListener'
import { Providers } from '../providers'
import { InitTheme } from '../providers/Theme/InitTheme'
import { mergeOpenGraph } from '../utilities/mergeOpenGraph'
import './globals.css'

import ModalsManager from '@/components/ModalsManager/modals-manager'
import { Toaster } from '@/components/ui/sonner'
import { Manrope } from 'next/font/google'
import './globals.css'

const ManropeFont = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(ManropeFont.className, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-svh">
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
        <ModalsManager />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}

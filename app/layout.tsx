import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { CookieConsent } from '@/components/cookie-consent'
import { LiquidCursor } from '@/components/liquid-cursor'
import { PremiumModal } from '@/components/premium-modal'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0046C0' },
    { media: '(prefers-color-scheme: dark)', color: '#4F7EE9' },
  ],
}

export const metadata: Metadata = {
  title: 'NironCare - Healthcare Without Boundaries',
  description: 'AI-powered digital health platform for ASEAN. Accessible healthcare anytime, anywhere.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LiquidCursor />
          <PremiumModal />
          {children}
          <CookieConsent />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

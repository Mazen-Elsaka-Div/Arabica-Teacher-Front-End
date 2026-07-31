import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo, Noto_Naskh_Arabic } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-naskh',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'أكاديمية شفاء العليل في اللغة العربية',
  description: 'منصة تعليمية متخصصة في اللغة العربية - تعلم اللغة العربية مع أفضل المدرسين',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1e16' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${notoNaskhArabic.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}

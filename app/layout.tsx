import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cairo, Geist_Mono, Aref_Ruqaa } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const arefRuqaa = Aref_Ruqaa({
  variable: '--font-aref-ruqaa',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'أكاديمية شفاء العليل',
    template: '%s | أكاديمية شفاء العليل',
  },
  description: 'منصة تعليمية متخصصة في تعليم اللغة العربية',
  keywords: ['لغة عربية', 'تعليم', 'أكاديمية', 'مازن السقا'],
  generator: 'v0.app',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    siteName: 'أكاديمية شفاء العليل',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1f33' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${arefRuqaa.variable} ${geistMono.variable} bg-background`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var t=localStorage.getItem('theme');
              var isDark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);
              if(isDark){document.documentElement.classList.add('dark')}
            }catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${cairo.className} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

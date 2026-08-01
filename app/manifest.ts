import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'أكاديمية شفاء العليل',
    short_name: 'شفاء العليل',
    description: 'منصة تعليمية متخصصة في تعليم اللغة العربية',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f7',
    theme_color: '#1a1f33',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}

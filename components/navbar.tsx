'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'المنهج', href: '#curriculum' },
  { label: 'المراحل', href: '#levels' },
  { label: 'أرقامنا', href: '#stats' },
  { label: 'آراء الطلاب', href: '#testimonials' },
]

/* ─── Hamburger icon: 3 animated bars ─── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex flex-col justify-center items-center size-5 gap-[5px]" aria-hidden>
      <span
        className={cn(
          'block h-[1.8px] bg-current rounded-full transition-all duration-300 origin-center',
          open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'
        )}
      />
      <span
        className={cn(
          'block h-[1.8px] bg-current rounded-full transition-all duration-300',
          open ? 'w-0 opacity-0' : 'w-3.5'
        )}
      />
      <span
        className={cn(
          'block h-[1.8px] bg-current rounded-full transition-all duration-300 origin-center',
          open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'
        )}
      />
    </span>
  )
}

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* close sidebar on outside click */
  useEffect(() => {
    if (!sidebarOpen) return
    function handleClick(e: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [sidebarOpen])

  /* lock body scroll when sidebar is open */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-6">
        {/* Decorative frame wrapper */}
        <div className="relative w-full max-w-[1200px]">

          {/* Top-right corner ornament */}
          <svg className="absolute -top-[14px] right-0 pointer-events-none" width="120" height="28" viewBox="0 0 120 28" fill="none">
            <path d="M120 14 L80 14 Q62 14 52 4 L40 4" stroke="#c8b99a" strokeWidth="1.6" opacity="0.9" strokeLinecap="round"/>
            <path d="M40 4 L30 4" stroke="#c8b99a" strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
            <circle cx="28" cy="4" r="2.5" fill="#c8b99a" opacity="0.9"/>
            <polygon points="118,11 123,14 118,17 113,14" fill="#c8b99a" opacity="0.8"/>
            <path d="M120 17 L84 17 Q68 17 58 7" stroke="#c8b99a" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
          </svg>

          {/* Top-left corner ornament */}
          <svg className="absolute -top-[14px] left-0 pointer-events-none" width="120" height="28" viewBox="0 0 120 28" fill="none">
            <path d="M0 14 L40 14 Q58 14 68 4 L80 4" stroke="#c8b99a" strokeWidth="1.6" opacity="0.9" strokeLinecap="round"/>
            <path d="M80 4 L90 4" stroke="#c8b99a" strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
            <circle cx="92" cy="4" r="2.5" fill="#c8b99a" opacity="0.9"/>
            <polygon points="2,11 -3,14 2,17 7,14" fill="#c8b99a" opacity="0.8"/>
            <path d="M0 17 L36 17 Q52 17 62 7" stroke="#c8b99a" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
          </svg>

          {/* Bottom-right corner ornament */}
          <svg className="absolute -bottom-[14px] right-0 pointer-events-none" width="120" height="28" viewBox="0 0 120 28" fill="none">
            <path d="M120 14 L80 14 Q62 14 52 24 L40 24" stroke="#c8b99a" strokeWidth="1.6" opacity="0.9" strokeLinecap="round"/>
            <path d="M40 24 L30 24" stroke="#c8b99a" strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
            <circle cx="28" cy="24" r="2.5" fill="#c8b99a" opacity="0.9"/>
            <polygon points="118,11 123,14 118,17 113,14" fill="#c8b99a" opacity="0.8"/>
            <path d="M120 11 L84 11 Q68 11 58 21" stroke="#c8b99a" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
          </svg>

          {/* Bottom-left corner ornament */}
          <svg className="absolute -bottom-[14px] left-0 pointer-events-none" width="120" height="28" viewBox="0 0 120 28" fill="none">
            <path d="M0 14 L40 14 Q58 14 68 24 L80 24" stroke="#c8b99a" strokeWidth="1.6" opacity="0.9" strokeLinecap="round"/>
            <path d="M80 24 L90 24" stroke="#c8b99a" strokeWidth="0.9" opacity="0.55" strokeLinecap="round"/>
            <circle cx="92" cy="24" r="2.5" fill="#c8b99a" opacity="0.9"/>
            <polygon points="2,11 -3,14 2,17 7,14" fill="#c8b99a" opacity="0.8"/>
            <path d="M0 11 L36 11 Q52 11 62 21" stroke="#c8b99a" strokeWidth="0.6" opacity="0.35" strokeLinecap="round"/>
          </svg>

          {/* Outer glow border */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: '0 0 0 1.5px rgba(200,185,154,0.35), 0 0 18px 2px rgba(200,185,154,0.1)' }}
          />

          <nav
            className={cn(
              'flex items-center justify-between gap-8 px-6 py-3 rounded-full border transition-all duration-300',
              'bg-card/80 backdrop-blur-md shadow-lg',
              scrolled && 'shadow-xl',
              'w-full'
            )}
            style={{ borderColor: 'rgba(200,185,154,0.4)' }}
          >
            {/* Left: CTA Buttons (desktop) + Hamburger (mobile) */}
            <div className="flex items-center gap-2">
              {/* Desktop CTAs */}
              <button className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                ابدأ الآن
              </button>
              <button className="hidden lg:block px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors">
                تسجيل الدخول
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="size-9 flex items-center justify-center rounded-full border border-border/60 hover:bg-muted transition-colors"
                  aria-label="تبديل المظهر"
                >
                  {theme === 'dark' ? (
                    <Sun className="size-4 text-muted-foreground" />
                  ) : (
                    <Moon className="size-4 text-muted-foreground" />
                  )}
                </button>
              )}

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden size-9 flex items-center justify-center rounded-full border border-border/60 hover:bg-muted transition-colors text-foreground"
                aria-label="فتح القائمة"
                aria-expanded={sidebarOpen}
              >
                <HamburgerIcon open={false} />
              </button>
            </div>

            {/* Center: Nav Links (desktop) */}
            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right: Logo */}
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-bold shrink-0">
                ش
              </div>
              <span className="text-sm font-bold text-foreground whitespace-nowrap hidden sm:block">
                أكاديمية شفاء العليل
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* ─── Mobile Sidebar ─── */}

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden
        onClick={closeSidebar}
      />

      {/* Drawer panel — slides in from the right (RTL) */}
      <div
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        dir="rtl"
        className={cn(
          'fixed top-0 right-0 h-full w-72 z-[70] flex flex-col',
          'bg-card border-l border-border/50 shadow-2xl',
          'transition-transform duration-300 ease-in-out md:hidden',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b border-border/40"
          style={{ borderColor: 'rgba(200,185,154,0.25)' }}
        >
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-sm font-bold shrink-0">
              ش
            </div>
            <span className="text-sm font-bold text-foreground">أكاديمية شفاء العليل</span>
          </div>
          <button
            onClick={closeSidebar}
            className="size-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground"
            aria-label="إغلاق القائمة"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeSidebar}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                    'text-muted-foreground hover:text-foreground hover:bg-muted/60',
                    'transition-colors duration-150'
                  )}
                >
                  {/* Decorative dot */}
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ background: 'rgba(200,185,154,0.7)' }}
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer: CTA buttons */}
        <div
          className="flex flex-col gap-2 px-4 py-5 border-t border-border/40"
          style={{ borderColor: 'rgba(200,185,154,0.25)' }}
        >
          <button
            onClick={closeSidebar}
            className="w-full py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            ابدأ الآن
          </button>
          <button
            onClick={closeSidebar}
            className="w-full py-2.5 rounded-full text-sm font-medium text-foreground border border-border/50 hover:bg-muted transition-colors"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </>
  )
}

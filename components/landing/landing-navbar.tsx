'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#features',     label: 'المميزات' },
  { href: '#stages',       label: 'المراحل' },
  { href: '#testimonials', label: 'آراء الطلاب' },
  { href: '#stats',        label: 'أرقامنا' },
]

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
      className={cn(
        'grid size-10 place-items-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5',
        'dark:border-white/10 dark:text-teal-glow dark:hover:bg-white/5',
        className,
      )}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4">
      <nav
        className={cn(
          'mx-auto flex h-14 max-w-[88rem] items-center justify-between rounded-full px-3 pr-5 transition-all duration-300 md:h-16 md:pr-6',
          'border border-navy/15 bg-cream/50 shadow-lg shadow-navy/5 ring-1 ring-cream/40 backdrop-blur-xl backdrop-saturate-150',
          'dark:border-white/10 dark:bg-ink-raised/50 dark:shadow-black/30 dark:ring-white/5',
          scrolled
            ? 'bg-cream/70 shadow-xl shadow-navy/10 dark:bg-ink-raised/70 dark:shadow-black/40'
            : 'bg-cream/40 dark:bg-ink-raised/40',
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/icon.svg"
            alt="شعار الأكاديمية"
            width={36}
            height={36}
            className="size-9 rounded-md"
          />
          <span className="font-heading text-lg font-bold text-navy dark:text-ink-fg leading-tight">
            أكاديمية شفاء العليل
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-semibold text-navy-soft transition-colors hover:text-navy dark:text-ink-dim dark:hover:text-ink-fg"
            >
              {l.label}
              <span className="absolute -bottom-1.5 right-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full dark:bg-teal-glow" />
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href="#stages"
            className="inline-flex items-center rounded-full bg-navy px-6 py-2.5 text-sm font-bold text-cream transition-transform duration-200 hover:-translate-y-0.5 hover:bg-navy-deep dark:bg-teal-glow dark:text-ink-base dark:hover:bg-teal-deep"
          >
            ابدأ التعلم
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-md text-navy dark:text-ink-fg"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-cream/40 bg-cream/80 px-5 py-4 shadow-xl shadow-navy/10 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-ink-raised/90 dark:shadow-black/40">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-navy-soft transition-colors hover:bg-navy/5 hover:text-navy dark:text-ink-dim dark:hover:bg-white/5 dark:hover:text-ink-fg"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2">
              <a
                href="#stages"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-navy px-6 py-3 text-base font-bold text-cream dark:bg-teal-glow dark:text-ink-base"
              >
                ابدأ التعلم
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

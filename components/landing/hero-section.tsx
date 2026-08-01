'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { AnimatedNumber } from './animated-number'
import { cn } from '@/lib/utils'

// Floating Arabic calligraphy letters/words as decorative backdrop
const floatSymbols = [
  { char: 'ب', top: '30%',  left: '4%',  size: 'text-4xl', color: 'text-gold-deep/55',    dark: 'dark:text-teal-glow/60' },
  { char: 'ج', bottom: '24%', left: '7%', size: 'text-5xl', color: 'text-navy/15',         dark: 'dark:text-teal-glow/55' },
  { char: 'ذ', top: '16%',  left: '20%', size: 'text-3xl', color: 'text-emerald-brand/55', dark: 'dark:text-teal-glow/55' },
  { char: 'ظ', top: '10%',  left: '38%', size: 'text-4xl', color: 'text-gold/55',          dark: 'dark:text-teal-glow/60' },
  { char: 'ح', top: '46%',  left: '2%',  size: 'text-5xl', color: 'text-emerald-deep/40',  dark: 'dark:text-teal-glow/55' },
  { char: 'ع', bottom: '34%', left: '30%', size: 'text-3xl', color: 'text-gold-deep/45',   dark: 'dark:text-teal-glow/50' },
  { char: 'غ', top: '62%',  left: '13%', size: 'text-4xl', color: 'text-navy/15',          dark: 'dark:text-teal-glow/45' },
  { char: 'ف', top: '6%',   left: '8%',  size: 'text-3xl', color: 'text-emerald-brand/45', dark: 'dark:text-teal-glow/50' },
  { char: 'ق', bottom: '8%', right: '4%', size: 'text-3xl', color: 'text-navy/12',         dark: 'dark:text-teal-glow/45' },
  { char: 'ك', top: '8%',   left: '52%', size: 'text-4xl', color: 'text-gold/45',          dark: 'dark:text-teal-glow/55' },
]

const MINI_STATS = [
  { value: 5000, prefix: '+', suffix: '', label: 'طالب مشترك' },
  { value: 200,  prefix: '+', suffix: '', label: 'درس متاح' },
  { value: 15,   prefix: '+', suffix: '', label: 'سنة خبرة' },
  { value: 95,   prefix: '',  suffix: '٪', label: 'نسبة نجاح' },
]

gsap.registerPlugin(useGSAP)

export function HeroSection() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-stagger', { opacity: 0, y: 28, duration: 0.7, stagger: 0.1 })
      .from('.hero-photo',   { opacity: 0, y: 40, scale: 0.97, duration: 1, clearProps: 'transform' }, '-=0.7')
      .from('.hero-axis',    { opacity: 0, scaleX: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.8')

    gsap.utils.toArray<HTMLElement>('.float-sym').forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -45 : 45,
        x: i % 3 === 0 ? 30 : -30,
        rotate: i % 2 === 0 ? 25 : -25,
        duration: 3 + (i % 3),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      })
    })
  }, { scope: root })

  return (
    <section ref={root} id="hero" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Floating Arabic letters */}
      {floatSymbols.map((s, i) => (
        <span
          key={i}
          className={`float-sym pointer-events-none absolute font-heading font-bold opacity-60 md:opacity-100 ${s.size} ${s.color} ${s.dark}`}
          style={{ top: s.top, bottom: s.bottom, left: s.left, right: s.right }}
          aria-hidden="true"
        >
          {s.char}
        </span>
      ))}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-end gap-6 px-5 md:grid-cols-12 md:gap-8 md:px-8">
        {/* Text column */}
        <div className="order-2 pb-16 md:order-1 md:col-span-5 md:pb-24 lg:col-span-6">
          <span className="hero-stagger inline-flex items-center gap-2 rounded-full border border-navy/15 bg-cream/80 px-4 py-1.5 text-sm font-semibold text-navy-soft backdrop-blur dark:border-white/10 dark:bg-ink-raised/70 dark:text-teal-glow">
            <Sparkles className="size-4 text-gold-deep dark:text-teal-glow" />
            منصة تعليم اللغة العربية الأولى
          </span>

          <h1 className="hero-stagger mt-7 font-heading text-4xl font-bold leading-[1.7] text-navy sm:text-5xl md:text-3xl md:leading-[1.6] lg:text-[2.5rem] lg:leading-[1.6] xl:text-[3.5rem] xl:leading-[1.65] dark:text-ink-fg">
            <span className="block">تعلّم اللغة العربية</span>
            <span className="block">
              بأسلوب{' '}
              <span className="text-emerald-deep dark:text-teal-glow">احترافي</span>
              {' '}ومنهجي
            </span>
          </h1>

          <p className="hero-stagger mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted md:text-sm lg:text-base xl:text-lg dark:text-ink-dim">
            منصة تعليمية متكاملة تقدم مناهج اللغة العربية لجميع المراحل الدراسية مع متابعة شاملة وتقييم مستمر لضمان التفوق.
          </p>

          <div className="hero-stagger mt-9 flex flex-col gap-3 sm:flex-row md:gap-2.5 lg:gap-3">
            <a
              href="#stages"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-navy-deep shadow-lg shadow-gold/30 transition-transform duration-200 hover:-translate-y-0.5 md:px-5 md:py-3 md:text-sm lg:px-8 lg:py-4 lg:text-base dark:bg-teal-glow dark:text-ink-base dark:shadow-[0_0_30px_oklch(0.73_0.10_75_/_0.45)]"
            >
              ابدأ التعلم الآن
              <ArrowLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-1 md:size-4 lg:size-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-navy/20 bg-cream/60 px-8 py-4 text-base font-bold text-navy backdrop-blur transition-colors hover:bg-navy/5 md:px-5 md:py-3 md:text-sm lg:px-8 lg:py-4 lg:text-base dark:border-white/15 dark:bg-white/5 dark:text-ink-fg dark:hover:bg-white/10"
            >
              اعرف أكتر عن المنصة
            </a>
          </div>

          {/* Mini stats */}
          <dl className="hero-stagger mt-12 flex flex-wrap items-start justify-between gap-6 sm:gap-8 border-t border-navy/10 pt-8 dark:border-white/10 max-w-lg">
            {MINI_STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center md:items-start">
                <dt className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy dark:text-teal-glow whitespace-nowrap">
                  <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} duration={2.5} />
                </dt>
                <dd className="mt-2 text-base sm:text-lg font-medium text-ink-muted dark:text-ink-dim">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo column */}
        <div className="relative order-1 flex items-end justify-center self-end md:order-2 md:col-span-7 lg:col-span-6">
          {/* Ground glow */}
          <div
            className="pointer-events-none absolute bottom-2 left-1/2 h-24 w-[78%] -translate-x-1/2 rounded-[50%] bg-navy/15 blur-2xl dark:bg-teal-glow/25"
            aria-hidden="true"
          />
          {/* Dark-mode radial halo */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full dark:block"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(closest-side, oklch(0.73 0.10 75 / 0.18), transparent 70%)',
            }}
          />

          <div className="hero-photo relative z-10 w-full max-w-[440px] -left-4 -top-3 md:-left-8 md:-mt-20 md:-top-4 md:max-w-[580px] lg:-mt-28 lg:max-w-[560px] xl:-mt-24 xl:max-w-[580px]">
            <Image
              src="/teacher.png"
              alt="المدرسة"
              width={772}
              height={1024}
              priority
              className="h-auto w-full object-contain"
            />

            {/* Geometric rule under teacher */}
            <div
              className="absolute -bottom-6 left-1/2 w-[85%] h-12 -translate-x-1/2 pointer-events-none"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              }}
            >
              <div className="hero-axis relative w-full h-full flex items-center">
                <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-gold dark:bg-teal-glow opacity-80" />
                <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
                  {Array.from({ length: 41 }).map((_, i) => {
                    const isCenter = i === 20
                    const isMajor = i % 10 === 0
                    const isMedium = i % 5 === 0
                    return (
                      <div key={i} className="flex flex-col items-center relative">
                        <div
                          className={cn(
                            'w-[2px] bg-gold dark:bg-teal-glow',
                            isCenter ? 'h-6 opacity-100' : isMajor ? 'h-4 opacity-100' : isMedium ? 'h-2.5 opacity-80' : 'h-1.5 opacity-50',
                          )}
                        />
                        {isCenter && (
                          <span className="absolute top-5 text-sm font-sans font-bold text-gold dark:text-teal-glow">٠</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

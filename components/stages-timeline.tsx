'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, Award } from 'lucide-react'
import { useIsDark } from '@/components/use-is-dark'

/* ─────────────────────────────────────────────────────────────
 * StagesTimeline — Scroll-driven wavy thread
 *
 * • The thread draws itself as the user scrolls (stroke-dash technique)
 * • Stop-point dots light up the moment the thread reaches them
 * • Title words sit split around the thread: one word right, one left
 * • The thread's final stretch straightens and pours vertically
 *   into the middle of the open book at the bottom
 * • Fully adaptive: light mode (gold canvas / brown ink) and
 *   dark mode (dark canvas / gold ink)
 * ───────────────────────────────────────────────────────────── */

const VIEW_W = 120
const VIEW_H = 1000

/* Wavy S-curve path down the center — the final stretch straightens
   out and pours vertically into the middle of the book's spine */
const PATH_D = [
  'M 60 2',
  'C 98 44, 22 86, 60 125',
  'C 98 167, 22 209, 60 250',
  'C 98 292, 22 334, 60 375',
  'C 98 417, 22 459, 60 500',
  'C 98 542, 22 584, 60 625',
  'C 98 667, 22 709, 60 750',
  'C 98 792, 22 834, 60 875',
  /* Final straightening curve and vertical drop to book center */
  'C 62 887, 60 895, 60 910',
  'L 60 968',
].join(' ')

const stages = [
  {
    id: 1,
    y: 250, // viewBox units — must be a wave crossing point (x = 60)
    side: 'right' as const,
    name: 'الصف الأول الثانوي',
    description: 'أساسيات اللغة العربية والقواعد الأساسية.',
    icon: BookOpen,
    units: ['النحو والقواعد الأساسية', 'القراءة والفهم', 'التعبير والكتابة'],
  },
  {
    id: 2,
    y: 500,
    side: 'left' as const,
    name: 'الصف الثاني الثانوي',
    description: 'تعمّق في النحو والبلاغة والأدب.',
    icon: GraduationCap,
    units: ['النحو المتقدم', 'البلاغة والبيان', 'الأدب العربي', 'النصوص والقراءة المتحررة'],
  },
  {
    id: 3,
    y: 750,
    side: 'right' as const,
    name: 'الصف الثالث الثانوي',
    description: 'إتقان اللغة والتحضير للامتحانات.',
    icon: Award,
    units: ['النحو الشامل', 'البلاغة والنقد الأدبي', 'الأدب والنصوص', 'القصة', 'التعبير والمراجعة النهائية'],
  },
]

const TITLE_Y = 80 // viewBox units where the section title reveals
const END_Y = 900 // when the book at the estuary reveals

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export function StagesTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLen, setPathLen] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tip, setTip] = useState({ x: 60, y: 0 })
  const isDark = useIsDark()

  /* ── Adaptive palette ── */
  /* Dark mode: "lava / ember" — deep charcoal-maroon canvas with
     molten orange-red ink, distinct from the brown/gold hero */
  const P = isDark
    ? {
        bg: 'oklch(0.105 0.022 30)',
        vignette: 'rgba(0,0,0,0.55)',
        threadA: 'oklch(0.74 0.18 45)',
        threadB: 'oklch(0.63 0.20 35)',
        threadC: 'oklch(0.52 0.19 29)',
        threadDim: 'oklch(0.63 0.19 35 / 15%)',
        threadShadow: 'drop-shadow(0 0 7px oklch(0.63 0.20 35 / 55%))',
        tipBg: 'oklch(0.82 0.16 50)',
        tipShadow: '0 0 16px 5px oklch(0.68 0.19 40 / 70%)',
        dotOn: 'oklch(0.70 0.19 40)',
        dotOnRing: 'oklch(0.88 0.09 50)',
        dotOff: 'oklch(0.22 0.030 30)',
        dotOffRing: 'oklch(0.38 0.050 32)',
        dotGlow: 'oklch(0.66 0.19 37 / 45%)',
        dotPulse: 'oklch(0.70 0.19 40)',
        kicker: 'oklch(0.74 0.14 45)',
        titleMain: 'oklch(0.95 0.014 45)',
        titleAccent: 'oklch(0.70 0.19 40)',
        bookHalo: 'oklch(0.55 0.16 35 / 32%)',
        bookShadow: 'drop-shadow(0 10px 30px rgba(0,0,0,0.65))',
        cardBg: 'oklch(0.145 0.026 30 / 88%)',
        cardBorder: 'oklch(0.66 0.17 38 / 26%)',
        cardShadow: '0 12px 44px rgba(0,0,0,0.6), inset 0 1px 0 oklch(0.66 0.17 38 / 12%)',
        cardGlow: 'oklch(0.44 0.13 33 / 28%)',
        iconBg: 'oklch(0.66 0.17 38 / 14%)',
        iconBorder: 'oklch(0.66 0.17 38 / 35%)',
        iconColor: 'oklch(0.74 0.17 45)',
        stageLabel: 'oklch(0.74 0.14 45)',
        heading: 'oklch(0.96 0.010 45)',
        body: 'oklch(0.74 0.030 40)',
        chipBg: 'oklch(0.66 0.17 38 / 6%)',
        chipBorder: 'oklch(0.66 0.17 38 / 16%)',
        chipNumBg: 'oklch(0.66 0.17 38 / 14%)',
        chipNumBorder: 'oklch(0.66 0.17 38 / 32%)',
        chipNumColor: 'oklch(0.76 0.16 46)',
        chipName: 'oklch(0.82 0.028 40)',
        connector: 'oklch(0.66 0.17 38)',
        hoverChipBg: 'oklch(0.66 0.17 38 / 16%)',
        hoverChipBorder: 'oklch(0.68 0.18 40 / 55%)',
        hoverChipShadow: '0 0 22px 2px oklch(0.66 0.17 38 / 32%), inset 0 0 12px oklch(0.66 0.17 38 / 10%)',
        hoverNumBg: 'oklch(0.68 0.19 40)',
        hoverNumColor: 'oklch(0.14 0.022 30)',
        hoverNumShadow: '0 0 14px 3px oklch(0.68 0.19 40 / 55%)',
        hoverName: 'oklch(0.95 0.030 48)',
      }
    : {
        bg: 'oklch(0.855 0.085 84)',
        vignette: 'oklch(0.795 0.088 78)',
        threadA: 'oklch(0.44 0.050 52)',
        threadB: 'oklch(0.335 0.055 50)',
        threadC: 'oklch(0.235 0.045 48)',
        threadDim: 'oklch(0.335 0.055 50 / 20%)',
        threadShadow: 'drop-shadow(0 1px 3px oklch(0.30 0.05 50 / 35%))',
        tipBg: 'oklch(0.235 0.045 48)',
        tipShadow: '0 0 0 3px oklch(0.965 0.030 88 / 85%), 0 0 14px 4px oklch(0.335 0.055 50 / 35%)',
        dotOn: 'oklch(0.235 0.045 48)',
        dotOnRing: 'oklch(0.965 0.030 88)',
        dotOff: 'oklch(0.76 0.070 78)',
        dotOffRing: 'oklch(0.60 0.060 60)',
        dotGlow: 'oklch(0.335 0.055 50 / 40%)',
        dotPulse: 'oklch(0.335 0.055 50)',
        kicker: 'oklch(0.50 0.050 58)',
        titleMain: 'oklch(0.33 0.042 50)',
        titleAccent: 'oklch(0.52 0.070 65)',
        bookHalo: 'oklch(0.96 0.035 88 / 55%)',
        bookShadow: 'drop-shadow(0 10px 26px oklch(0.30 0.05 50 / 45%))',
        cardBg: 'oklch(0.945 0.045 88 / 92%)',
        cardBorder: 'oklch(0.335 0.055 50 / 22%)',
        cardShadow: '0 12px 40px oklch(0.30 0.05 50 / 22%), inset 0 1px 0 oklch(1 0 0 / 45%)',
        cardGlow: 'oklch(0.96 0.035 88 / 45%)',
        iconBg: 'oklch(0.855 0.085 84)',
        iconBorder: 'oklch(0.335 0.055 50 / 28%)',
        iconColor: 'oklch(0.235 0.045 48)',
        stageLabel: 'oklch(0.44 0.050 52)',
        heading: 'oklch(0.32 0.042 50)',
        body: 'oklch(0.50 0.042 54)',
        chipBg: 'oklch(0.855 0.085 84 / 40%)',
        chipBorder: 'oklch(0.335 0.055 50 / 16%)',
        chipNumBg: 'oklch(0.855 0.085 84)',
        chipNumBorder: 'oklch(0.335 0.055 50 / 30%)',
        chipNumColor: 'oklch(0.33 0.042 50)',
        chipName: 'oklch(0.42 0.045 52)',
        connector: 'oklch(0.335 0.055 50)',
        hoverChipBg: 'oklch(0.855 0.085 84 / 85%)',
        hoverChipBorder: 'oklch(0.335 0.055 50 / 45%)',
        hoverChipShadow: '0 6px 18px oklch(0.30 0.05 50 / 18%), inset 0 1px 0 oklch(1 0 0 / 40%)',
        hoverNumBg: 'oklch(0.235 0.045 48)',
        hoverNumColor: 'oklch(0.94 0.045 88)',
        hoverNumShadow: '0 2px 10px oklch(0.30 0.05 50 / 35%)',
        hoverName: 'oklch(0.30 0.042 48)',
      }

  /* Measure the wavy path once */
  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength())
  }, [])

  /* Scroll-driven progress — the thread tip rides ~88% of the viewport */
  useEffect(() => {
    if (!pathLen) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setProgress(1)
      setTip({ x: 60, y: VIEW_H })
      return
    }

    let raf = 0
    const compute = () => {
      raf = 0
      const section = sectionRef.current
      const path = pathRef.current
      if (!section || !path) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.9
      const p = clamp((start - rect.top) / (rect.height - vh * 0.12), 0, 1)
      setProgress(p)
      const pt = path.getPointAtLength(p * pathLen)
      setTip({ x: pt.x, y: pt.y })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathLen])

  const titleActive = tip.y >= TITLE_Y
  const endActive = tip.y >= END_Y

  return (
    <section
      ref={sectionRef}
      aria-label="المراحل الدراسية"
      className="relative h-[300vh] overflow-hidden"
      style={{ background: P.bg }}
    >
      {/* Faint topo texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(/topo-dark.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: isDark ? 'normal' : 'multiply',
          opacity: isDark ? 0.14 : 0.1,
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 110% 55% at 50% 0%, ${P.vignette} 0%, transparent 58%), radial-gradient(ellipse 110% 55% at 50% 100%, ${P.vignette} 0%, transparent 58%)`,
        }}
      />

      {/* ── The wavy thread ── */}
      <div className="absolute inset-y-0 left-[82%] sm:left-1/2 -translate-x-1/2 w-20 sm:w-36 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="threadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={P.threadA} />
              <stop offset="55%" stopColor={P.threadB} />
              <stop offset="100%" stopColor={P.threadC} />
            </linearGradient>
          </defs>
          {/* Ghost track — barely visible full path */}
          <path d={PATH_D} stroke={P.threadDim} strokeWidth="1.5" fill="none" />
          {/* The growing thread */}
          <path
            ref={pathRef}
            d={PATH_D}
            stroke="url(#threadGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: pathLen || 1,
              strokeDashoffset: pathLen ? pathLen * (1 - progress) : pathLen || 1,
              filter: P.threadShadow,
            }}
          />
        </svg>

        {/* Glowing tip riding the thread */}
        {progress > 0.005 && progress < 0.995 && (
          <div
            className="absolute size-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(tip.x / VIEW_W) * 100}%`,
              top: `${(tip.y / VIEW_H) * 100}%`,
              background: P.tipBg,
              boxShadow: P.tipShadow,
            }}
            aria-hidden="true"
          />
        )}

        {/* Stop-point dots on the thread */}
        {stages.map((stage) => {
          const active = tip.y >= stage.y - 4
          return (
            <div
              key={stage.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: '50%', top: `${(stage.y / VIEW_H) * 100}%` }}
              aria-hidden="true"
            >
              {/* Outer pulse ring */}
              <span
                className="absolute rounded-full"
                style={{
                  width: 42,
                  height: 42,
                  border: `1.5px solid ${P.dotPulse}`,
                  opacity: active ? 0.55 : 0,
                  animation: active ? 'stopPulse 2.4s ease-out infinite' : 'none',
                  transition: 'opacity 0.4s ease',
                }}
              />
              {/* Inner core dot */}
              <span
                className="relative rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: active ? P.dotOn : P.dotOff,
                  border: `2.5px solid ${active ? P.dotOnRing : P.dotOffRing}`,
                  boxShadow: active ? `0 0 20px 6px ${P.dotGlow}` : 'none',
                  transform: active ? 'scale(1)' : 'scale(0.55)',
                  transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              />
            </div>
          )
        })}

      </div>

      {/* ── The book — the estuary where the thread pours in ── */}
      <div
        className="absolute z-10 bottom-0 left-[82%] sm:left-1/2 pointer-events-none"
        style={{
          transform: `translateX(-50%) scale(${endActive ? 1 : 0.6}) translateY(${endActive ? '0' : '30px'})`,
          opacity: endActive ? 1 : 0,
          transition: 'opacity 0.9s ease, transform 1s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        {/* Soft halo behind the book */}
        <div
          className="absolute inset-[-25%] rounded-full blur-3xl"
          aria-hidden="true"
          style={{ background: P.bookHalo }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/book.png"
          alt="كتاب اللغة العربية — نهاية الرحلة التعليمية"
          className="relative w-56 sm:w-80 h-auto"
          style={{ filter: P.bookShadow }}
        />
      </div>

      {/* ── Section title — words split around the thread ──
          Right of the thread: رحلتك / المراحل
          Left of the thread:  التعليمية / الدراسية        */}
      <div
        className="absolute z-10 inset-x-0 hidden sm:block"
        style={{ top: `${(TITLE_Y / VIEW_H) * 100}%`, transform: 'translateY(-50%)' }}
      >
        {/* Right column — hugs the thread with a small gap */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start gap-0.5"
          style={{
            left: 'calc(50% + 22px)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '60px 0',
            transition: 'opacity 0.8s ease 0.05s, translate 0.95s cubic-bezier(0.22,1,0.36,1) 0.05s',
          }}
        >
          <span className="title-kicker" style={{ color: P.kicker }}>
            رحلتك
          </span>
          <span className="title-main" style={{ color: P.titleMain }}>
            المراحل
          </span>
        </div>

        {/* Left column — hugs the thread with a small gap */}
        <div
          className="absolute top-1/2 -translate-y-1/2 flex flex-col items-end gap-0.5"
          style={{
            right: 'calc(50% + 22px)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '-60px 0',
            transition: 'opacity 0.8s ease 0.15s, translate 0.95s cubic-bezier(0.22,1,0.36,1) 0.15s',
          }}
        >
          <span className="title-kicker" style={{ color: P.kicker }}>
            التعليمية
          </span>
          <span className="title-main" style={{ color: P.titleMain }}>
            الدراسية
          </span>
        </div>
      </div>

      {/* Accessible real text, screen-reader only */}
      <h2 className="sr-only">المراحل الدراسية — رحلتك التعليمية</h2>

      {/* Mobile title — the thread sits at 82%, so center the title normally */}
      <div
        className="absolute z-10 sm:hidden left-[4%] w-[70vw]"
        style={{
          top: `${(TITLE_Y / VIEW_H) * 100}%`,
          transform: 'translateY(-50%)',
          opacity: titleActive ? 1 : 0,
          translate: titleActive ? '0 0' : '-70px 0',
          transition: 'opacity 0.8s ease, translate 0.9s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="relative">
          <span className="text-base font-bold tracking-wide" style={{ color: P.kicker, fontFamily: 'var(--font-noto-naskh), serif' }}>
            رحلتك التعليمية
          </span>
          <h2
            className="text-4xl font-black text-balance leading-tight mt-2"
            style={{ color: P.titleMain, fontFamily: 'var(--font-cairo)' }}
          >
            المراحل الدراسية
          </h2>
          <span
            className="block h-[4px] w-16 rounded-full mt-3"
            style={{ background: P.titleAccent }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Stage cards — alternating left / right ── */}
      {stages.map((stage) => {
        const active = tip.y >= stage.y - 4
        const fromLeft = stage.side === 'left'
        const Icon = stage.icon
        return (
          <div
            key={stage.id}
            className={`absolute z-10 w-[62vw] sm:w-[min(38vw,440px)] left-[4%] ${
              fromLeft ? 'sm:left-[6%] sm:right-auto' : 'sm:left-auto sm:right-[6%]'
            }`}
            style={{
              top: `${(stage.y / VIEW_H) * 100}%`,
              transform: 'translateY(-50%)',
              opacity: active ? 1 : 0,
              translate: active ? '0 0' : fromLeft ? '-80px 0' : '80px 0',
              transition: 'opacity 0.8s ease, translate 0.9s cubic-bezier(0.22,1,0.36,1)',
              pointerEvents: active ? 'auto' : 'none',
            }}
          >
            {/* Connector toward the thread */}
            <div
              className={`hidden sm:block absolute top-1/2 h-px w-[8vw] ${
                fromLeft ? 'left-full' : 'right-full'
              }`}
              aria-hidden="true"
              style={{
                background: fromLeft
                  ? `linear-gradient(to right, ${P.connector}, transparent)`
                  : `linear-gradient(to left, ${P.connector}, transparent)`,
                opacity: active ? 0.7 : 0,
                transition: 'opacity 0.8s ease 0.3s',
              }}
            />

            <div className="relative">
              {/* Soft glow behind the card */}
              <div
                className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                aria-hidden="true"
                style={{ background: P.cardGlow }}
              />

              <div
                className="relative rounded-2xl p-6 sm:p-7"
                style={{
                  background: P.cardBg,
                  border: `1px solid ${P.cardBorder}`,
                  boxShadow: P.cardShadow,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex items-center justify-center size-11 rounded-xl shrink-0"
                    style={{
                      background: P.iconBg,
                      border: `1px solid ${P.iconBorder}`,
                      color: P.iconColor,
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-xs font-bold"
                      style={{ color: P.stageLabel, fontFamily: 'var(--font-cairo)' }}
                    >
                      المرحلة {stage.id === 1 ? 'الأولى' : stage.id === 2 ? 'الثانية' : 'الثالثة'}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-black leading-tight"
                      style={{ color: P.heading, fontFamily: 'var(--font-cairo)' }}
                    >
                      {stage.name}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: P.body, fontFamily: 'var(--font-cairo)' }}
                >
                  {stage.description}
                </p>

                {/* Numbered units — staggered reveal, glow on hover */}
                <ul className="flex flex-col gap-2 mt-4" dir="rtl">
                  {stage.units.map((unit, i) => (
                    <li
                      key={unit}
                      className="unit-chip flex items-center gap-3 rounded-xl px-3 py-2 cursor-default"
                      style={{
                        background: P.chipBg,
                        border: `1px solid ${P.chipBorder}`,
                        opacity: active ? 1 : 0,
                        translate: active ? '0 0' : '0 14px',
                        transition: `opacity 0.55s ease ${0.35 + i * 0.12}s, translate 0.6s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.12}s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                      }}
                    >
                      <span
                        className="unit-num flex items-center justify-center size-7 rounded-lg text-xs font-black shrink-0"
                        style={{
                          background: P.chipNumBg,
                          border: `1px solid ${P.chipNumBorder}`,
                          color: P.chipNumColor,
                          fontFamily: 'var(--font-cairo)',
                          transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="unit-name text-sm font-bold"
                        style={{
                          color: P.chipName,
                          fontFamily: 'var(--font-cairo)',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}

      <style>{`
        @keyframes stopPulse {
          0%   { transform: scale(0.5); opacity: 0.6; }
          70%  { transform: scale(1.5);  opacity: 0; }
          100% { transform: scale(1.5);  opacity: 0; }
        }

        /* ── Title typography — clean and strong, no glow ── */
        .title-kicker {
          font-family: var(--font-cairo), sans-serif;
          font-size: clamp(0.9rem, 1.4vw, 1.3rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1.1;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .title-main {
          font-family: var(--font-cairo), sans-serif;
          font-size: clamp(2.2rem, 4.8vw, 3.8rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .unit-chip:hover {
          background: ${P.hoverChipBg} !important;
          border-color: ${P.hoverChipBorder} !important;
          box-shadow: ${P.hoverChipShadow};
        }
        .unit-chip:hover .unit-num {
          background: ${P.hoverNumBg} !important;
          color: ${P.hoverNumColor} !important;
          box-shadow: ${P.hoverNumShadow};
        }
        .unit-chip:hover .unit-name {
          color: ${P.hoverName} !important;
        }
      `}</style>
    </section>
  )
}

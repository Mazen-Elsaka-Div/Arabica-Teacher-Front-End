'use client'

import { useEffect, useRef, useState } from 'react'
import { BookOpen, GraduationCap, Award } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────
 * StagesTimeline — Scroll-driven wavy golden thread
 *
 * • The thread draws itself as the user scrolls (stroke-dash technique)
 * • Its tip always sits near the bottom of the viewport, so every
 *   pixel of scrolling extends the line a little more
 * • Stop-point dots light up the moment the thread reaches them
 * • Stage labels slide in from left / right with a soft warm-brown
 *   glow behind them
 * ───────────────────────────────────────────────────────────── */

const VIEW_W = 120
const VIEW_H = 1000

/* Wavy S-curve path down the center — same spirit as the topo lines */
const PATH_D = [
  'M 60 2',
  'C 98 44, 22 86, 60 125',
  'C 98 167, 22 209, 60 250',
  'C 98 292, 22 334, 60 375',
  'C 98 417, 22 459, 60 500',
  'C 98 542, 22 584, 60 625',
  'C 98 667, 22 709, 60 750',
  'C 98 792, 22 834, 60 875',
  /* Final stretch curves gently and dives into the book's mouth */
  'C 82 902, 74 920, 60 945',
].join(' ')

/* Gold — matches the topographic background lines */
const GOLD = 'oklch(0.78 0.10 80)'
const GOLD_DIM = 'oklch(0.78 0.10 80 / 15%)'

const stages = [
  {
    id: 1,
    y: 375, // viewBox units — must be a wave crossing point (x = 60)
    side: 'right' as const,
    name: 'الصف الأول الثانوي',
    description: 'أساسيات اللغة العربية والقواعد الأساسية — القراءة الفاهمة، القواعد، الكتابة الإبداعية والمحادثة.',
    icon: BookOpen,
  },
  {
    id: 2,
    y: 625,
    side: 'left' as const,
    name: 'الصف الثاني الثانوي',
    description: 'تعمّق في النحو والبلاغة والأدب — النحو المتقدم، البلاغة والبيان، الأدب العربي والنصوص.',
    icon: GraduationCap,
  },
  {
    id: 3,
    y: 875,
    side: 'right' as const,
    name: 'الصف الثالث الثانوي',
    description: 'إتقان اللغة والتحضير للامتحانات — الإملاء والترقيم، الترجمة، المحادثة المتقدمة والكتابة.',
    icon: Award,
  },
]

const TITLE_Y = 80 // viewBox units where the section title reveals
const END_Y = 915 // final stop dot — right where the thread meets the book

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export function StagesTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLen, setPathLen] = useState(0)
  const [progress, setProgress] = useState(0)
  const [tip, setTip] = useState({ x: 60, y: 0 })

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
      /* p = 0 when the section just peeks in at the bottom,
         p = 1 slightly before the section bottom reaches the viewport bottom,
         so the final stop dot lights up even when this is the last section */
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
      style={{ background: 'oklch(0.10 0.016 55)' }}
    >
      {/* Faint topo texture for continuity with the hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(/topo-dark.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.14,
        }}
      />
      {/* Vignette to keep the mood dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 110% 60% at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 55%), radial-gradient(ellipse 110% 60% at 50% 100%, rgba(0,0,0,0.55) 0%, transparent 55%)',
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
              <stop offset="0%" stopColor="oklch(0.82 0.11 85)" />
              <stop offset="55%" stopColor={GOLD} />
              <stop offset="100%" stopColor="oklch(0.66 0.09 70)" />
            </linearGradient>
          </defs>
          {/* Ghost track — barely visible full path */}
          <path d={PATH_D} stroke={GOLD_DIM} strokeWidth="1.5" fill="none" />
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
              filter: 'drop-shadow(0 0 6px oklch(0.78 0.10 80 / 55%))',
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
              background: 'oklch(0.90 0.10 88)',
              boxShadow: '0 0 14px 4px oklch(0.82 0.11 85 / 70%)',
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
              {/* Pulse ring */}
              <span
                className="absolute rounded-full"
                style={{
                  width: 40,
                  height: 40,
                  border: `1.5px solid ${GOLD}`,
                  opacity: active ? 0.5 : 0,
                  animation: active ? 'stopPulse 2.4s ease-out infinite' : 'none',
                  transition: 'opacity 0.4s ease',
                }}
              />
              <span
                className="relative rounded-full"
                style={{
                  width: 18,
                  height: 18,
                  background: active ? 'oklch(0.85 0.11 88)' : 'oklch(0.30 0.03 60)',
                  border: `2.5px solid ${active ? 'oklch(0.92 0.08 88)' : 'oklch(0.45 0.04 65)'}`,
                  boxShadow: active ? '0 0 18px 5px oklch(0.80 0.11 85 / 55%)' : 'none',
                  transform: active ? 'scale(1)' : 'scale(0.65)',
                  transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              />
            </div>
          )
        })}

        {/* Final stop dot */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ left: '50%', top: `${(END_Y / VIEW_H) * 100}%` }}
          aria-hidden="true"
        >
          <span
            className="absolute rounded-full"
            style={{
              width: 56,
              height: 56,
              border: `1.5px solid ${GOLD}`,
              opacity: endActive ? 0.5 : 0,
              animation: endActive ? 'stopPulse 2s ease-out infinite' : 'none',
              transition: 'opacity 0.4s ease',
            }}
          />
          <span
            className="relative rounded-full"
            style={{
              width: 26,
              height: 26,
              background: endActive ? 'oklch(0.85 0.11 88)' : 'oklch(0.30 0.03 60)',
              border: `3px solid ${endActive ? 'oklch(0.94 0.07 88)' : 'oklch(0.45 0.04 65)'}`,
              boxShadow: endActive ? '0 0 26px 8px oklch(0.80 0.11 85 / 60%)' : 'none',
              transform: endActive ? 'scale(1)' : 'scale(0.5)',
              transition: 'all 0.55s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          />
        </div>
      </div>

      {/* ── The book — the estuary where the golden thread pours in ── */}
      <div
        className="absolute z-10 bottom-2 left-[82%] sm:left-1/2 pointer-events-none"
        style={{
          transform: `translateX(-50%) scale(${endActive ? 1 : 0.6}) translateY(${endActive ? '0' : '30px'})`,
          opacity: endActive ? 1 : 0,
          transition: 'opacity 0.9s ease, transform 1s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        {/* Warm golden glow behind the book */}
        <div
          className="absolute inset-[-30%] rounded-full blur-3xl"
          aria-hidden="true"
          style={{ background: 'oklch(0.60 0.10 75 / 35%)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/book.png"
          alt="كتاب اللغة العربية — نهاية الرحلة التعليمية"
          className="relative w-36 sm:w-52 h-auto"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))' }}
        />
      </div>

      {/* ── Section title — split around the thread: «المراحل» on its right, «الدراسية» on its left ── */}
      <div
        className="absolute z-10 inset-x-0 hidden sm:block"
        style={{ top: `${(TITLE_Y / VIEW_H) * 100}%`, transform: 'translateY(-50%)' }}
      >
        {/* Kicker — centered above the split title */}
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-12 text-sm font-bold tracking-wide whitespace-nowrap"
          style={{
            color: GOLD,
            fontFamily: 'var(--font-cairo)',
            opacity: titleActive ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          رحلتك التعليمية
        </span>

        {/* «المراحل» — right of the thread, slides in from the right */}
        <h2
          className="absolute top-1/2 -translate-y-1/2 text-4xl md:text-5xl font-black leading-tight whitespace-nowrap"
          style={{
            left: 'calc(50% + 28px)',
            color: 'oklch(0.96 0.010 85)',
            fontFamily: 'var(--font-cairo)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '70px 0',
            transition: 'opacity 0.8s ease, translate 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span
            className="absolute -inset-6 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
            style={{ background: 'oklch(0.50 0.075 60 / 40%)' }}
          />
          <span className="relative">المراحل</span>
        </h2>

        {/* «الدراسية» — left of the thread, slides in from the left */}
        <h2
          className="absolute top-1/2 -translate-y-1/2 text-4xl md:text-5xl font-black leading-tight whitespace-nowrap"
          style={{
            right: 'calc(50% + 28px)',
            color: 'oklch(0.96 0.010 85)',
            fontFamily: 'var(--font-cairo)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '-70px 0',
            transition: 'opacity 0.8s ease, translate 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span
            className="absolute -inset-6 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
            style={{ background: 'oklch(0.50 0.075 60 / 40%)' }}
          />
          <span className="relative">الدراسية</span>
        </h2>
      </div>

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
          <div
            className="absolute -inset-8 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
            style={{ background: 'oklch(0.50 0.075 60 / 40%)' }}
          />
          <div className="relative">
            <span className="text-sm font-bold tracking-wide" style={{ color: GOLD, fontFamily: 'var(--font-cairo)' }}>
              رحلتك التعليمية
            </span>
            <h2
              className="text-4xl font-black text-balance leading-tight mt-2"
              style={{ color: 'oklch(0.96 0.010 85)', fontFamily: 'var(--font-cairo)' }}
            >
              المراحل الدراسية
            </h2>
          </div>
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
                  ? `linear-gradient(to right, ${GOLD}, transparent)`
                  : `linear-gradient(to left, ${GOLD}, transparent)`,
                opacity: active ? 0.6 : 0,
                transition: 'opacity 0.8s ease 0.3s',
              }}
            />

            <div className="relative">
              {/* Warm brown glow behind the card */}
              <div
                className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                aria-hidden="true"
                style={{ background: 'oklch(0.50 0.075 60 / 42%)' }}
              />

              <div
                className="relative rounded-2xl p-6 sm:p-7"
                style={{
                  background: 'oklch(0.15 0.024 55 / 88%)',
                  border: '1px solid oklch(0.78 0.10 80 / 26%)',
                  boxShadow: '0 12px 44px rgba(0,0,0,0.55), inset 0 1px 0 oklch(0.78 0.10 80 / 12%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex items-center justify-center size-11 rounded-xl shrink-0"
                    style={{
                      background: 'oklch(0.78 0.10 80 / 14%)',
                      border: '1px solid oklch(0.78 0.10 80 / 35%)',
                      color: GOLD,
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-xs font-bold"
                      style={{ color: GOLD, fontFamily: 'var(--font-cairo)' }}
                    >
                      المرحلة {stage.id === 1 ? 'الأولى' : stage.id === 2 ? 'الثانية' : 'الثالثة'}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-black leading-tight"
                      style={{ color: 'oklch(0.96 0.010 85)', fontFamily: 'var(--font-cairo)' }}
                    >
                      {stage.name}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'oklch(0.74 0.03 80)', fontFamily: 'var(--font-cairo)' }}
                >
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      <style>{`
        @keyframes stopPulse {
          0%   { transform: scale(0.5); opacity: 0.55; }
          70%  { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

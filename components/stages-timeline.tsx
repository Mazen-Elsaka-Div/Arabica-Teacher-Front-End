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

/* ── Inverted palette: warm gold canvas, deep brown ink ── */
const BG_GOLD     = 'oklch(0.855 0.085 84)'          // section background
const BG_GOLD_DEEP = 'oklch(0.795 0.088 78)'         // vignette / edges
const CARD_BG     = 'oklch(0.945 0.045 88 / 92%)'    // cream card surface

const INK         = 'oklch(0.335 0.055 50)'          // primary brown — thread, accents
const INK_DIM     = 'oklch(0.335 0.055 50 / 20%)'    // ghost track
const INK_STRONG  = 'oklch(0.235 0.045 48)'          // headings
const INK_SOFT    = 'oklch(0.435 0.048 52)'          // body copy

/* Stop-dot accent — deep espresso brown with a cream ring */
const DOT_COLOR  = INK_STRONG
const DOT_RING   = 'oklch(0.965 0.030 88)'
const DOT_GLOW   = 'oklch(0.335 0.055 50 / 40%)'
const DOT_PULSE  = 'oklch(0.335 0.055 50)'

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
      style={{ background: BG_GOLD }}
    >
      {/* Faint topo texture — multiplied so the contours read as brown on gold */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: 'url(/topo-dark.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
          opacity: 0.1,
        }}
      />
      {/* Vignette — deeper gold at the edges instead of black */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 110% 55% at 50% 0%, ${BG_GOLD_DEEP} 0%, transparent 58%), radial-gradient(ellipse 110% 55% at 50% 100%, ${BG_GOLD_DEEP} 0%, transparent 58%)`,
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
              <stop offset="0%" stopColor="oklch(0.44 0.050 52)" />
              <stop offset="55%" stopColor={INK} />
              <stop offset="100%" stopColor={INK_STRONG} />
            </linearGradient>
          </defs>
          {/* Ghost track — barely visible full path */}
          <path d={PATH_D} stroke={INK_DIM} strokeWidth="1.5" fill="none" />
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
              filter: 'drop-shadow(0 1px 3px oklch(0.30 0.05 50 / 35%))',
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
              background: INK_STRONG,
              boxShadow: '0 0 0 3px oklch(0.965 0.030 88 / 85%), 0 0 14px 4px oklch(0.335 0.055 50 / 35%)',
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
              {/* Outer pulse ring — teal accent */}
              <span
                className="absolute rounded-full"
                style={{
                  width: 42,
                  height: 42,
                  border: `1.5px solid ${DOT_PULSE}`,
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
                  background: active ? DOT_COLOR : 'oklch(0.76 0.070 78)',
                  border: `2.5px solid ${active ? DOT_RING : 'oklch(0.60 0.060 60)'}`,
                  boxShadow: active ? `0 0 20px 6px ${DOT_GLOW}` : 'none',
                  transform: active ? 'scale(1)' : 'scale(0.55)',
                  transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              />
            </div>
          )
        })}

      </div>

      {/* ── The book — the estuary where the golden thread pours in ── */}
      <div
        className="absolute z-10 bottom-0 left-[82%] sm:left-1/2 pointer-events-none"
        style={{
          transform: `translateX(-50%) scale(${endActive ? 1 : 0.6}) translateY(${endActive ? '0' : '30px'})`,
          opacity: endActive ? 1 : 0,
          transition: 'opacity 0.9s ease, transform 1s cubic-bezier(0.34,1.4,0.64,1)',
        }}
      >
        {/* Soft cream halo behind the book */}
        <div
          className="absolute inset-[-25%] rounded-full blur-3xl"
          aria-hidden="true"
          style={{ background: 'oklch(0.96 0.035 88 / 55%)' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/book.png"
          alt="كتاب اللغة العربية — نهاية الرحلة التعليمية"
          className="relative w-56 sm:w-80 h-auto"
          style={{ filter: 'drop-shadow(0 10px 26px oklch(0.30 0.05 50 / 45%))' }}
        />
      </div>

      {/* ── Section title — split around the thread ── */}
      <div
        className="absolute z-10 inset-x-0 hidden sm:block"
        style={{ top: `${(TITLE_Y / VIEW_H) * 100}%`, transform: 'translateY(-50%)' }}
      >
        {/* ── Kicker «رحلتك | التعليمية» — Naskh font, bigger, split ── */}
        <span
          className="kicker-naskh absolute whitespace-nowrap"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: '-5.5rem',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '0 -20px',
            transition: 'opacity 0.9s ease 0.1s, translate 1s cubic-bezier(0.22,1,0.36,1) 0.1s',
          }}
        >
          رحلتك التعليمية
        </span>

        {/* ── Main title «المراحل | الدراسية» — SVG text with draw-in stroke ── */}
        {/* Right side: «المراحل» */}
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            left: 'calc(50% + 28px)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '80px 0',
            transition: 'opacity 0.7s ease 0.05s, translate 1s cubic-bezier(0.22,1,0.36,1) 0.05s',
          }}
          aria-hidden="true"
        >
          {/* Soft cream halo */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'oklch(0.96 0.035 88 / 45%)' }}
          />
          <svg
            className="relative calligraphy-svg"
            viewBox="0 0 280 80"
            style={{ overflow: 'visible', width: 'clamp(180px, 22vw, 290px)', height: 'auto' }}
          >
            <defs>
              <linearGradient id="calliGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="oklch(0.335 0.055 50)" />
                <stop offset="45%"  stopColor="oklch(0.255 0.048 48)" />
                <stop offset="100%" stopColor="oklch(0.175 0.036 44)" />
              </linearGradient>
              <filter id="calliGlow" x="-30%" y="-80%" width="160%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feColorMatrix in="blur" type="saturate" values="1.4"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Shadow / depth layer */}
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="oklch(0.98 0.028 88 / 60%)"
              dx="1.5" dy="2"
              style={{ userSelect: 'none' }}
            >
              المراحل
            </text>
            {/* Stroke draw-in layer */}
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="none"
              stroke="url(#calliGrad1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#calliGlow)"
              className={titleActive ? 'draw-in' : ''}
              style={{ userSelect: 'none' }}
            >
              المراحل
            </text>
            {/* Fill layer fades in after stroke */}
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="url(#calliGrad1)"
              className={titleActive ? 'fill-in' : ''}
              style={{ userSelect: 'none' }}
            >
              المراحل
            </text>
          </svg>
        </div>

        {/* Left side: «الدراسية» */}
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            right: 'calc(50% + 28px)',
            opacity: titleActive ? 1 : 0,
            translate: titleActive ? '0 0' : '-80px 0',
            transition: 'opacity 0.7s ease 0.2s, translate 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}
          aria-hidden="true"
        >
          {/* Soft cream halo */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'oklch(0.96 0.035 88 / 45%)' }}
          />
          <svg
            className="relative calligraphy-svg"
            viewBox="0 0 260 80"
            style={{ overflow: 'visible', width: 'clamp(160px, 20vw, 270px)', height: 'auto' }}
          >
            <defs>
              <linearGradient id="calliGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="oklch(0.335 0.055 50)" />
                <stop offset="45%"  stopColor="oklch(0.255 0.048 48)" />
                <stop offset="100%" stopColor="oklch(0.175 0.036 44)" />
              </linearGradient>
              <filter id="calliGlow2" x="-30%" y="-80%" width="160%" height="260%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feColorMatrix in="blur" type="saturate" values="1.4"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="oklch(0.98 0.028 88 / 60%)"
              dx="1.5" dy="2"
              style={{ userSelect: 'none' }}
            >
              الدراسية
            </text>
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="none"
              stroke="url(#calliGrad2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#calliGlow2)"
              className={titleActive ? 'draw-in' : ''}
              style={{ userSelect: 'none' }}
            >
              الدراسية
            </text>
            <text
              x="8" y="64"
              fontFamily="var(--font-noto-naskh), serif"
              fontSize="64"
              fontWeight="700"
              fill="url(#calliGrad2)"
              className={titleActive ? 'fill-in' : ''}
              style={{ userSelect: 'none' }}
            >
              الدراسية
            </text>
          </svg>
        </div>
      </div>

      {/* Accessible real text, screen-reader only */}
      <h2
        className="sr-only"
        aria-label="المراحل الدراسية"
      >
        المراحل الدراسية
      </h2>

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
            style={{ background: 'oklch(0.96 0.035 88 / 50%)' }}
          />
          <div className="relative">
            <span className="text-sm font-bold tracking-wide" style={{ color: INK, fontFamily: 'var(--font-cairo)' }}>
              رحلتك التعليمية
            </span>
            <h2
              className="text-4xl font-black text-balance leading-tight mt-2"
              style={{ color: INK_STRONG, fontFamily: 'var(--font-cairo)' }}
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
                  ? `linear-gradient(to right, ${INK}, transparent)`
                  : `linear-gradient(to left, ${INK}, transparent)`,
                opacity: active ? 0.7 : 0,
                transition: 'opacity 0.8s ease 0.3s',
              }}
            />

            <div className="relative">
              {/* Soft cream glow behind the card */}
              <div
                className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none"
                aria-hidden="true"
                style={{ background: 'oklch(0.96 0.035 88 / 45%)' }}
              />

              <div
                className="relative rounded-2xl p-6 sm:p-7"
                style={{
                  background: CARD_BG,
                  border: '1px solid oklch(0.335 0.055 50 / 22%)',
                  boxShadow: '0 12px 40px oklch(0.30 0.05 50 / 22%), inset 0 1px 0 oklch(1 0 0 / 45%)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex items-center justify-center size-11 rounded-xl shrink-0"
                    style={{
                      background: 'oklch(0.855 0.085 84)',
                      border: '1px solid oklch(0.335 0.055 50 / 28%)',
                      color: INK_STRONG,
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span
                      className="text-xs font-bold"
                      style={{ color: INK, fontFamily: 'var(--font-cairo)' }}
                    >
                      المرحلة {stage.id === 1 ? 'الأولى' : stage.id === 2 ? 'الثانية' : 'الثالثة'}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-black leading-tight"
                      style={{ color: INK_STRONG, fontFamily: 'var(--font-cairo)' }}
                    >
                      {stage.name}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: INK_SOFT, fontFamily: 'var(--font-cairo)' }}
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
                        background: 'oklch(0.855 0.085 84 / 40%)',
                        border: '1px solid oklch(0.335 0.055 50 / 16%)',
                        opacity: active ? 1 : 0,
                        translate: active ? '0 0' : '0 14px',
                        transition: `opacity 0.55s ease ${0.35 + i * 0.12}s, translate 0.6s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.12}s, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                      }}
                    >
                      <span
                        className="unit-num flex items-center justify-center size-7 rounded-lg text-xs font-black shrink-0"
                        style={{
                          background: 'oklch(0.855 0.085 84)',
                          border: '1px solid oklch(0.335 0.055 50 / 30%)',
                          color: INK_STRONG,
                          fontFamily: 'var(--font-cairo)',
                          transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="unit-name text-sm font-bold"
                        style={{
                          color: 'oklch(0.315 0.048 50)',
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

        /* ── Kicker «رحلتك التعليمية» — Naskh, large, deep brown with electric glow ── */
        .kicker-naskh {
          font-family: var(--font-noto-naskh), serif;
          font-size: clamp(1.75rem, 5vw, 2.5rem);
          font-weight: 700;
          color: oklch(0.275 0.050 48);
          text-shadow:
            0 0 8px oklch(0.98 0.028 88 / 80%),
            0 0 24px oklch(0.98 0.028 88 / 60%),
            0 0 48px oklch(0.98 0.028 88 / 35%);
          letter-spacing: 0.02em;
        }

        /* ── SVG calligraphy: stroke draws in, then fill fades in ── */
        /* The stroke path starts invisible (dashoffset = full length)
           and animates to 0 — looks like the pen is writing.
           We use a large dasharray since we don't know path length,
           so 2000 covers every glyph we use. */

        .draw-in {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: drawStroke 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }

        .fill-in {
          opacity: 0;
          animation: fillReveal 0.9s ease 1.8s forwards;
        }

        @keyframes drawStroke {
          to { stroke-dashoffset: 0; }
        }

        @keyframes fillReveal {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        /* Electric glow on the calligraphy SVGs — multiple layers for luminous effect */
        .calligraphy-svg {
          filter: 
            drop-shadow(0 0 4px oklch(0.98 0.028 88 / 70%))
            drop-shadow(0 0 12px oklch(0.98 0.028 88 / 50%))
            drop-shadow(0 0 24px oklch(0.98 0.028 88 / 30%))
            drop-shadow(0 2px 8px oklch(0.30 0.05 50 / 15%));
        }

        .unit-chip:hover {
          background: oklch(0.855 0.085 84 / 85%) !important;
          border-color: oklch(0.335 0.055 50 / 45%) !important;
          box-shadow: 0 6px 18px oklch(0.30 0.05 50 / 18%), inset 0 1px 0 oklch(1 0 0 / 40%);
        }
        .unit-chip:hover .unit-num {
          background: oklch(0.235 0.045 48) !important;
          color: oklch(0.94 0.045 88) !important;
          box-shadow: 0 2px 10px oklch(0.30 0.05 50 / 35%);
        }
        .unit-chip:hover .unit-name {
          color: oklch(0.215 0.042 46) !important;
        }
      `}</style>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TopographicBackground } from '@/components/topo-background'

/* ── Letters flying out of the tablet ── */
const tabletLetters = [
  { letter: 'ا', top: '58%', left: '60%', size: 'text-xl',  opacity: 0.45, delay: '0s',   rotate: '-8deg' },
  { letter: 'ب', top: '54%', left: '64%', size: 'text-2xl', opacity: 0.55, delay: '0.4s', rotate: '6deg' },
  { letter: 'ت', top: '50%', left: '61%', size: 'text-xl',  opacity: 0.5,  delay: '0.8s', rotate: '-12deg' },
  { letter: 'ث', top: '48%', left: '68%', size: 'text-2xl', opacity: 0.6,  delay: '1.2s', rotate: '10deg' },
  { letter: 'ج', top: '42%', left: '65%', size: 'text-3xl', opacity: 0.65, delay: '0.2s', rotate: '-6deg' },
  { letter: 'ح', top: '38%', left: '72%', size: 'text-3xl', opacity: 0.7,  delay: '0.6s', rotate: '14deg' },
  { letter: 'خ', top: '34%', left: '68%', size: 'text-2xl', opacity: 0.6,  delay: '1s',   rotate: '-10deg' },
  { letter: 'د', top: '31%', left: '77%', size: 'text-4xl', opacity: 0.75, delay: '1.4s', rotate: '8deg' },
  { letter: 'ر', top: '26%', left: '72%', size: 'text-3xl', opacity: 0.7,  delay: '0.3s', rotate: '-14deg' },
  { letter: 'س', top: '22%', left: '81%', size: 'text-4xl', opacity: 0.8,  delay: '0.7s', rotate: '12deg' },
  { letter: 'ع', top: '17%', left: '76%', size: 'text-3xl', opacity: 0.65, delay: '1.1s', rotate: '-8deg' },
  { letter: 'ق', top: '13%', left: '85%', size: 'text-4xl', opacity: 0.75, delay: '1.5s', rotate: '16deg' },
  { letter: 'ل', top: '9%',  left: '79%', size: 'text-2xl', opacity: 0.55, delay: '0.5s', rotate: '-16deg' },
  { letter: 'م', top: '18%', left: '90%', size: 'text-3xl', opacity: 0.7,  delay: '0.9s', rotate: '6deg' },
  { letter: 'ن', top: '27%', left: '88%', size: 'text-2xl', opacity: 0.6,  delay: '1.3s', rotate: '-4deg' },
]

/* ── Stats data ── */
const statsData = [
  {
    target: 20,  prefix: '+', suffix: '', label: 'سنة خبرة',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 14 0v2"/>
      </svg>
    ),
  },
  {
    target: 300, prefix: '+', suffix: '', label: 'طالب',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    target: 97,  prefix: '', suffix: '٪', label: 'نسبة رضا',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
      </svg>
    ),
  },
]

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const toArabic = (n: number) => n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d])

/* ── Stat card — liquid glass ── */
function StatCard({
  target, prefix, suffix, label, icon, started,
}: {
  target: number; prefix: string; suffix: string; label: string; icon: React.ReactNode; started: boolean
}) {
  const count = useCountUp(target, 1600, started)

  return (
    <div
      className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl"
      style={{
        background: 'oklch(0.98 0.005 85 / 6%)',
        border: '1px solid oklch(0.98 0.005 85 / 18%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 oklch(0.98 0.005 85 / 12%)',
        backdropFilter: 'blur(12px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
      }}
    >
      {/* Icon */}
      <span style={{ color: 'oklch(0.84 0.11 88)' }}>{icon}</span>
      {/* Number */}
      <span
        className="text-3xl sm:text-4xl font-black tabular-nums leading-none"
        style={{ color: 'oklch(0.87 0.10 88)', fontFamily: 'var(--font-cairo)' }}
      >
        {prefix}{toArabic(count)}{suffix}
      </span>
      {/* Label */}
      <span className="text-xs font-semibold" style={{ color: 'oklch(0.78 0.03 85)' }}>
        {label}
      </span>
    </div>
  )
}

/* ── Circle badge — with hover animation ── */
function CircleBadge({
  value, label, size, className, style,
}: {
  value: string; label?: string; size: number; className?: string; style?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`absolute z-[12] flex flex-col items-center justify-center rounded-full select-none ${className ?? ''}`}
      style={{
        width: size, height: size,
        background: hovered
          ? 'oklch(0.84 0.11 88 / 18%)'
          : 'oklch(0.15 0.028 60 / 80%)',
        border: hovered
          ? '2px solid oklch(0.87 0.12 88 / 90%)'
          : '1.5px solid oklch(0.78 0.10 85 / 55%)',
        boxShadow: hovered
          ? '0 0 28px oklch(0.84 0.11 88 / 45%), inset 0 0 18px oklch(0.84 0.11 88 / 12%)'
          : '0 0 24px rgba(0,0,0,0.5), inset 0 0 16px oklch(0.78 0.10 85 / 6%)',
        backdropFilter: 'blur(6px)',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background 0.3s ease, border 0.3s ease',
        cursor: 'default',
        animation: 'badgePulse 3.5s ease-in-out infinite',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-black leading-none"
        style={{ fontFamily: 'var(--font-cairo)', color: 'oklch(0.87 0.10 88)', fontSize: size * 0.28 }}
      >
        {value}
      </span>
      {label && (
        <span
          className="font-semibold mt-1"
          style={{ color: 'oklch(0.75 0.06 85)', fontSize: Math.max(size * 0.09, 10) }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

/* ── Arabesque / geometric border ornament ── */
function ArabesqueLine() {
  return (
    <div className="flex items-center gap-3 w-full max-w-md" aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, oklch(0.84 0.11 88 / 60%), transparent)' }} />
      <svg width="120" height="18" viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Central diamond */}
        <polygon points="60,2 66,9 60,16 54,9" fill="oklch(0.84 0.11 88)" opacity="0.9"/>
        {/* Left ornament */}
        <polygon points="38,2 43,9 38,16 33,9" fill="none" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.7"/>
        <line x1="43" y1="9" x2="54" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.6"/>
        <circle cx="28" cy="9" r="2" fill="oklch(0.84 0.11 88)" opacity="0.5"/>
        <line x1="10" y1="9" x2="26" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="7" cy="9" r="1.2" fill="oklch(0.84 0.11 88)" opacity="0.35"/>
        {/* Right ornament (mirrored) */}
        <polygon points="82,2 87,9 82,16 77,9" fill="none" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.7"/>
        <line x1="66" y1="9" x2="77" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.6"/>
        <circle cx="92" cy="9" r="2" fill="oklch(0.84 0.11 88)" opacity="0.5"/>
        <line x1="94" y1="9" x2="110" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="0.8" opacity="0.4"/>
        <circle cx="113" cy="9" r="1.2" fill="oklch(0.84 0.11 88)" opacity="0.35"/>
      </svg>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, oklch(0.84 0.11 88 / 60%), transparent)' }} />
    </div>
  )
}

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const [textVisible, setTextVisible] = useState(false)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextVisible(true)
          setTimeout(() => setStatsStarted(true), 600)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    if (textRef.current) observer.observe(textRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      <TopographicBackground />

      {/* Dark shadow behind the text side */}
      <div
        className="absolute inset-y-0 start-0 w-full lg:w-[60%] z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 78% 45%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.52) 45%, transparent 75%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-stretch pt-24 md:pt-20 w-full">

        {/* ── TEXT SIDE ── */}
        <div
          ref={textRef}
          className="flex flex-col justify-center gap-7 order-2 md:order-1 w-full md:w-[50%] px-6 sm:px-10 md:ps-14 md:pe-10 pb-12 md:pb-20"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateX(0)' : 'translateX(80px)',
            transition: 'opacity 0.85s ease, transform 0.85s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Academy badge */}
          <div
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border bg-black/40 backdrop-blur-sm"
            style={{ borderColor: 'oklch(0.78 0.10 85 / 35%)' }}
          >
            <span className="size-2 rounded-full shrink-0 animate-pulse" style={{ background: 'oklch(0.85 0.10 88)' }} />
            <span className="text-xs font-semibold" style={{ color: 'oklch(0.85 0.06 85)', fontFamily: 'var(--font-cairo)' }}>
              أكاديمية اللغة العربية الأولى
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1
              className="text-5xl sm:text-6xl xl:text-[4.5rem] font-black text-balance leading-tight"
              style={{ fontFamily: 'var(--font-cairo)' }}
            >
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>كلامك عربي</span>
              <br />
              <span style={{ color: 'oklch(0.86 0.12 88)' }}>وجذوره أعمق</span>
              <br />
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>مما تتصوّر</span>
            </h1>
            <p className="text-base sm:text-lg font-bold pt-1" style={{ color: 'oklch(0.84 0.11 150)' }}>
              تعلّمها صح — من البداية للاحتراف
            </p>
          </div>

          {/* Arabesque separator under headline */}
          <ArabesqueLine />

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'oklch(0.86 0.02 85)', fontFamily: 'var(--font-cairo)', maxWidth: '38rem' }}
          >
            في أكاديمية شفاء العليل، مش هنحفّظك قواعد — هنخليك تحسّ بها. من النحو والصرف للبلاغة والإملاء، كل درس مبني على الفهم الحقيقي.
          </p>

          {/* CTA — shimmer + ornament frame */}
          <div className="flex items-center gap-4">
            <div className="relative inline-block">
              {/* Outer decorative frame */}
              <span
                className="absolute -inset-[6px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid oklch(0.84 0.11 88 / 35%)',
                  animation: 'framePulse 2.5s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              <span
                className="absolute -inset-[11px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid oklch(0.84 0.11 88 / 18%)',
                  animation: 'framePulse 2.5s ease-in-out infinite 0.3s',
                }}
                aria-hidden="true"
              />
              <button
                className="cta-shimmer relative overflow-hidden flex items-center gap-3 px-9 py-4 rounded-full text-base font-black transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'oklch(0.84 0.11 88)',
                  color: 'oklch(0.13 0.04 60)',
                  boxShadow: '0 6px 30px oklch(0.84 0.11 88 / 35%)',
                  fontFamily: 'var(--font-cairo)',
                }}
              >
                <span className="cta-shimmer-bar" aria-hidden="true" />
                <span className="relative z-10">سجّل معانا</span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="relative z-10 rtl:rotate-180" aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Stats — liquid glass cards */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            {statsData.map((s, i) => (
              <StatCard key={i} {...s} started={statsStarted} />
            ))}
          </div>
        </div>

        {/* ── TEACHER SIDE ── */}
        <div className="relative order-1 md:order-2 w-full md:w-[50%] h-[520px] sm:h-[620px] md:h-auto md:min-h-[calc(100vh-5rem)] overflow-hidden">

          {/* Letters floating from tablet */}
          {tabletLetters.map((item, i) => (
            <span
              key={i}
              className={`absolute z-[13] font-black select-none pointer-events-none letter-rise ${item.size}`}
              style={{
                top: item.top, left: item.left,
                fontFamily: 'var(--font-cairo)',
                color: 'oklch(0.85 0.10 88)',
                opacity: item.opacity,
                animationDelay: item.delay,
                transform: `rotate(${item.rotate})`,
                textShadow: '0 0 14px oklch(0.85 0.10 88 / 45%)',
              }}
              aria-hidden="true"
            >
              {item.letter}
            </span>
          ))}

          {/* Glow from tablet */}
          <div
            className="absolute z-[11] pointer-events-none"
            aria-hidden="true"
            style={{
              top: '48%', left: '48%', width: 240, height: 240,
              background: 'radial-gradient(circle, oklch(0.88 0.09 88 / 25%) 0%, transparent 65%)',
              filter: 'blur(8px)',
            }}
          />

          {/* Circle badges with hover effect */}
          <CircleBadge value="+٢٠"  label="سنة خبرة" size={140} className="hidden sm:flex" style={{ top: '8%',    left: '2%' }} />
          <CircleBadge value="+٣٠٠" label="طالب"     size={125} className="hidden sm:flex" style={{ bottom: '10%', left: '3%' }} />
          <CircleBadge value="٩٧٪"  label="نسبة رضا" size={105} className="hidden sm:flex" style={{ bottom: '2%',  left: '38%' }} />

          {/* Book — tilted, split between sections */}
          <div
            className="absolute z-[12] pointer-events-none"
            style={{
              bottom: '-65%', right: '5%', width: 200,
              animation: 'gentleFloat 5s ease-in-out infinite',
              transform: 'rotate(-28deg)',
            }}
          >
            <Image src="/book.png" alt="" width={200} height={133}
              className="w-full h-auto drop-shadow-[0_14px_35px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Inkwell & quill */}
          <div
            className="absolute z-[9] pointer-events-none"
            style={{
              top: '32%', left: '6%', width: 160,
              animation: 'gentleFloat 6s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <Image src="/حباره.png" alt="" width={160} height={283}
              className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Teacher image — full opacity, no mask */}
          <div
            className="absolute bottom-0 z-[15] pointer-events-none"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              height: '105%',
              width: 'auto',
            }}
          >
            <Image
              src="/teacher.png"
              alt="المدرس - أكاديمية شفاء العليل في اللغة العربية"
              width={2400}
              height={1282}
              className="h-full w-auto max-w-none"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.55))' }}
              priority
            />
          </div>

          <style>{`
            @keyframes gentleFloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-14px); }
            }
            @keyframes letterRise {
              0%, 100% { translate: 0 0; }
              50%       { translate: 0 -12px; }
            }
            .letter-rise { animation: letterRise 4.5s ease-in-out infinite; }

            @keyframes badgePulse {
              0%, 100% { box-shadow: 0 0 24px rgba(0,0,0,0.5), 0 0 0 0 oklch(0.84 0.11 88 / 0%); }
              50%       { box-shadow: 0 0 24px rgba(0,0,0,0.5), 0 0 0 8px oklch(0.84 0.11 88 / 10%); }
            }

            @keyframes shimmerSweep {
              0%   { transform: translateX(-120%) skewX(-20deg); }
              100% { transform: translateX(320%) skewX(-20deg); }
            }
            .cta-shimmer-bar {
              position: absolute;
              inset: 0;
              width: 40%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
              animation: shimmerSweep 2.4s ease-in-out infinite;
            }

            @keyframes framePulse {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50%       { opacity: 1;   transform: scale(1.03); }
            }
          `}</style>
        </div>
      </div>

      {/* Bottom arabesque separator */}
      <div className="relative z-10 pb-6 px-8 max-w-7xl mx-auto w-full">
        <ArabesqueLine />
      </div>
    </section>
  )
}

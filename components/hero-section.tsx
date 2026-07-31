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

/* ── Stats data (numeric target for count-up) ── */
const statsData = [
  { target: 20,  prefix: '+', suffix: '',  label: 'سنة خبرة', color: 'oklch(0.87 0.10 88)' },
  { target: 300, prefix: '+', suffix: '',  label: 'طالب',     color: 'oklch(0.87 0.10 88)' },
  { target: 97,  prefix: '',  suffix: '٪', label: 'نسبة رضا', color: 'oklch(0.87 0.10 88)' },
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
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ── Individual stat with count-up ── */
function StatItem({
  target, prefix, suffix, label, color, started,
}: {
  target: number; prefix: string; suffix: string; label: string; color: string; started: boolean
}) {
  const count = useCountUp(target, 1600, started)

  // Convert to Arabic-Indic numerals
  const toArabic = (n: number) =>
    n.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d])

  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className="text-3xl sm:text-4xl font-black tabular-nums"
        style={{ color, fontFamily: 'var(--font-cairo)' }}
      >
        {prefix}{toArabic(count)}{suffix}
      </span>
      <span className="text-xs font-medium" style={{ color: 'oklch(0.72 0.03 85)' }}>
        {label}
      </span>
    </div>
  )
}

/* ── Circle badges ── */
function CircleBadge({
  value, label, size, className, style,
}: {
  value: string; label?: string; size: number; className?: string; style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute z-[12] flex flex-col items-center justify-center rounded-full select-none pointer-events-none ${className ?? ''}`}
      style={{
        width: size, height: size,
        background: 'oklch(0.15 0.028 60 / 85%)',
        border: '1.5px solid oklch(0.78 0.10 85 / 70%)',
        boxShadow: '0 0 30px rgba(0,0,0,0.55), inset 0 0 20px oklch(0.78 0.10 85 / 8%)',
        backdropFilter: 'blur(4px)',
        ...style,
      }}
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

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const [textVisible, setTextVisible] = useState(false)
  const [statsStarted, setStatsStarted] = useState(false)

  /* Trigger slide-in + count-up when section enters viewport */
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
            'radial-gradient(ellipse 85% 70% at 78% 45%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 45%, transparent 75%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-stretch pt-24 md:pt-20 w-full">

        {/* ── TEXT SIDE ── */}
        <div
          ref={textRef}
          className="flex flex-col justify-center gap-6 order-2 md:order-1 w-full md:w-[48%] px-6 sm:px-10 md:ps-14 md:pe-8 pb-12 md:pb-20"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateX(0)' : 'translateX(60px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border bg-black/40 backdrop-blur-sm"
            style={{ borderColor: 'oklch(0.78 0.10 85 / 35%)' }}
          >
            <span className="size-2 rounded-full shrink-0" style={{ background: 'oklch(0.85 0.10 88)' }} />
            <span className="text-xs font-semibold" style={{ color: 'oklch(0.85 0.06 85)' }}>
              أكاديمية اللغة العربية الأولى
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-0">
            <h1
              className="text-5xl sm:text-6xl xl:text-[4.2rem] font-black text-balance"
              style={{ fontFamily: 'var(--font-cairo)', lineHeight: 1.3 }}
            >
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>كلامك عربي</span>
              <br />
              <span style={{ color: 'oklch(0.86 0.12 88)' }}>وجذوره أعمق</span>
              <br />
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>مما تتصوّر</span>
            </h1>
            <div className="pt-3">
              <span className="text-lg sm:text-xl font-bold" style={{ color: 'oklch(0.84 0.11 150)' }}>
                تعلّمها صح — من البداية للاحتراف
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-lg"
            style={{ color: 'oklch(0.86 0.02 85)' }}
          >
            في أكاديمية شفاء العليل، مش هنحفّظك قواعد — هنخليك تحسّ بها. من النحو والصرف للبلاغة والإملاء، كل درس مبني على الفهم الحقيقي.
          </p>

          {/* Single CTA — shimmer + border frame */}
          <div className="flex items-center">
            <button
              className="cta-shimmer relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-full text-base font-black transition-transform hover:scale-105 active:scale-95"
              style={{
                background: 'oklch(0.84 0.11 88)',
                color: 'oklch(0.13 0.04 60)',
                boxShadow: '0 0 0 2px oklch(0.84 0.11 88 / 40%), 0 0 0 5px oklch(0.84 0.11 88 / 15%), 0 8px 32px oklch(0.84 0.11 88 / 30%)',
                fontFamily: 'var(--font-cairo)',
              }}
            >
              {/* Shimmer overlay */}
              <span className="cta-shimmer-bar" aria-hidden="true" />
              <span>سجّل معانا</span>
              <span className="text-lg">←</span>
            </button>
          </div>

          {/* Stats — count-up */}
          <div className="flex items-center gap-10 pt-2">
            {statsData.map((s, i) => (
              <StatItem key={i} {...s} started={statsStarted} />
            ))}
          </div>
        </div>

        {/* ── TEACHER SIDE ── */}
        <div className="relative order-1 md:order-2 w-full md:w-[52%] h-[520px] sm:h-[620px] md:h-auto md:min-h-[calc(100vh-5rem)] overflow-hidden">

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

          {/* Circle badges */}
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

          {/* Teacher image — no mask, full opacity */}
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

            /* Shimmer sweep */
            @keyframes shimmerSweep {
              0%   { transform: translateX(-120%) skewX(-20deg); }
              100% { transform: translateX(320%) skewX(-20deg); }
            }
            .cta-shimmer-bar {
              position: absolute;
              inset-y: 0;
              left: 0;
              width: 40%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent);
              animation: shimmerSweep 2.2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="relative z-10 pb-4 px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground font-medium px-2">✦</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  )
}

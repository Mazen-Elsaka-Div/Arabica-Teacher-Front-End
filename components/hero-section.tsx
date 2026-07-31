'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TopographicBackground } from '@/components/topo-background'

/* ── Letters flying out of the tablet ── */
/*
 * In the new teacher image the tablet is held at roughly:
 *   top: 53-72% of the teacher column height
 *   left: 42-65% of the teacher column width
 * Letters burst upward and to the LEFT from that origin point.
 */
const tabletLetters = [
  /* tight cluster — just above the tablet */
  { letter: 'ا', top: '52%', left: '52%', size: 'text-xl',  opacity: 0.55, delay: '0s',   rotate: '-8deg'  },
  { letter: 'ب', top: '49%', left: '60%', size: 'text-2xl', opacity: 0.60, delay: '0.4s', rotate: '8deg'   },
  { letter: 'ت', top: '47%', left: '46%', size: 'text-xl',  opacity: 0.50, delay: '0.8s', rotate: '-12deg' },
  { letter: 'ث', top: '44%', left: '58%', size: 'text-2xl', opacity: 0.65, delay: '1.2s', rotate: '10deg'  },
  /* mid-arc — diagonal up-left */
  { letter: 'ج', top: '40%', left: '42%', size: 'text-3xl', opacity: 0.68, delay: '0.2s', rotate: '-6deg'  },
  { letter: 'ح', top: '36%', left: '34%', size: 'text-3xl', opacity: 0.72, delay: '0.6s', rotate: '14deg'  },
  { letter: 'خ', top: '32%', left: '50%', size: 'text-2xl', opacity: 0.62, delay: '1s',   rotate: '-10deg' },
  { letter: 'د', top: '28%', left: '26%', size: 'text-4xl', opacity: 0.78, delay: '1.4s', rotate: '8deg'   },
  /* high arc */
  { letter: 'ر', top: '24%', left: '38%', size: 'text-3xl', opacity: 0.72, delay: '0.3s', rotate: '-14deg' },
  { letter: 'س', top: '19%', left: '18%', size: 'text-4xl', opacity: 0.82, delay: '0.7s', rotate: '12deg'  },
  { letter: 'ع', top: '15%', left: '30%', size: 'text-3xl', opacity: 0.68, delay: '1.1s', rotate: '-8deg'  },
  { letter: 'ق', top: '10%', left: '10%', size: 'text-4xl', opacity: 0.78, delay: '1.5s', rotate: '16deg'  },
  { letter: 'ل', top: '7%',  left: '22%', size: 'text-2xl', opacity: 0.58, delay: '0.5s', rotate: '-16deg' },
  { letter: 'م', top: '17%', left: '46%', size: 'text-3xl', opacity: 0.72, delay: '0.9s', rotate: '6deg'   },
  { letter: 'ن', top: '29%', left: '54%', size: 'text-2xl', opacity: 0.62, delay: '1.3s', rotate: '-4deg'  },
]

/* ── Stats data ── */
const statsData = [
  {
    target: 20, prefix: '+', suffix: '', label: 'سنة خبرة',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 14 0v2"/>
      </svg>
    ),
  },
  {
    target: 300, prefix: '+', suffix: '', label: 'طالب',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    target: 97, prefix: '', suffix: '٪', label: 'نسبة رضا',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

/* ── Single stat item inside the unified bar ── */
function StatItem({
  target, prefix, suffix, label, icon, started,
}: {
  target: number; prefix: string; suffix: string; label: string; icon: React.ReactNode; started: boolean
}) {
  const count = useCountUp(target, 1600, started)
  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <span className="shrink-0" style={{ color: 'oklch(0.84 0.11 88)' }}>{icon}</span>
      <div className="flex flex-col leading-tight">
        <span
          className="text-2xl sm:text-3xl font-black tabular-nums"
          style={{ color: 'oklch(0.87 0.10 88)', fontFamily: 'var(--font-cairo)' }}
        >
          {prefix}{toArabic(count)}{suffix}
        </span>
        <span className="text-xs font-semibold" style={{ color: 'oklch(0.72 0.03 85)' }}>
          {label}
        </span>
      </div>
    </div>
  )
}

/* ── Stats unified liquid-glass bar ── */
function StatsBar({ started }: { started: boolean }) {
  return (
    <div
      className="inline-flex items-stretch self-start rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.18)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
      }}
    >
      {statsData.map((s, i) => (
        <div key={i} className="flex items-stretch">
          <StatItem {...s} started={started} />
          {i < statsData.length - 1 && (
            <div
              className="self-stretch my-2 w-px shrink-0"
              style={{ background: 'oklch(0.84 0.11 88 / 20%)' }}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
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
      className={`absolute z-[20] flex flex-col items-center justify-center rounded-full select-none ${className ?? ''}`}
      style={{
        width: size, height: size,
        background: hovered ? 'oklch(0.84 0.11 88 / 18%)' : 'oklch(0.12 0.022 58 / 85%)',
        border: hovered
          ? '2px solid oklch(0.87 0.12 88 / 90%)'
          : '1.5px solid oklch(0.78 0.10 85 / 50%)',
        boxShadow: hovered
          ? '0 0 32px oklch(0.84 0.11 88 / 50%), inset 0 0 20px oklch(0.84 0.11 88 / 14%)'
          : '0 0 24px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        transform: hovered ? 'scale(1.14)' : 'scale(1)',
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
        <span className="font-semibold mt-0.5" style={{ color: 'oklch(0.72 0.06 85)', fontSize: Math.max(size * 0.10, 10) }}>
          {label}
        </span>
      )}
    </div>
  )
}

/* ── Arabesque ornament line ── */
function ArabesqueLine({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`flex items-center gap-3 w-full ${flip ? 'scale-x-[-1]' : ''}`} aria-hidden="true">
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, oklch(0.84 0.11 88 / 55%), transparent)' }} />
      <svg width="128" height="18" viewBox="0 0 128 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="64,2 70,9 64,16 58,9" fill="oklch(0.84 0.11 88)" opacity="0.9"/>
        <polygon points="41,2 46,9 41,16 36,9" fill="none" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.65"/>
        <line x1="46" y1="9" x2="58" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.55"/>
        <circle cx="30" cy="9" r="2" fill="oklch(0.84 0.11 88)" opacity="0.5"/>
        <line x1="10" y1="9" x2="28" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="0.8" opacity="0.35"/>
        <circle cx="7" cy="9" r="1.2" fill="oklch(0.84 0.11 88)" opacity="0.3"/>
        <polygon points="87,2 92,9 87,16 82,9" fill="none" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.65"/>
        <line x1="70" y1="9" x2="82" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="1" opacity="0.55"/>
        <circle cx="98" cy="9" r="2" fill="oklch(0.84 0.11 88)" opacity="0.5"/>
        <line x1="100" y1="9" x2="118" y2="9" stroke="oklch(0.84 0.11 88)" strokeWidth="0.8" opacity="0.35"/>
        <circle cx="121" cy="9" r="1.2" fill="oklch(0.84 0.11 88)" opacity="0.3"/>
      </svg>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, oklch(0.84 0.11 88 / 55%), transparent)' }} />
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
          setTimeout(() => setStatsStarted(true), 700)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
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

      {/* Dark overlay behind text side */}
      <div
        className="absolute inset-y-0 start-0 w-full lg:w-[62%] z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 90% 75% at 75% 48%, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.50) 48%, transparent 72%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-stretch pt-24 md:pt-20 w-full">

        {/* ── TEXT SIDE ── */}
        <div
          ref={textRef}
          className="flex flex-col justify-center gap-7 order-2 md:order-1 w-full md:w-[46%] px-6 sm:px-10 md:ps-14 md:pe-6 pb-12 md:pb-20"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateX(0)' : 'translateX(90px)',
            transition: 'opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Academy badge */}
          <div
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border bg-black/40 backdrop-blur-sm"
            style={{ borderColor: 'oklch(0.78 0.10 85 / 32%)' }}
          >
            <span className="size-2 rounded-full shrink-0 animate-pulse" style={{ background: 'oklch(0.85 0.10 88)' }} />
            <span className="text-xs font-semibold" style={{ color: 'oklch(0.85 0.06 85)', fontFamily: 'var(--font-cairo)' }}>
              أكاديمية اللغة العربية الأولى
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1
              className="text-5xl sm:text-6xl xl:text-[5rem] font-black text-balance leading-tight"
              style={{ fontFamily: 'var(--font-cairo)' }}
            >
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>كلامك عربي</span>
              <br />
              <span style={{ color: 'oklch(0.86 0.12 88)' }}>{'وجذوره أعمق'}</span>
              <br />
              <span style={{ color: 'oklch(0.98 0.008 85)' }}>مما تتصوّر</span>
            </h1>
            <p className="text-base sm:text-lg font-bold pt-1" style={{ color: 'oklch(0.82 0.10 150)' }}>
              تعلّمها صح — من البداية للاحتراف
            </p>
          </div>

          {/* Arabesque separator */}
          <ArabesqueLine />

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: 'oklch(0.84 0.02 85)', fontFamily: 'var(--font-cairo)', maxWidth: '40rem' }}
          >
            في أكاديمية شفاء العليل، مش هنحفّظك قواعد — هنخليك تحسّ بها. من النحو والصرف للبلاغة والإملاء، كل درس مبني على الفهم الحقيقي.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <div className="relative inline-block">
              <span
                className="absolute -inset-[6px] rounded-full pointer-events-none"
                style={{ border: '1px solid oklch(0.84 0.11 88 / 35%)', animation: 'framePulse 2.5s ease-in-out infinite' }}
                aria-hidden="true"
              />
              <span
                className="absolute -inset-[12px] rounded-full pointer-events-none"
                style={{ border: '1px solid oklch(0.84 0.11 88 / 16%)', animation: 'framePulse 2.5s ease-in-out infinite 0.35s' }}
                aria-hidden="true"
              />
              <button
                className="relative overflow-hidden flex items-center gap-3 px-9 py-4 rounded-full text-base font-black transition-transform hover:scale-105 active:scale-95"
                style={{
                  background: 'oklch(0.84 0.11 88)',
                  color: 'oklch(0.13 0.04 60)',
                  boxShadow: '0 6px 32px oklch(0.84 0.11 88 / 38%)',
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

          {/* Stats — single unified liquid-glass bar */}
          <StatsBar started={statsStarted} />
        </div>

        {/* ── TEACHER SIDE ── */}
        <div className="relative order-1 md:order-2 w-full md:w-[48%] h-screen md:h-auto md:min-h-screen overflow-hidden">

          {/* Floating letters from tablet */}
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

          {/* Tablet glow */}
          <div
            className="absolute z-[11] pointer-events-none"
            aria-hidden="true"
            style={{
              top: '46%', left: '44%', width: 260, height: 260,
              background: 'radial-gradient(circle, oklch(0.88 0.09 88 / 22%) 0%, transparent 65%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Circle badges — positioned clear of the teacher's body */}
          <CircleBadge value="+٢٠"  label="سنة خبرة" size={130} className="hidden sm:flex" style={{ top: '9%',    left: '3%' }} />
          <CircleBadge value="+٣٠٠" label="طالب"     size={120} className="hidden sm:flex" style={{ top: '38%',   left: '2%' }} />
          <CircleBadge value="٩٧٪"  label="نسبة رضا" size={105} className="hidden sm:flex" style={{ bottom: '14%', right: '4%' }} />

          {/* Book — tilted divider between sections */}
          <div
            className="absolute z-[12] pointer-events-none"
            style={{ bottom: '-65%', right: '5%', width: 200, animation: 'gentleFloat 5s ease-in-out infinite', transform: 'rotate(-28deg)' }}
          >
            <Image src="/book.png" alt="" width={200} height={133} className="w-full h-auto drop-shadow-[0_14px_35px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Inkwell & quill — larger, on far left so it shows beside teacher */}
          <div
            className="absolute z-[9] pointer-events-none"
            style={{ top: '28%', left: '2%', width: 170, animation: 'gentleFloat 6s ease-in-out infinite', animationDelay: '1s' }}
          >
            <Image src="/حباره.png" alt="" width={160} height={283} className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]" />
          </div>

          {/* Teacher image — shifted slightly left of center, raised so full body visible */}
          <div
            className="absolute z-[15] pointer-events-none"
            style={{
              bottom: '-8%',
              left: '50%',
              transform: 'translateX(-55%)',
              height: '118%',
              width: 'max-content',
            }}
          >
            <Image
              src="/teacher.png"
              alt="المدرس - أكاديمية شفاء العليل في اللغة العربية"
              width={2400}
              height={1282}
              className="h-full w-auto max-w-none"
              style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.40))' }}
              priority
            />
          </div>



          <style>{`
            @keyframes gentleFloat {
              0%, 100% { transform: translateY(0px) rotate(-28deg); }
              50%       { transform: translateY(-14px) rotate(-28deg); }
            }
            @keyframes inkFloat {
              0%, 100% { transform: translateY(0px); }
              50%       { transform: translateY(-14px); }
            }
            @keyframes letterRise {
              0%, 100% { translate: 0 0; }
              50%       { translate: 0 -10px; }
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
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.48), transparent);
              animation: shimmerSweep 2.4s ease-in-out infinite;
            }
            @keyframes framePulse {
              0%, 100% { opacity: 0.55; transform: scale(1); }
              50%       { opacity: 1;    transform: scale(1.035); }
            }
          `}</style>
        </div>
      </div>

      {/* Bottom arabesque — single centered line spanning full viewport width */}
      <div className="relative z-20 w-full flex justify-center items-center pb-6 px-10 pointer-events-none" aria-hidden="true">
        <ArabesqueLine />
      </div>
    </section>
  )
}

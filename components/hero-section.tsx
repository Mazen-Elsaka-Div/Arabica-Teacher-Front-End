'use client'

import Image from 'next/image'
import { TopographicBackground } from '@/components/topo-background'
import { CountUp } from '@/components/count-up'

/* Arabic letters that scatter around as transparent background vectors */
const floatingLetters = [
  { letter: 'ص', className: 'float-letter-1 top-[5%] right-[8%] text-5xl', color: 'text-[oklch(0.85_0.09_88)]' },
  { letter: 'ع', className: 'float-letter-2 top-[10%] left-[5%] text-4xl',  color: 'text-[oklch(0.82_0.11_150)]' },
  { letter: 'ر', className: 'float-letter-3 top-[28%] right-[-2%] text-5xl', color: 'text-[oklch(0.85_0.09_88)]' },
  { letter: 'ب', className: 'float-letter-4 bottom-[25%] left-[-5%] text-4xl', color: 'text-[oklch(0.82_0.11_150)]' },
  { letter: 'ي', className: 'float-letter-5 top-[18%] right-[20%] text-4xl', color: 'text-[oklch(0.87_0.07_90)]' },
  { letter: 'ة', className: 'float-letter-6 bottom-[35%] right-[2%] text-3xl', color: 'text-[oklch(0.85_0.09_88)]' },
  { letter: 'ح', className: 'float-letter-7 top-[50%] left-[3%] text-4xl',  color: 'text-[oklch(0.82_0.11_150)]' },
  { letter: 'ل', className: 'float-letter-8 top-[8%] left-[22%] text-5xl',  color: 'text-[oklch(0.87_0.07_90)]' },
  { letter: 'غ', className: 'float-letter-9 top-[42%] left-[8%] text-3xl',  color: 'text-[oklch(0.85_0.09_88)]' },
  { letter: 'م', className: 'float-letter-10 bottom-[20%] right-[15%] text-4xl', color: 'text-[oklch(0.82_0.11_150)]' },
  { letter: 'ة', className: 'float-letter-11 top-[65%] right-[8%] text-3xl', color: 'text-[oklch(0.87_0.07_90)]' },
  { letter: 'ق', className: 'float-letter-12 bottom-[15%] left-[25%] text-4xl', color: 'text-[oklch(0.85_0.09_88)]' },
]

/* Stats */
const stats = [
  { end: 20, prefix: '+', suffix: '', label: 'سنة خبرة' },
  { end: 200, prefix: '+', suffix: '', label: 'طالب' },
  { end: 97, prefix: '', suffix: '٪', label: 'نسبة رضا' },
]

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      <TopographicBackground />

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center pt-28 pb-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-end w-full">

          {/* ── RIGHT SIDE: Text Content (RTL = appears on right) ── */}
          <div className="flex flex-col gap-6 lg:pr-8 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm">
              <span className="size-2 rounded-full bg-primary shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">
                أكاديمية اللغة العربية الأولى
              </span>
            </div>

            {/* Main headline */}
            <div className="space-y-1">
              <h1
                className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black text-foreground leading-snug text-balance"
                style={{ fontFamily: 'var(--font-cairo)', lineHeight: 1.25 }}
              >
                كلامك عربي
              </h1>
              <h1
                className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black leading-snug text-balance"
                style={{ fontFamily: 'var(--font-cairo)', lineHeight: 1.25, color: 'var(--hero-gold)' }}
              >
                وجذوره أعمق
              </h1>
              <h1
                className="text-4xl sm:text-5xl xl:text-[3.6rem] font-black leading-snug text-balance"
                style={{ fontFamily: 'var(--font-cairo)', lineHeight: 1.25 }}
              >
                <span className="text-foreground">مما تتصوّر</span>
              </h1>
              <div className="pt-1">
                <span
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: 'var(--hero-green)' }}
                >
                  تعلّمها صح — من البداية للاحتراف
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
              في أكاديمية شفاء العليل، مش هنحفّظك قواعد — هنخليك تحسّ بها. من النحو والصرف للبلاغة والإملاء، كل درس مبني على الفهم الحقيقي.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  background: 'oklch(0.82 0.10 88)',
                  color: 'oklch(0.18 0.06 158)',
                }}
              >
                <span>←</span>
                <span>اختار مرحلتك الدراسية</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-semibold border border-border bg-card/60 backdrop-blur-sm hover:bg-muted transition-all text-foreground">
                اعرف أكتر عن الأكاديمية
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-8 pt-2">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5">
                  <CountUp
                    end={stat.end}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2200}
                    className="text-3xl sm:text-4xl font-black"
                    style={{
                      color: i === 1 ? 'var(--hero-green)' : 'var(--hero-gold)',
                      fontFamily: 'var(--font-cairo)',
                    }}
                  />
                  <span className="text-sm text-muted-foreground font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── LEFT SIDE: Teacher Photo (LTR = appears on left) ── */}
          <div className="relative flex items-end justify-center order-1 lg:order-2 h-[440px] sm:h-[600px] lg:h-[720px] max-w-full overflow-hidden lg:overflow-visible">

            {/* Outer decorative ring with Arabic letters */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-[300px] h-[300px] sm:w-[460px] sm:h-[460px]">

                {/* Outer dashed ring */}
                <svg
                  className="absolute inset-0 spin-slow opacity-25"
                  viewBox="0 0 460 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="230"
                    cy="230"
                    r="220"
                    stroke="#c8b99a"
                    strokeWidth="1"
                    strokeDasharray="8 12"
                  />
                </svg>

                {/* Inner ring */}
                <svg
                  className="absolute inset-0 spin-reverse opacity-15"
                  viewBox="0 0 460 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ inset: 30 }}
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="190"
                    stroke="#a8c8a0"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>
              </div>
            </div>

            {/* Floating Arabic letters — scattered as transparent background vectors */}
            {floatingLetters.map((item, i) => (
              <span
                key={i}
                className={`absolute font-black select-none pointer-events-none ${item.className}`}
                style={{
                  fontFamily: 'var(--font-cairo)',
                  color: item.color.replace('text-[', '').replace(']', ''),
                  opacity: 0.07,
                }}
                aria-hidden="true"
              >
                {item.letter}
              </span>
            ))}

            {/* ── Book image — same center as teacher, z behind him ── */}
            <div
              className="absolute z-[9] pointer-events-none w-[300px] sm:w-[420px] lg:w-[500px]"
              style={{
                bottom: '8%',
                left: '50%',
                transform: 'translateX(-50%)',
                animation: 'bookFloat 5s ease-in-out infinite',
              }}
            >
              <Image
                src="/book.png"
                alt=""
                width={500}
                height={333}
                className="w-full h-auto"
                style={{ opacity: 0.92 }}
              />
            </div>

            <style>{`
              @keyframes bookFloat {
                0%   { transform: translateX(-50%) translateY(0px);    }
                50%  { transform: translateX(-50%) translateY(-18px);   }
                100% { transform: translateX(-50%) translateY(0px);    }
              }
            `}</style>

            {/* ── BACKGROUND: Floating Arabic language vectors ── */}
            {/* Feather / quill — top right */}
            <div className="absolute top-[10%] right-[6%] z-[7] pointer-events-none opacity-40">
              <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 5 C50 20 58 50 45 80 C38 96 30 110 28 118" stroke="#c8b99a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 5 C10 20 2 50 15 80 C22 96 28 110 28 118" stroke="#c8b99a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 5 C40 30 38 60 32 90" stroke="#c8b99a" strokeWidth="0.8" opacity="0.6" />
                <path d="M30 5 C22 25 20 50 24 80" stroke="#c8b99a" strokeWidth="0.8" opacity="0.5" />
                {[20,32,42,52,62,72,82].map((y, i) => (
                  <path key={i} d={`M${28 - i * 1.2} ${y} C ${30} ${y - 4} ${32 + i * 1.2} ${y}`} stroke="#c8b99a" strokeWidth="0.7" opacity="0.5" />
                ))}
                <path d="M28 118 L28 108 L26 115 Z" fill="#c8b99a" opacity="0.5" />
              </svg>
            </div>

            {/* Inkwell / حبارة — bottom left */}
            <div className="absolute bottom-[30%] left-[3%] z-[7] pointer-events-none opacity-40">
              <svg width="55" height="65" viewBox="0 0 55 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottle body */}
                <path d="M15 25 C10 30 8 45 8 52 C8 60 12 64 27 64 C42 64 47 60 47 52 C47 45 45 30 40 25 Z" stroke="#c8b99a" strokeWidth="1.5" fill="none" />
                <path d="M15 25 C10 30 8 45 8 52 C8 60 12 64 27 64 C42 64 47 60 47 52 C47 45 45 30 40 25 Z" fill="#c8b99a" opacity="0.1" />
                {/* Neck */}
                <path d="M20 25 L20 12 L35 12 L35 25" stroke="#c8b99a" strokeWidth="1.5" fill="none" />
                {/* Cap */}
                <rect x="17" y="8" width="21" height="6" rx="2" stroke="#c8b99a" strokeWidth="1.2" fill="#c8b99a" opacity="0.2" />
                {/* Ink level */}
                <path d="M12 50 C12 50 27 46 42 50" stroke="#c8b99a" strokeWidth="1" opacity="0.6" />
                {/* Calligraphy drip */}
                <path d="M47 38 Q55 42 52 50" stroke="#c8b99a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>

            {/* Scroll / مخطوطة — top left */}
            <div className="absolute top-[18%] left-[6%] z-[7] pointer-events-none opacity-40">
              <svg width="65" height="80" viewBox="0 0 65 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top rod */}
                <ellipse cx="32" cy="10" rx="28" ry="7" fill="#c8b99a" opacity="0.2" stroke="#c8b99a" strokeWidth="1.2" />
                {/* Scroll body */}
                <rect x="4" y="10" width="57" height="58" fill="#c8b99a" opacity="0.08" />
                <line x1="4" y1="10" x2="4" y2="68" stroke="#c8b99a" strokeWidth="1.2" />
                <line x1="61" y1="10" x2="61" y2="68" stroke="#c8b99a" strokeWidth="1.2" />
                {/* Bottom rod */}
                <ellipse cx="32" cy="68" rx="28" ry="7" fill="#c8b99a" opacity="0.2" stroke="#c8b99a" strokeWidth="1.2" />
                {/* Text lines */}
                <line x1="14" y1="28" x2="51" y2="28" stroke="#c8b99a" strokeWidth="0.8" opacity="0.5" />
                <line x1="14" y1="38" x2="51" y2="38" stroke="#c8b99a" strokeWidth="0.8" opacity="0.5" />
                <line x1="14" y1="48" x2="51" y2="48" stroke="#c8b99a" strokeWidth="0.8" opacity="0.5" />
                <text x="32" y="34" textAnchor="middle" fontSize="8" fill="#c8b99a" opacity="0.7" fontFamily="var(--font-cairo)">علم</text>
              </svg>
            </div>

            {/* ── Large Arabic base character — teacher stands on this ── */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
              style={{
                fontSize: 'clamp(280px, 55vw, 520px)',
                fontFamily: 'var(--font-cairo)',
                fontWeight: 'bold',
                color: '#c8b99a',
                opacity: 0.08,
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              ع
            </div>

            {/* ── Gold base platform — teacher stands on this ── */}
            <div className="absolute left-1/2 -translate-x-1/2 z-[11] pointer-events-none w-[340px] sm:w-[460px] lg:w-[520px]" style={{ bottom: '-18px' }}>
              <svg viewBox="0 0 520 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <defs>
                  <linearGradient id="baseGold" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#1e4d3a" stopOpacity="0" />
                    <stop offset="15%"  stopColor="#a8882a" stopOpacity="0.9" />
                    <stop offset="35%"  stopColor="#d4aa3a" stopOpacity="1" />
                    <stop offset="50%"  stopColor="#f0cc60" stopOpacity="1" />
                    <stop offset="65%"  stopColor="#d4aa3a" stopOpacity="1" />
                    <stop offset="85%"  stopColor="#a8882a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1e4d3a" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="baseGoldShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#fff" stopOpacity="0" />
                    <stop offset="45%"  stopColor="#fff" stopOpacity="0" />
                    <stop offset="50%"  stopColor="#fff" stopOpacity="0.35" />
                    <stop offset="55%"  stopColor="#fff" stopOpacity="0" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="engraveFade" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#1e4d3a" stopOpacity="0" />
                    <stop offset="20%"  stopColor="#1e4d3a" stopOpacity="0.75" />
                    <stop offset="50%"  stopColor="#1a4535" stopOpacity="0.85" />
                    <stop offset="80%"  stopColor="#1e4d3a" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#1e4d3a" stopOpacity="0" />
                  </linearGradient>
                  <filter id="baseGlow" x="-10%" y="-80%" width="120%" height="260%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <clipPath id="barClip">
                    <rect x="0" y="0" width="520" height="10" rx="5" />
                  </clipPath>
                </defs>

                {/* Soft glow halo */}
                <ellipse cx="260" cy="17" rx="200" ry="6" fill="#c8a020" opacity="0.3" filter="url(#baseGlow)" />

                {/* Main gold bar */}
                <rect x="0" y="0" width="520" height="10" rx="5" fill="url(#baseGold)" />

                {/* Green engraved arabesque pattern — clipped inside bar */}
                <g clipPath="url(#barClip)" stroke="#1e4d3a" strokeWidth="1" fill="none">
                  {/* Wavy vine line running across the full bar */}
                  <path
                    d="M 50 5 Q 70 1 90 5 Q 110 9 130 5 Q 150 1 170 5 Q 190 9 210 5 Q 230 1 250 5 Q 270 9 290 5 Q 310 1 330 5 Q 350 9 370 5 Q 390 1 410 5 Q 430 9 450 5 Q 470 1 490 5"
                    stroke="#1a4535"
                    strokeWidth="1.2"
                    opacity="0.7"
                  />
                  {/* Small leaf/petal bursts at each wave crest */}
                  {[90, 130, 170, 210, 250, 290, 330, 370, 410, 450].map((x, i) => (
                    <g key={i} opacity="0.65">
                      <ellipse cx={x} cy="5" rx="3.5" ry="2" stroke="#1a4535" strokeWidth="0.8" />
                    </g>
                  ))}
                  {/* Tiny dot accents at wave troughs */}
                  {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430, 470].map((x, i) => (
                    <circle key={i} cx={x} cy="5" r="1" fill="#1a4535" opacity="0.5" />
                  ))}
                </g>

                {/* Shine highlight on top edge */}
                <rect x="0" y="0" width="520" height="3" rx="1.5" fill="url(#baseGoldShine)" />
                {/* Shadow line underneath */}
                <rect x="30" y="10" width="460" height="2" rx="1" fill="#6b5010" opacity="0.4" />
              </svg>
            </div>

            {/* ── Teacher image ── */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[380px] h-[475px] sm:w-[500px] sm:h-[625px] lg:w-[600px] lg:h-[750px]"
              style={{
                maskImage: 'radial-gradient(ellipse 88% 92% at 50% 58%, black 45%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 88% 92% at 50% 58%, black 45%, transparent 100%)',
              }}
            >
              <Image
                src="/teacher.png"
                alt="المدرس - أكاديمية شفاء العليل في اللغة العربية"
                fill
                className="object-contain object-bottom"
                style={{ filter: 'contrast(1.05) brightness(1.0) saturate(0.95)' }}
                priority
                sizes="(max-width: 640px) 380px, (max-width: 1024px) 500px, 600px"
              />
            </div>



            {/* Decorative Arabic calligraphy background text */}
            <div
              className="absolute bottom-14 left-1/2 -translate-x-1/2 text-6xl font-black opacity-[0.06] select-none pointer-events-none whitespace-nowrap"
              style={{ fontFamily: 'var(--font-cairo)', color: 'oklch(0.72 0.13 78)' }}
              aria-hidden="true"
            >
              اللغة العربية
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative separator */}
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

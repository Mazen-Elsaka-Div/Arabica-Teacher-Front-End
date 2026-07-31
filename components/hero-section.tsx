'use client'

import Image from 'next/image'
import { TopographicBackground } from '@/components/topo-background'

/* ── Letters flying out of the tablet — arc from tablet up toward the headline ── */
const tabletLetters = [
  // Close to the tablet: small, dense (tablet is around 60% top / 58% left)
  { letter: 'ا', top: '58%', left: '60%', size: 'text-xl',  opacity: 0.45, delay: '0s',    rotate: '-8deg' },
  { letter: 'ب', top: '54%', left: '64%', size: 'text-2xl', opacity: 0.55, delay: '0.4s',  rotate: '6deg' },
  { letter: 'ت', top: '50%', left: '61%', size: 'text-xl',  opacity: 0.5,  delay: '0.8s',  rotate: '-12deg' },
  { letter: 'ث', top: '48%', left: '68%', size: 'text-2xl', opacity: 0.6,  delay: '1.2s',  rotate: '10deg' },
  // Middle of the arc — rising up and toward the headline
  { letter: 'ج', top: '42%', left: '65%', size: 'text-3xl', opacity: 0.65, delay: '0.2s',  rotate: '-6deg' },
  { letter: 'ح', top: '38%', left: '72%', size: 'text-3xl', opacity: 0.7,  delay: '0.6s',  rotate: '14deg' },
  { letter: 'خ', top: '34%', left: '68%', size: 'text-2xl', opacity: 0.6,  delay: '1s',    rotate: '-10deg' },
  { letter: 'د', top: '31%', left: '77%', size: 'text-4xl', opacity: 0.75, delay: '1.4s',  rotate: '8deg' },
  // Spreading further up & out toward the text
  { letter: 'ر', top: '26%', left: '72%', size: 'text-3xl', opacity: 0.7,  delay: '0.3s',  rotate: '-14deg' },
  { letter: 'س', top: '22%', left: '81%', size: 'text-4xl', opacity: 0.8,  delay: '0.7s',  rotate: '12deg' },
  { letter: 'ع', top: '17%', left: '76%', size: 'text-3xl', opacity: 0.65, delay: '1.1s',  rotate: '-8deg' },
  { letter: 'ق', top: '13%', left: '85%', size: 'text-4xl', opacity: 0.75, delay: '1.5s',  rotate: '16deg' },
  { letter: 'ل', top: '9%',  left: '79%', size: 'text-2xl', opacity: 0.55, delay: '0.5s',  rotate: '-16deg' },
  { letter: 'م', top: '18%', left: '90%', size: 'text-3xl', opacity: 0.7,  delay: '0.9s',  rotate: '6deg' },
  { letter: 'ن', top: '27%', left: '88%', size: 'text-2xl', opacity: 0.6,  delay: '1.3s',  rotate: '-4deg' },
]

/* Stats */
const stats = [
  { value: '+٢٠', label: 'سنة خبرة', color: 'oklch(0.85 0.10 88)' },
  { value: '+٣٠٠', label: 'طالب', color: 'oklch(0.80 0.12 150)' },
  { value: '٩٧٪', label: 'نسبة رضا', color: 'oklch(0.85 0.10 88)' },
]

/* ── Gold circle badges around the teacher ── */
function CircleBadge({
  value,
  label,
  size,
  className,
  style,
}: {
  value: string
  label?: string
  size: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`absolute z-[12] flex flex-col items-center justify-center rounded-full select-none pointer-events-none ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: 'oklch(0.15 0.028 60 / 85%)',
        border: '1.5px solid oklch(0.78 0.10 85 / 70%)',
        boxShadow: '0 0 30px rgba(0,0,0,0.55), inset 0 0 20px oklch(0.78 0.10 85 / 8%)',
        backdropFilter: 'blur(4px)',
        ...style,
      }}
    >
      <span
        className="font-black leading-none"
        style={{
          fontFamily: 'var(--font-cairo)',
          color: 'oklch(0.87 0.10 88)',
          fontSize: size * 0.28,
        }}
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
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      <TopographicBackground />

      {/* Dark shadow behind the text side (right in RTL) */}
      <div
        className="absolute inset-y-0 start-0 w-full lg:w-[55%] z-[1] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 78% 45%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, transparent 75%)',
        }}
      />

      {/* Main hero content — full width, text pushed to the far edge */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-stretch pt-24 lg:pt-20 w-full">

        {/* ── TEXT SIDE (start = right edge in RTL) ── */}
        <div className="flex flex-col justify-center gap-6 order-2 lg:order-1 w-full lg:w-[42%] px-6 sm:px-10 lg:ps-14 lg:pe-6 pb-12 lg:pb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border bg-black/40 backdrop-blur-sm" style={{ borderColor: 'oklch(0.78 0.10 85 / 35%)' }}>
            <span className="size-2 rounded-full shrink-0" style={{ background: 'oklch(0.85 0.10 88)' }} />
            <span className="text-xs font-semibold" style={{ color: 'oklch(0.85 0.06 85)' }}>
              أكاديمية اللغة العربية الأولى
            </span>
          </div>

          {/* Main headline — brighter, clearer colors */}
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
              <span
                className="text-lg sm:text-xl font-bold"
                style={{ color: 'oklch(0.84 0.11 150)' }}
              >
                تعلّمها صح — من البداية للاحتراف
              </span>
            </div>
          </div>

          {/* Description — clearer contrast */}
          <p
            className="text-base sm:text-lg leading-relaxed max-w-md"
            style={{ color: 'oklch(0.86 0.02 85)' }}
          >
            في أكاديمية شفاء العليل، مش هنحفّظك قواعد — هنخليك تحسّ بها. من النحو والصرف للبلاغة والإملاء، كل درس مبني على الفهم الحقيقي.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{
                background: 'oklch(0.84 0.11 88)',
                color: 'oklch(0.16 0.04 60)',
              }}
            >
              <span>←</span>
              <span>اختار مرحلتك الدراسية</span>
            </button>
            <button
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold border bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all"
              style={{ borderColor: 'oklch(0.78 0.10 85 / 35%)', color: 'oklch(0.92 0.015 85)' }}
            >
              اعرف أكتر عن الأكاديمية
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-2">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span
                  className="text-3xl sm:text-4xl font-black"
                  style={{ color: stat.color, fontFamily: 'var(--font-cairo)' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs font-medium" style={{ color: 'oklch(0.72 0.03 85)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TEACHER SIDE (end = left in RTL) — extra large ── */}
        <div className="relative order-1 lg:order-2 w-full lg:w-[58%] h-[540px] sm:h-[640px] lg:h-auto lg:min-h-[calc(100vh-5rem)] overflow-visible">

          {/* Letters flying out of the tablet */}
          {tabletLetters.map((item, i) => (
            <span
              key={i}
              className={`absolute z-[13] font-black select-none pointer-events-none letter-rise ${item.size}`}
              style={{
                top: item.top,
                left: item.left,
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

          {/* Glow above the tablet — light source for the letters */}
          <div
            className="absolute z-[11] pointer-events-none"
            aria-hidden="true"
            style={{
              top: '48%',
              left: '48%',
              width: 240,
              height: 240,
              background: 'radial-gradient(circle, oklch(0.88 0.09 88 / 25%) 0%, transparent 65%)',
              filter: 'blur(8px)',
            }}
          />

          {/* ── Circle badges around the teacher (left side, like reference) ── */}
          <CircleBadge
            value="+٢٠"
            label="سنة خبرة"
            size={140}
            className="hidden sm:flex"
            style={{ top: '8%', left: '2%' }}
          />
          <CircleBadge
            value="+٣٠٠"
            label="طالب"
            size={125}
            className="hidden sm:flex"
            style={{ bottom: '10%', left: '3%' }}
          />
          <CircleBadge
            value="٩٧٪"
            label="نسبة رضا"
            size={105}
            className="hidden sm:flex"
            style={{ bottom: '2%', left: '38%' }}
          />

          {/* ── Book tilted, split between hero and next section ── */}
          <div
            className="absolute z-[12] pointer-events-none"
            style={{
              bottom: '-65%',
              right: '5%',
              width: 200,
              animation: 'gentleFloat 5s ease-in-out infinite',
              transform: 'rotate(-28deg)',
            }}
          >
            <Image
              src="/book.png"
              alt=""
              width={200}
              height={133}
              className="w-full h-auto drop-shadow-[0_14px_35px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* ── Inkwell & quill (حباره.png) — larger, floating beside the teacher ── */}
          <div
            className="absolute z-[9] pointer-events-none"
            style={{
              top: '32%',
              left: '6%',
              width: 160,
              animation: 'gentleFloat 6s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <Image
              src="/حباره.png"
              alt=""
              width={160}
              height={283}
              className="w-full h-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* ── Papyrus scroll (برديه.png) — large, behind teacher, tilted left ── */}
          <div
            className="absolute z-[8] pointer-events-none"
            style={{
              top: '15%',
              left: '22%',
              width: 280,
              animation: 'gentleFloat 7s ease-in-out infinite',
              animationDelay: '2s',
              transform: 'rotate(-18deg)',
            }}
          >
            <Image
              src="/برديه.png"
              alt=""
              width={280}
              height={507}
              className="w-full h-auto drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
            />
          </div>

          {/* ── Teacher image — very large ── */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[520px] sm:w-[640px] lg:w-[760px] xl:w-[820px] h-full"
            style={{
              maskImage: 'linear-gradient(to top, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 92%, transparent 100%)',
            }}
          >
            <Image
              src="/teacher.png"
              alt="المدرس - أكاديمية شفاء العليل في اللغة العربية"
              fill
              className="object-contain object-bottom"
              style={{ filter: 'contrast(1.05) saturate(0.95) drop-shadow(0 20px 50px rgba(0,0,0,0.6))' }}
              priority
              sizes="(max-width: 640px) 520px, (max-width: 1024px) 640px, 820px"
            />
          </div>

          <style>{`
            @keyframes gentleFloat {
              0%, 100% { transform: translateY(0px); }
              50%      { transform: translateY(-14px); }
            }
            @keyframes letterRise {
              0%, 100% { translate: 0 0; }
              50%      { translate: 0 -12px; }
            }
            .letter-rise { animation: letterRise 4.5s ease-in-out infinite; }
          `}</style>
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

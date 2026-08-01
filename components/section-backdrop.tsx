'use client'

import { useIsDark } from '@/components/use-is-dark'

/* ─────────────────────────────────────────────
 * SectionBackdrop — خلفية موحّدة بنمط التموّج (topo)
 * مع لمسة مميزة لكل قسم:
 *
 *  features     → حرف "ض" عملاق باهت + وهج أخضر جانبي
 *  stats        → شبكة نقاط ذهبية + وهج ذهبي مركزي
 *  testimonials → علامة اقتباس ضخمة + وهج أخضر/ذهبي بالأركان
 *  cta          → خطوط مائلة ناعمة + وهج ذهبي علوي
 *
 * كل الطبقات CSS فقط + صور الـ topo المحمَّلة مسبقًا،
 * فلا تضيف أي وزن على التحميل.
 * ───────────────────────────────────────────── */

type Variant = 'features' | 'stats' | 'testimonials' | 'cta'

export function SectionBackdrop({ variant }: { variant: Variant }) {
  const isDark = useIsDark()

  const gold = isDark ? 'oklch(0.73 0.10 75' : 'oklch(0.72 0.10 85'
  const green = 'oklch(0.52 0.13 155'
  const letterColor = isDark ? 'oklch(0.73 0.10 75 / 7%)' : 'oklch(0.68 0.10 82 / 10%)'

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* الطبقة المشتركة: نمط التموّج الخفيف */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark ? 'url(/topo-dark.webp)' : 'url(/topo-light.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isDark ? 0.16 : 0.35,
        }}
      />

      {variant === 'features' && (
        <>
          {/* حرف الضاد العملاق — رمز لغة الضاد */}
          <span
            className="absolute -start-10 top-1/2 -translate-y-1/2 select-none font-black leading-none"
            style={{
              fontSize: 'clamp(20rem, 42vw, 34rem)',
              color: letterColor,
              fontFamily: 'var(--font-noto-naskh), serif',
            }}
          >
            ض
          </span>
          {/* وهج أخضر ناعم من جهة النهاية */}
          <div
            className="absolute inset-y-0 end-0 w-1/2"
            style={{
              background: `radial-gradient(ellipse 70% 55% at 100% 45%, ${green} / ${isDark ? '9%' : '7%'}) 0%, transparent 65%)`,
            }}
          />
        </>
      )}

      {variant === 'stats' && (
        <>
          {/* شبكة نقاط ذهبية دقيقة */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${gold} / ${isDark ? '13%' : '20%'}) 1.5px, transparent 1.5px)`,
              backgroundSize: '28px 28px',
              maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, transparent 78%)',
            }}
          />
          {/* وهج ذهبي مركزي خلف الأرقام */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 55% 45% at 50% 55%, ${gold} / ${isDark ? '10%' : '12%'}) 0%, transparent 70%)`,
            }}
          />
        </>
      )}

      {variant === 'testimonials' && (
        <>
          {/* علامة اقتباس ضخمة باهتة */}
          <span
            className="absolute top-16 start-[6%] select-none font-black leading-none"
            style={{
              fontSize: 'clamp(14rem, 26vw, 24rem)',
              color: letterColor,
              fontFamily: 'Georgia, serif',
              transform: 'scaleX(-1)',
            }}
          >
            &rdquo;
          </span>
          {/* وهج أخضر بالركن السفلي + ذهبي بالركن العلوي */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 45% 35% at 92% 8%, ${gold} / ${isDark ? '9%' : '10%'}) 0%, transparent 65%), radial-gradient(ellipse 50% 38% at 6% 92%, ${green} / ${isDark ? '8%' : '6%'}) 0%, transparent 65%)`,
            }}
          />
        </>
      )}

      {variant === 'cta' && (
        <>
          {/* خطوط مائلة ناعمة — كأسطر كراسة الخط العربي */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(-35deg, ${gold} / ${isDark ? '5%' : '7%'}) 0px, ${gold} / ${isDark ? '5%' : '7%'}) 1px, transparent 1px, transparent 42px)`,
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
            }}
          />
          {/* وهج ذهبي علوي خلف العنوان */}
          <div
            className="absolute inset-x-0 top-0 h-[60%]"
            style={{
              background: `radial-gradient(ellipse 60% 65% at 50% 0%, ${gold} / ${isDark ? '13%' : '14%'}) 0%, transparent 70%)`,
            }}
          />
        </>
      )}
    </div>
  )
}

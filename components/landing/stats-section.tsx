'use client'

import { AnimatedNumber } from './animated-number'

const STATS = [
  { value: 5000, suffix: '+', label: 'طالب وطالبة على المنصة' },
  { value: 200,  suffix: '+', label: 'درس ومحاضرة تعليمية' },
  { value: 15,   suffix: '+', label: 'سنة خبرة في تدريس اللغة العربية' },
  { value: 97,   suffix: '٪', label: 'نسبة رضا الطلاب' },
]

export function StatsSection() {
  return (
    <section id="stats" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold text-gold-deep dark:text-teal-glow">
            <span className="font-sans">{'// '}</span>
            أرقامنا تتكلم
          </span>
          <h2 className="font-heading font-bold mt-3 text-balance text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl dark:text-ink-fg">
            نتائج حقيقية يفخر بيها طلابنا
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-muted dark:text-ink-dim">
            الأرقام دي مش مجرد إحصائيات — هي قصص نجاح لطلاب أتقنوا اللغة العربية وحققوا أعلى الدرجات.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-cream/80 p-8 backdrop-blur md:p-10 dark:bg-ink-raised/70">
              <div className="flex items-baseline gap-1 text-navy dark:text-ink-fg">
                <span className="font-heading text-5xl font-bold md:text-4xl lg:text-5xl xl:text-6xl">
                  <AnimatedNumber value={s.value} duration={2.5} />
                </span>
                <span className="font-heading text-3xl font-bold text-gold-deep md:text-2xl lg:text-3xl xl:text-4xl dark:text-teal-glow">
                  {s.suffix}
                </span>
              </div>
              <p className="mt-3 text-pretty leading-relaxed text-ink-muted dark:text-ink-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

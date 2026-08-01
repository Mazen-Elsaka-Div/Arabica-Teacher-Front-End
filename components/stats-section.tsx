'use client'

import { AnimatedNumber } from '@/components/animated-number'
import { useReveal } from '@/lib/use-reveal'
import { SectionBackdrop } from '@/components/section-backdrop'

const stats = [
  { value: 20, suffix: '+', label: 'سنة خبرة في تدريس اللغة العربية' },
  { value: 300, suffix: '+', label: 'طالب وطالبة معانا في كل المراحل' },
  { value: 1500, suffix: '+', label: 'درس وتمرين مسجّل في كل الفروع' },
  { value: 97, suffix: '%', label: 'نسبة رضا الطلاب وأولياء الأمور' },
]

export function StatsSection() {
  const headRef = useReveal<HTMLDivElement>(undefined, { y: 30 })
  const gridRef = useReveal<HTMLDivElement>(undefined, { y: 40 })

  return (
    <section id="stats" className="relative overflow-hidden bg-background py-20 md:py-28">
      <SectionBackdrop variant="stats" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headRef} className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold text-gold">أرقام بتتكلم عننا</span>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl lg:text-5xl">
            نتايج حقيقية، مش مجرد وعود.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            سنين من الخبرة وآلاف الدروس بنَت ثقة طلابنا وأولياء أمورهم.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-8 backdrop-blur md:p-10">
              <div className="flex items-baseline gap-1 text-foreground">
                <span className="text-5xl font-black md:text-4xl lg:text-5xl xl:text-6xl">
                  <AnimatedNumber value={s.value} duration={2200} />
                </span>
                <span className="text-3xl font-black text-gold md:text-2xl lg:text-3xl xl:text-4xl">
                  {s.suffix === '+' ? '+' : s.suffix === '%' ? '٪' : s.suffix}
                </span>
              </div>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

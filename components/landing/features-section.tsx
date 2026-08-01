'use client'

import { Lightbulb, ClipboardCheck, Video, LineChart, BookOpen } from 'lucide-react'
import { useReveal } from '@/lib/use-reveal'

const FEATURES = [
  {
    step: '٠١',
    icon: BookOpen,
    title: 'المنهج المنظّم',
    description: 'الدروس مرتبة خطوة بخطوة لكل مرحلة دراسية، من الأساسيات حتى المستوى المتقدم، بتسلسل منطقي يضمن الفهم الكامل.',
  },
  {
    step: '٠٢',
    icon: Video,
    title: 'شرح مفصّل بالفيديو',
    description: 'فيديوهات شرح احترافية بأمثلة حية من النصوص العربية الأصيلة، تجعل القواعد والبلاغة سهلة ومفهومة.',
  },
  {
    step: '٠٣',
    icon: ClipboardCheck,
    title: 'تقييم مستمر',
    description: 'اختبارات تفاعلية بعد كل درس لتثبيت المعلومة، مع مراجعات دورية شاملة تُعدّ الطالب للامتحانات.',
  },
  {
    step: '٠٤',
    icon: LineChart,
    title: 'متابعة الأداء',
    description: 'تقارير مفصّلة لمستوى الطالب تكشف نقاط القوة والضعف، مع توصيات مخصصة لكل طالب.',
  },
  {
    step: '٠٥',
    icon: Lightbulb,
    title: 'تفاعل مباشر',
    description: 'جلسات أسئلة وأجوبة مع المدرسة لحل الإشكاليات فورًا، لأن الفهم الحقيقي يبدأ بسؤال صحيح.',
  },
]

export function FeaturesSection() {
  const headRef = useReveal<HTMLDivElement>(undefined, { y: 30 })
  const listRef = useReveal<HTMLDivElement>('.feature-row', { y: 40, duration: 0.6 })

  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div ref={headRef} className="max-w-2xl">
          <span className="text-sm font-semibold text-emerald-deep dark:text-teal-glow">
            <span className="font-sans">{'// '}</span>
            لماذا تختار أكاديميتنا؟
          </span>
          <h2 className="font-heading font-bold mt-3 text-balance text-3xl leading-tight text-navy sm:text-4xl lg:text-5xl dark:text-ink-fg">
            منهجية تعليمية مُصمَّمة للتفوق
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-muted dark:text-ink-dim">
            نؤمن أن إتقان اللغة العربية يحتاج إلى منهجية واضحة، وليس مجرد حفظ قواعد. كل ما صمّمناه يهدف إلى بناء فهم حقيقي.
          </p>
        </div>

        <div ref={listRef} className="mt-14 border-t border-navy/10 dark:border-white/10">
          {FEATURES.map((f) => (
            <div
              key={f.step}
              className="feature-row group grid grid-cols-[auto_1fr] items-start gap-5 border-b border-navy/10 py-8 transition-colors hover:bg-cream-deep/40 md:grid-cols-[6rem_3rem_1fr] md:items-center md:gap-8 md:px-4 dark:border-white/10 dark:hover:bg-white/5"
            >
              <span className="font-heading text-3xl font-bold text-navy/15 transition-colors group-hover:text-gold md:text-5xl dark:text-white/15 dark:group-hover:text-teal-glow">
                {f.step}
              </span>

              <span className="row-start-1 grid size-12 place-items-center rounded-xl bg-navy text-cream transition-transform duration-300 group-hover:-translate-y-1 md:row-auto dark:bg-teal-glow dark:text-ink-base dark:shadow-[0_0_18px_oklch(0.73_0.10_75_/_0.4)]">
                <f.icon className="size-6" />
              </span>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-xl font-bold text-navy md:text-2xl dark:text-ink-fg">{f.title}</h3>
                <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-ink-muted dark:text-ink-dim">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

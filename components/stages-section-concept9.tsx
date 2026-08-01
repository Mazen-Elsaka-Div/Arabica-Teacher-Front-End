'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { BookOpen, GraduationCap, Award, Sparkles, CheckCircle2 } from 'lucide-react'

const stages = [
  {
    id: 1,
    name: 'الصف الأول الثانوي',
    nameEn: 'First Secondary',
    shortName: 'الأول',
    description: 'أساسيات اللغة العربية والقواعد الأساسية',
    curriculum: 'الكتابة • القراءة • الاستماع • التحدث',
    units: ['القراءة الفاهمة', 'القواعد الأساسية', 'الكتابة الإبداعية', 'المحادثة'],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    image: '/stage1-illustration.png',
    icon: BookOpen,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
  },
  {
    id: 2,
    name: 'الصف الثاني الثانوي',
    nameEn: 'Second Secondary',
    shortName: 'الثاني',
    description: 'تعمق في النحو والبلاغة والأدب',
    curriculum: 'البلاغة • النحو المتقدم • الأدب • التحليل',
    units: ['النحو المتقدم', 'البلاغة والبيان', 'الأدب العربي', 'النصوص الأدبية'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    dotColor: 'bg-blue-500',
    textColor: 'text-blue-600',
    image: '/stage2-illustration.png',
    icon: GraduationCap,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
  },
  {
    id: 3,
    name: 'الصف الثالث الثانوي',
    nameEn: 'Third Secondary',
    shortName: 'الثالث',
    description: 'إتقان اللغة العربية والتحضير للامتحانات',
    curriculum: 'الإملاء • الترجمة • المحادثة • الكتابة الإبداعية',
    units: ['الإملاء والترقيم', 'الترجمة من وإلى العربية', 'المحادثة المتقدمة', 'الكتابة الإبداعية'],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    image: '/stage3-illustration.png',
    icon: Award,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
  },
]

export function Concept9ScrollTimeline() {
  const [visibleCard, setVisibleCard] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const children = container.querySelectorAll('[data-stage-id]')

      children.forEach((child) => {
        const rect = child.getBoundingClientRect()
        const stageId = parseInt(child.getAttribute('data-stage-id') || '0')

        // Trigger when element is in viewport (center of screen)
        if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.3) {
          setVisibleCard(stageId)
        }
      })
    }

    const scrollContainer = container.parentElement?.parentElement
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decorative elements with blur */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header with Arabic ornament */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <div className="text-4xl text-amber-600">✦ ✧ ✦</div>
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">المراحل الدراسية</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              اختر مسارك التعليمي واستمتع برحلة تعلم اللغة العربية مع نظام تعليمي متكامل
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-amber-600 font-semibold px-6 py-3 bg-amber-50 rounded-full border border-amber-200">
              <CheckCircle2 size={18} />
              <span>ثلاث مراحل متكاملة • تعليم شامل • نتائج مضمونة</span>
            </div>
          </div>
          {/* Timeline with alternating cards */}
          <div className="space-y-32">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleCard === stage.id

              return (
                <div
                  key={stage.id}
                  data-stage-id={stage.id}
                  className="relative min-h-72 flex items-center"
                >
                  {/* Timeline center line and dot */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-blue-400 to-emerald-400 -translate-x-1/2" />

                  {/* Timeline dot with glow effect */}
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                      isVisible ? 'scale-150' : 'scale-100'
                    }`}
                  >
                    {/* Glow ring */}
                    {isVisible && (
                      <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-gray-900 opacity-30 animate-pulse" />
                    )}
                    {/* Main dot with gradient */}
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white bg-gradient-to-br ${stage.color} shadow-xl transition-all duration-300`}
                    />
                  </div>

                  {/* Stage number badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30">
                    <div
                      className={`bg-white px-3 py-1 rounded-full font-bold text-sm shadow-md transition-transform duration-500 ${
                        isVisible ? 'scale-110' : 'scale-100'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      }}
                    >
                      <span className="text-gray-800">المرحلة {stage.id}</span>
                    </div>
                  </div>

                  {/* Card container — alternating left/right */}
                  <div
                    className={`w-1/2 ${isLeft ? 'pr-16' : 'pl-16'} ${
                      isLeft ? 'mr-auto' : 'ml-auto'
                    } transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-l-4 ${
                        stage.id === 1
                          ? 'border-l-amber-500'
                          : stage.id === 2
                            ? 'border-l-blue-500'
                            : 'border-l-emerald-500'
                      } hover:shadow-3xl transition-shadow`}
                    >
                      {/* Card image with overlay */}
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <Image
                          src={stage.image}
                          alt={stage.name}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-40`}
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                            {stage.name}
                          </h3>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-6 space-y-4">
                        {/* Header with icon */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-1">
                              {stage.nameEn}
                            </h4>
                            <p className={`text-xs uppercase tracking-widest ${stage.textColor} font-bold`}>
                              {stage.shortName} ثانوي
                            </p>
                          </div>
                          <div className={`${stage.iconBg} p-3 rounded-lg flex-shrink-0 shadow-sm`}>
                            {stage.icon && <stage.icon size={24} className={stage.iconColor} />}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {stage.description}
                        </p>

                        {/* Curriculum units as smart tags */}
                        <div className="space-y-3 pt-2 border-t border-gray-200">
                          <p className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle2 size={14} className={stage.textColor} />
                            محاور الدراسة:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {stage.units.map((unit, i) => (
                              <div
                                key={i}
                                className={`text-xs p-2.5 rounded-md ${stage.bgColor} border ${stage.borderColor} text-gray-700 font-medium hover:shadow-md transition-all`}
                              >
                                <span className={stage.textColor}>✓</span> {unit}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${stage.color} hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}>
                          <span>تعرف أكتر</span>
                          <Sparkles size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stage label on opposite side (non-card) */}
                  <div
                    className={`w-1/2 ${!isLeft ? 'pr-16' : 'pl-16'} ${
                      !isLeft ? 'mr-auto' : 'ml-auto'
                    } text-center opacity-40 pointer-events-none`}
                  >
                    <p className="text-gray-400 text-lg font-medium italic">
                      {stage.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom decorative line */}
          <div className="mt-32 flex justify-center">
            <div className="h-24 w-1 bg-gradient-to-b from-emerald-400 to-transparent" />
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 pt-12 border-t-2 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              اختر مستواك وابدأ رحلتك اليوم
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              جميع المراحل مصممة بعناية لضمان تطورك في إتقان اللغة العربية
            </p>
            <button className="px-8 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors">
              التسجيل الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

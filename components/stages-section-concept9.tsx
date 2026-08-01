'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const stages = [
  {
    id: 1,
    name: 'الصف الأول الثانوي',
    nameEn: 'First Secondary',
    description: 'أساسيات اللغة العربية والقواعد الأساسية',
    curriculum: 'الوحدات: الكتابة - القراءة - الاستماع - التحدث',
    color: 'from-amber-500 to-amber-600',
    image: '/stage1-illustration.png',
  },
  {
    id: 2,
    name: 'الصف الثاني الثانوي',
    nameEn: 'Second Secondary',
    description: 'تعمق في النحو والبلاغة والأدب',
    curriculum: 'الوحدات: البلاغة - النحو المتقدم - الأدب - التحليل',
    color: 'from-blue-500 to-blue-600',
    image: '/stage2-illustration.png',
  },
  {
    id: 3,
    name: 'الصف الثالث الثانوي',
    nameEn: 'Third Secondary',
    description: 'إتقان اللغة العربية والتحضير للامتحانات',
    curriculum: 'الوحدات: الإملاء - الترجمة - المحادثة - الكتابة الإبداعية',
    color: 'from-emerald-500 to-emerald-600',
    image: '/stage3-illustration.png',
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
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
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

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                      isVisible ? 'scale-150' : 'scale-100'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white bg-gradient-to-br ${stage.color} shadow-lg`}
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
                      <div className="p-6">
                        <p className="text-gray-600 text-sm mb-4 font-medium">
                          {stage.nameEn}
                        </p>

                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {stage.description}
                        </p>

                        {/* Curriculum badge */}
                        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            المنهج
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {stage.curriculum}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <button
                          className={`w-full mt-6 px-4 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r ${stage.color}`}
                        >
                          استكشف المرحلة
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

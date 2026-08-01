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

    window.addEventListener('scroll', handleScroll)
    // Initial call on mount
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden" style={{ minHeight: 'auto' }}>
      {/* Background decorative elements with blur */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div ref={containerRef} className="relative z-10 px-6">
        <div className="max-w-6xl mx-auto pt-32">
          {/* Timeline with alternating cards - starts immediately */}
          <div className="space-y-32 pb-20">
            {stages.map((stage, index) => {
              const isLeft = index % 2 === 0
              const isVisible = visibleCard === stage.id

              return (
                <div
                  key={stage.id}
                  data-stage-id={stage.id}
                  className={`relative min-h-72 flex items-center transition-all duration-1000 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : isLeft
                        ? 'opacity-0 -translate-x-20'
                        : 'opacity-0 translate-x-20'
                  }`}
                >
                  {/* Timeline center line - wavy SVG with animations */}
                  <svg
                    className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-0"
                    width="20"
                    height="100%"
                    viewBox="0 0 20 1000"
                    preserveAspectRatio="none"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c4a550" stopOpacity="1" />
                        <stop offset="50%" stopColor="#d4b868" stopOpacity="1" />
                        <stop offset="100%" stopColor="#a08040" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="timelineGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <style>{`
                        @keyframes timelineFlow {
                          0% { stroke-dashoffset: 0; }
                          100% { stroke-dashoffset: -20; }
                        }
                        .timeline-path {
                          animation: timelineFlow 3s linear infinite;
                          stroke-dasharray: 20;
                          filter: drop-shadow(0 0 4px rgba(196, 165, 80, 0.6));
                        }
                      `}</style>
                    </defs>
                    {/* Wavy line path - continuous S-curves with animation */}
                    <path
                      className="timeline-path"
                      d="M 10 0 Q 14 80, 10 150 Q 6 220, 10 290 Q 14 360, 10 430 Q 6 500, 10 570 Q 14 640, 10 710 Q 6 780, 10 900 L 10 1000"
                      stroke="url(#timelineGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#timelineGlow)"
                    />
                  </svg>

                  {/* Timeline dot with glow effect */}
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
                      isVisible ? 'scale-150' : 'scale-100'
                    }`}
                  >
                    {/* Outer glow rings - animating */}
                    {isVisible && (
                      <>
                        <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border-2 border-amber-400 opacity-50 animate-pulse" />
                        <div className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border border-amber-400/30 animate-ping" />
                      </>
                    )}
                    {/* Main dot with golden glow */}
                    <div
                      className={`w-6 h-6 rounded-full border-4 ${
                        isVisible 
                          ? 'border-amber-400 bg-amber-300 shadow-lg shadow-amber-400/50 scale-125' 
                          : 'border-gray-600 bg-gray-500'
                      } transition-all duration-500`}
                    />
                  </div>

                  {/* Stage number badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 z-30">
                    <div
                      className={`bg-gray-700 px-3 py-1 rounded-full font-bold text-sm shadow-md transition-transform duration-500 border ${
                        stage.id === 1 ? 'border-amber-500' :
                        stage.id === 2 ? 'border-blue-500' : 'border-emerald-500'
                      } ${isVisible ? 'scale-110' : 'scale-100'}`}
                    >
                      <span className={
                        stage.id === 1 ? 'text-amber-400' :
                        stage.id === 2 ? 'text-blue-400' : 'text-emerald-400'
                      }>المرحلة {stage.id}</span>
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
                      className={`bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-l-4 ${
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

                      {/* Card body - dark mode with skeleton for loading */}
                      <div className="p-6 space-y-4">
                        {/* Skeleton dots (4 horizontal dots as placeholder) */}
                        <div className="flex justify-center gap-2 py-2">
                          <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse" />
                          <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse delay-100" />
                          <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse delay-200" />
                          <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse delay-300" />
                        </div>

                        {/* Header with icon */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              {stage.nameEn}
                            </h4>
                            <p className={`text-xs uppercase tracking-widest font-bold ${
                              stage.id === 1 ? 'text-amber-400' :
                              stage.id === 2 ? 'text-blue-400' : 'text-emerald-400'
                            }`}>
                              {stage.shortName} ثانوي
                            </p>
                          </div>
                          <div className={`${stage.iconBg} p-3 rounded-lg flex-shrink-0 shadow-sm`}>
                            {stage.icon && <stage.icon size={24} className={stage.iconColor} />}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {stage.description}
                        </p>

                        {/* Curriculum units as smart tags */}
                        <div className="space-y-3 pt-2 border-t border-gray-700">
                          <p className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                            <CheckCircle2 size={14} className={
                              stage.id === 1 ? 'text-amber-400' :
                              stage.id === 2 ? 'text-blue-400' : 'text-emerald-400'
                            } />
                            محاور الدراسة:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {stage.units.map((unit, i) => (
                              <div
                                key={i}
                                className={`text-xs p-2.5 rounded-md bg-gray-700 border ${
                                  stage.id === 1 ? 'border-amber-500/30' :
                                  stage.id === 2 ? 'border-blue-500/30' : 'border-emerald-500/30'
                                } text-gray-200 font-medium hover:shadow-md transition-all`}
                              >
                                <span className={
                                  stage.id === 1 ? 'text-amber-400' :
                                  stage.id === 2 ? 'text-blue-400' : 'text-emerald-400'
                                }>✓</span> {unit}
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

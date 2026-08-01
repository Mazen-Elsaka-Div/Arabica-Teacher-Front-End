'use client'

import { useState } from 'react'
import Image from 'next/image'

// Concept 5: Card + Hover Reveal (Text list on right, click/hover reveals detail cards on left)
export function Concept5CardReveal() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)

  const stages = [
    {
      id: 1,
      title: 'الصف الأول الثانوي',
      shortDesc: 'أساسيات اللغة العربية والقواعد',
      detailImg: '/stage1.jpg',
      units: ['الدروس الأساسية', 'التصريف والاشتقاق', 'النحو الأساسي'],
    },
    {
      id: 2,
      title: 'الصف الثاني الثانوي',
      shortDesc: 'التعمق في النحو والأدب',
      detailImg: '/stage2.jpg',
      units: ['النحو المتقدم', 'الأدب العربي', 'البلاغة الأساسية'],
    },
    {
      id: 3,
      title: 'الصف الثالث الثانوي',
      shortDesc: 'إتقان اللغة والدراسات الأدبية',
      detailImg: '/stage3.jpg',
      units: ['البلاغة المتقدمة', 'النقد الأدبي', 'التحليل النصي'],
    },
  ]

  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Left side - Card display */}
          <div className="w-full md:w-1/2">
            <div className="sticky top-24">
              {hoveredStage !== null ? (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-4 border-black overflow-hidden shadow-2xl transform transition-all duration-300 hover:shadow-xl">
                  <div className="aspect-video relative bg-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-lg">
                      صورة المرحلة {hoveredStage}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black mb-4">
                      {stages[hoveredStage - 1].title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {stages[hoveredStage - 1].shortDesc}
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-black text-lg">الوحدات الدراسية:</p>
                      {stages[hoveredStage - 1].units.map((unit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-gray-800 p-2 hover:bg-white hover:rounded transition-colors"
                        >
                          <span className="w-3 h-3 bg-black rounded-full"></span>
                          <span>{unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-xl">اختر مرحلة دراسية لترى التفاصيل</p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Text list */}
          <div className="w-full md:w-1/2">
            <div className="space-y-4">
              {stages.map((stage) => (
                <div
                  key={stage.id}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  onClick={() => setHoveredStage(hoveredStage === stage.id ? null : stage.id)}
                  className={`p-6 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                    hoveredStage === stage.id
                      ? 'bg-black text-white border-black scale-105 shadow-xl'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                  <p className={hoveredStage === stage.id ? 'text-gray-100' : 'text-gray-600'}>
                    {stage.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Concept 6: Tabbed Interface with animations
export function Concept6Tabbed() {
  const [activeTab, setActiveTab] = useState(1)

  const stages = [
    {
      id: 1,
      title: 'الصف الأول الثانوي',
      desc: 'أساسيات اللغة العربية والقواعس والدروس الأساسية',
      icon: '📚',
    },
    {
      id: 2,
      title: 'الصف الثاني الثانوي',
      desc: 'التعمق في النحو والأدب والدراسات الأدبية المتقدمة',
      icon: '✍️',
    },
    {
      id: 3,
      title: 'الصف الثالث الثانوي',
      desc: 'إتقان اللغة والدراسات الأدبية والنقد الأدبي المتخصص',
      icon: '🎓',
    },
  ]

  return (
    <div className="min-h-screen bg-black py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">المراحل الدراسية</h2>
          <div className="w-24 h-1 bg-white rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 md:flex-nowrap">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveTab(stage.id)}
              className={`flex-1 py-4 px-6 rounded-lg font-bold transition-all duration-300 transform ${
                activeTab === stage.id
                  ? 'bg-white text-black scale-105 shadow-lg'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <span className="text-2xl mb-2 block">{stage.icon}</span>
              {stage.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gray-300 min-h-96 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <div className="text-6xl mb-4">{stages[activeTab - 1].icon}</div>
                <p>صورة {stages[activeTab - 1].title}</p>
              </div>
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-black mb-6">{stages[activeTab - 1].title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {stages[activeTab - 1].desc}
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-black text-lg">المحتويات:</p>
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-black rounded-full flex-shrink-0"></div>
                      <span>محتوى الدرس {i + 1}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Concept 7: Timeline vertical with hover details
export function Concept7Timeline() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const stages = [
    { id: 1, year: 'الأول', title: 'الصف الأول الثانوي', desc: 'الأساسيات' },
    { id: 2, year: 'الثاني', title: 'الصف الثاني الثانوي', desc: 'التعمق والتطور' },
    { id: 3, year: 'الثالث', title: 'الصف الثالث الثانوي', desc: 'الإتقان والتخصص' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-black mb-16">
          مسارك التعليمي
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-black"></div>

          {/* Items */}
          <div className="space-y-12">
            {stages.map((stage, idx) => (
              <div key={stage.id} className={`flex ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                {/* Left/Right content */}
                <div className="w-1/2 px-8">
                  <div
                    onMouseEnter={() => setHoveredId(stage.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`p-6 rounded-xl border-2 border-black transition-all duration-300 cursor-pointer ${
                      hoveredId === stage.id
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'bg-white text-black'
                    }`}
                  >
                    <div className="text-sm font-bold text-opacity-70 mb-2">
                      المرحلة {stage.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                    <p className="text-sm opacity-80">{stage.desc}</p>
                  </div>
                </div>

                {/* Center circle */}
                <div className="w-0 flex justify-center">
                  <div className="w-6 h-6 bg-black rounded-full border-4 border-white z-10 transform transition-all duration-300"
                    style={{
                      transform: hoveredId === stage.id ? 'scale(1.5)' : 'scale(1)',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Concept 8: Carousel with smooth transitions
export function Concept8Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const stages = [
    {
      id: 1,
      title: 'الصف الأول الثانوي',
      color: 'from-blue-600 to-blue-800',
      desc: 'بدء رحلتك في إتقان اللغة العربية',
    },
    {
      id: 2,
      title: 'الصف الثاني الثانوي',
      color: 'from-purple-600 to-purple-800',
      desc: 'تطوير مهاراتك اللغوية والأدبية',
    },
    {
      id: 3,
      title: 'الصف الثالث الثانوي',
      color: 'from-amber-600 to-amber-800',
      desc: 'الوصول لمستوى الإتقان والتخصص',
    },
  ]

  const next = () => setCurrentIndex((prev) => (prev + 1) % stages.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + stages.length) % stages.length)

  return (
    <div className="min-h-screen bg-black py-20 px-6 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="relative">
          {/* Main carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div className="flex transition-transform duration-500" style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}>
              {stages.map((stage) => (
                <div key={stage.id} className="w-full flex-shrink-0 md:flex">
                  {/* Left - Image area */}
                  <div className={`w-full md:w-1/2 bg-gradient-to-br ${stage.color} min-h-96 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-8xl mb-4">
                        {stage.id === 1 ? '📖' : stage.id === 2 ? '✨' : '🏆'}
                      </div>
                      <p className="text-white text-xl">{stage.title}</p>
                    </div>
                  </div>
                  {/* Right - Text */}
                  <div className="w-full md:w-1/2 bg-white p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-black mb-4">{stage.title}</h3>
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed">{stage.desc}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {Array(4)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="bg-gray-100 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-black">
                              {i + 1}
                            </div>
                            <div className="text-sm text-gray-600">وحدة {i + 1}</div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            ›
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            ‹
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {stages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-8' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'

const stages = [
  { id: 1, label: 'الأول الثانوي', description: 'تأسيس قوي في قواعد اللغة العربية والنصوص الأدبية', order: 1 },
  { id: 2, label: 'الثاني الثانوي', description: 'تعمق في الفهم والتحليل والدراسات الأدبية المتقدمة', order: 2 },
  { id: 3, label: 'الثالث الثانوي', description: 'إتقان شامل وتحضير متقدم للامتحانات النهائية', order: 3 },
]

// ============ CONCEPT 1: Geometric + Wavy Divider ============
export function Concept1StagesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      {/* Wavy Divider */}
      <div className="relative w-full h-32 bg-gradient-to-b from-oklch(0.12_0.020_55) to-white overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
            fill="white"
            opacity="0.8"
          />
          <path d="M0,80 Q150,40 300,80 T600,80 T900,80 T1200,80 L1200,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* Stages Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">المراحل الدراسية</h2>

          <div className="grid grid-cols-3 gap-6">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative cursor-pointer"
              >
                {/* Placeholder image with geometric frame */}
                <div
                  className="relative overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    transform:
                      hoveredId === stage.id
                        ? 'scale(1.15)'
                        : hoveredId && hoveredId !== stage.id
                          ? 'scale(0.85)'
                          : 'scale(1)',
                    zIndex: hoveredId === stage.id ? 10 : stages.length - stage.order,
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border-4 border-black">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl text-black opacity-20">{stage.order}</span>
                    </div>
                  </div>
                </div>

                {/* Text (always on right) */}
                <div className="mt-4 text-right">
                  <h3 className="text-xl font-bold text-black">{stage.label}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ============ CONCEPT 2: Organic + Circle Divider ============
export function Concept2StagesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      {/* Organic Circle Divider */}
      <div className="relative w-full h-40 bg-gradient-to-b from-oklch(0.12_0.020_55) to-white flex items-center justify-center overflow-hidden">
        <svg className="w-96 h-96 absolute -bottom-32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.6"
            filter="url(#blur)"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.4"
            filter="url(#blur)"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="white"
            opacity="0.8"
            filter="url(#blur)"
          />
        </svg>
      </div>

      {/* Stages Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">المراحل الدراسية</h2>

          <div className="grid grid-cols-3 gap-8">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
              >
                {/* Rounded image with organic padding */}
                <div
                  className="relative overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    transform:
                      hoveredId === stage.id
                        ? 'scale(1.2) rotate(2deg)'
                        : hoveredId && hoveredId !== stage.id
                          ? 'scale(0.8) rotate(-2deg)'
                          : 'scale(1) rotate(0deg)',
                    zIndex: hoveredId === stage.id ? 10 : stages.length - stage.order,
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 rounded-3xl shadow-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl text-black opacity-15">{stage.order}</span>
                    </div>
                  </div>
                </div>

                {/* Text below */}
                <div className="mt-6 text-right">
                  <h3 className="text-xl font-bold text-black">{stage.label}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ============ CONCEPT 3: Bold Modern + Diagonal Divider ============
export function Concept3StagesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      {/* Diagonal Strips Divider */}
      <div className="relative w-full h-32 bg-gradient-to-b from-oklch(0.12_0.020_55) to-white overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30" x2="1200" y2="0" stroke="white" strokeWidth="8" opacity="0.5" />
          <line x1="0" y1="60" x2="1200" y2="30" stroke="white" strokeWidth="8" opacity="0.6" />
          <line x1="0" y1="90" x2="1200" y2="60" stroke="white" strokeWidth="8" opacity="0.7" />
          <line x1="0" y1="120" x2="1200" y2="90" stroke="white" strokeWidth="8" opacity="0.8" />
        </svg>
      </div>

      {/* Stages Section */}
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">المراحل الدراسية</h2>

          <div className="grid grid-cols-3 gap-10">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
              >
                {/* Bold square image with border */}
                <div
                  className="relative overflow-hidden transition-all duration-300 ease-out border-4 border-black"
                  style={{
                    transform:
                      hoveredId === stage.id
                        ? 'scale(1.18)'
                        : hoveredId && hoveredId !== stage.id
                          ? 'scale(0.82)'
                          : 'scale(1)',
                    zIndex: hoveredId === stage.id ? 10 : stages.length - stage.order,
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-8xl font-black text-black opacity-10">{stage.order}</span>
                  </div>
                </div>

                {/* Text with accent line */}
                <div className="mt-6 text-right border-r-4 border-black pr-4">
                  <h3 className="text-xl font-black text-black">{stage.label}</h3>
                  <p className="text-gray-800 text-sm leading-relaxed mt-2">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ============ CONCEPT 4: Classic Elegant + Arabesque Divider ============
export function Concept4StagesSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <>
      {/* Arabesque Divider */}
      <div className="relative w-full h-32 bg-gradient-to-b from-oklch(0.12_0.020_55) to-white flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full max-w-md" viewBox="0 0 400 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arabesque" patternUnits="userSpaceOnUse" width="40" height="100">
              <path d="M20,10 Q30,30 20,50 Q10,30 20,10" stroke="white" fill="none" strokeWidth="0.5" opacity="0.6" />
              <circle cx="20" cy="30" r="2" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="400" height="100" fill="url(#arabesque)" />
          <line x1="0" y1="50" x2="400" y2="50" stroke="white" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      {/* Stages Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12 gap-3">
            <div className="w-12 h-1 bg-black"></div>
            <h2 className="text-4xl font-bold text-black">المراحل الدراسية</h2>
            <div className="w-12 h-1 bg-black"></div>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {stages.map((stage) => (
              <div
                key={stage.id}
                onMouseEnter={() => setHoveredId(stage.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative text-center"
              >
                {/* Elegant rounded image */}
                <div
                  className="relative overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    transform:
                      hoveredId === stage.id
                        ? 'scale(1.16)'
                        : hoveredId && hoveredId !== stage.id
                          ? 'scale(0.84)'
                          : 'scale(1)',
                    zIndex: hoveredId === stage.id ? 10 : stages.length - stage.order,
                  }}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-150 to-gray-300 rounded-2xl shadow-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-7xl text-black opacity-12">{stage.order}</span>
                    </div>
                  </div>
                </div>

                {/* Centered elegant text */}
                <div className="mt-8">
                  <h3 className="text-2xl font-semibold text-black">{stage.label}</h3>
                  <div className="flex gap-2 justify-center my-3">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

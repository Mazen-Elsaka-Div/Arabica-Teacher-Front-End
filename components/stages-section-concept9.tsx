'use client'

import { useState, useEffect } from 'react'

export function Concept9ScrollTimeline() {
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate scroll percentage (0-100%)
      const maxScroll = documentHeight - windowHeight
      const percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0

      setScrollPercent(percent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative bg-black overflow-visible">
      {/* Wavy timeline - continuous from hero to end of page */}
      <div
        className="relative left-1/2 -translate-x-1/2 w-20 z-10"
        style={{ minHeight: '300vh' }}
      >
        <svg
          className="absolute left-1/2 top-0 -translate-x-1/2"
          width="20"
          height="100%"
          viewBox="0 0 20 1000"
          preserveAspectRatio="none"
          style={{ overflow: 'visible', minHeight: '300vh' }}
        >
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c4a550" stopOpacity="1" />
              <stop offset="50%" stopColor="#d4b868" stopOpacity="1" />
              <stop offset="100%" stopColor="#a08040" stopOpacity="0.8" />
            </linearGradient>
            <filter id="timelineGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background wavy line - faded */}
          <path
            d="M 10 0 Q 14 80, 10 150 Q 6 220, 10 290 Q 14 360, 10 430 Q 6 500, 10 570 Q 14 640, 10 710 Q 6 780, 10 900 L 10 1000"
            stroke="rgba(196, 165, 80, 0.3)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated wavy line - follows scroll - bold and bright */}
          <path
            d="M 10 0 Q 14 80, 10 150 Q 6 220, 10 290 Q 14 360, 10 430 Q 6 500, 10 570 Q 14 640, 10 710 Q 6 780, 10 900 L 10 1000"
            stroke="url(#timelineGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#timelineGlow)"
            style={{
              strokeDasharray: '1000',
              strokeDashoffset: 1000 - (scrollPercent / 100) * 1000,
              transition: 'stroke-dashoffset 0.1s ease-out',
              opacity: 1,
            }}
          />
        </svg>
      </div>
    </div>
  )
}

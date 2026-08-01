'use client'

export function Concept9ScrollTimeline() {
  return (
    <div className="relative bg-black overflow-visible">
      {/* Wavy timeline - continuous from hero to end of page */}
      <div className="relative left-1/2 -translate-x-1/2 w-20 z-10" style={{ minHeight: '300vh' }}>
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
      </div>
    </div>
  )
}

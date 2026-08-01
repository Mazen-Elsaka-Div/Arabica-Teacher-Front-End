'use client'

/**
 * WaveDivider — خط ذهبي على شكل موجة يفصل بين قسمين
 * يعكس اتجاه الموجة عند تمرير flip={true}
 */
export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden leading-[0]"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden="true"
    >
      {/* طبقة ظل خفيف تحت الموجة */}
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-10 w-full sm:h-14"
      >
        {/* ظل */}
        <path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1380,14 1440,28 L1440,56 L0,56 Z"
          fill="oklch(0.75 0.06 85 / 0.08)"
        />
        {/* الخط الذهبي الرئيسي */}
        <path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1380,14 1440,28"
          fill="none"
          stroke="url(#gold-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* تألق إضافي على الخط */}
        <path
          d="M0,28 C180,56 360,0 540,28 C720,56 900,0 1080,28 C1260,56 1380,14 1440,28"
          fill="none"
          stroke="url(#gold-glow)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.35"
        />
        <defs>
          <linearGradient id="gold-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="oklch(0.78 0.12 80)"  stopOpacity="0.3" />
            <stop offset="25%"  stopColor="oklch(0.82 0.15 85)"  stopOpacity="1"   />
            <stop offset="50%"  stopColor="oklch(0.88 0.18 88)"  stopOpacity="1"   />
            <stop offset="75%"  stopColor="oklch(0.82 0.15 85)"  stopOpacity="1"   />
            <stop offset="100%" stopColor="oklch(0.78 0.12 80)"  stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gold-glow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="oklch(0.90 0.20 88)"  stopOpacity="0" />
            <stop offset="50%"  stopColor="oklch(0.92 0.22 90)"  stopOpacity="1" />
            <stop offset="100%" stopColor="oklch(0.90 0.20 88)"  stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

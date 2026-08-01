'use client'

/**
 * IslamicCorners — زخارف إسلامية هندسية على أركان القسم
 * نجمة ثمانية الأطراف مستوحاة من الزخرفة الإسلامية التقليدية
 * تظهر في الأركان الأربعة + منتصف الحواف العلوية والسفلية
 */

function EightPointStar({ size = 64, opacity = 0.13 }: { size?: number; opacity?: number }) {
  const s = size / 2
  // نجمة ثمانية مرسومة بمسارين مربّعين متداخلين
  const outerR = s * 0.92
  const innerR = s * 0.38

  function starPoints(n: number, outer: number, inner: number, cx: number, cy: number) {
    const pts: string[] = []
    for (let i = 0; i < n * 2; i++) {
      const angle = (Math.PI / n) * i - Math.PI / 2
      const r = i % 2 === 0 ? outer : inner
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
    }
    return pts.join(' ')
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* نجمة ثمانية */}
      <polygon
        points={starPoints(8, outerR, innerR, s, s)}
        fill="none"
        stroke="oklch(0.82 0.13 85)"
        strokeWidth="1"
        opacity={opacity}
      />
      {/* مربع داخلي مدوّر */}
      <rect
        x={s - outerR * 0.5}
        y={s - outerR * 0.5}
        width={outerR}
        height={outerR}
        rx={outerR * 0.08}
        transform={`rotate(45 ${s} ${s})`}
        fill="none"
        stroke="oklch(0.82 0.13 85)"
        strokeWidth="0.8"
        opacity={opacity * 0.7}
      />
      {/* مربع خارجي */}
      <rect
        x={s - outerR * 0.52}
        y={s - outerR * 0.52}
        width={outerR * 1.04}
        height={outerR * 1.04}
        rx={outerR * 0.06}
        fill="none"
        stroke="oklch(0.82 0.13 85)"
        strokeWidth="0.6"
        opacity={opacity * 0.45}
      />
      {/* دائرة مركزية */}
      <circle
        cx={s}
        cy={s}
        r={innerR * 0.7}
        fill="none"
        stroke="oklch(0.82 0.13 85)"
        strokeWidth="0.8"
        opacity={opacity}
      />
    </svg>
  )
}

/** الأركان الخمسة: TL، TR، BL، BR، وواحدة في منتصف الحافة العليا */
export function IslamicCorners() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* أعلى يمين */}
      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <EightPointStar size={80} opacity={0.18} />
      </div>
      {/* أعلى يسار */}
      <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
        <EightPointStar size={80} opacity={0.18} />
      </div>
      {/* منتصف الحافة العليا — أكبر قليلاً كنقطة محورية */}
      <div className="absolute left-1/2 top-6 -translate-x-1/2 sm:top-10">
        <EightPointStar size={100} opacity={0.12} />
      </div>
      {/* أسفل يمين */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8">
        <EightPointStar size={80} opacity={0.18} />
      </div>
      {/* أسفل يسار */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8">
        <EightPointStar size={80} opacity={0.18} />
      </div>
    </div>
  )
}

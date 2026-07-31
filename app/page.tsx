import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { TopographicBackground } from '@/components/topo-background'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* Placeholder next section — same topo background, coming soon */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="القسم التالي"
      >
        <TopographicBackground />
        <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
          <p
            className="text-xl font-semibold"
            style={{ color: 'oklch(0.72 0.06 85)', fontFamily: 'var(--font-cairo)' }}
          >
            قريباً — محتوى القسم التالي
          </p>
        </div>
      </section>
    </main>
  )
}

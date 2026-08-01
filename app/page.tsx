import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeaturesSection } from '@/components/features-section'
import { StagesTimeline } from '@/components/stages-timeline'
import { StatsSection } from '@/components/stats-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'
import { WaveDivider } from '@/components/wave-divider'

export default function Page() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
        <WaveDivider />
        <FeaturesSection />
        <StagesTimeline />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  )
}

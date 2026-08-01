import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { StagesTimeline } from '@/components/stages-timeline'
import { FeaturesSection } from '@/components/features-section'
import { StatsSection } from '@/components/stats-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <main>
        <Navbar />
        <HeroSection />
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

import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { StagesTimeline } from '@/components/stages-timeline'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StagesTimeline />
    </main>
  )
}

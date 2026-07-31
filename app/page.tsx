import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { BookLayout } from '@/components/book-layout'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BookLayout />
    </main>
  )
}

import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import {
  Concept1StagesSection,
  Concept2StagesSection,
  Concept3StagesSection,
  Concept4StagesSection,
} from '@/components/stages-section-concepts'

export default function Page() {
  return (
    <main>
      <Navbar />
      <HeroSection />

      {/* 4 Design Concepts for the Stages Section */}
      <div className="space-y-2 bg-gray-100 py-8">
        {/* Concept 1 */}
        <div className="border-t-4 border-gray-400 pt-8">
          <div className="text-center mb-6 px-6">
            <h2 className="text-2xl font-bold text-gray-800">Concept 1: Geometric + Wavy</h2>
            <p className="text-gray-600">Bold borders, clean geometry, smooth wavy divider</p>
          </div>
          <Concept1StagesSection />
        </div>

        {/* Concept 2 */}
        <div className="border-t-4 border-gray-400 pt-8">
          <div className="text-center mb-6 px-6">
            <h2 className="text-2xl font-bold text-gray-800">Concept 2: Organic + Circles</h2>
            <p className="text-gray-600">Rounded corners, organic curves, overlapping circles divider</p>
          </div>
          <Concept2StagesSection />
        </div>

        {/* Concept 3 */}
        <div className="border-t-4 border-gray-400 pt-8">
          <div className="text-center mb-6 px-6">
            <h2 className="text-2xl font-bold text-gray-800">Concept 3: Bold Modern</h2>
            <p className="text-gray-600">Bold frames, accent lines, dynamic diagonal divider</p>
          </div>
          <Concept3StagesSection />
        </div>

        {/* Concept 4 */}
        <div className="border-t-4 border-gray-400 pt-8 pb-8">
          <div className="text-center mb-6 px-6">
            <h2 className="text-2xl font-bold text-gray-800">Concept 4: Classic Elegant</h2>
            <p className="text-gray-600">Centered text, decorative dots, refined arabesque divider</p>
          </div>
          <Concept4StagesSection />
        </div>
      </div>
    </main>
  )
}

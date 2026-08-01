import {
  Concept1StagesSection,
  Concept2StagesSection,
  Concept3StagesSection,
  Concept4StagesSection,
} from '@/components/stages-section-concepts'

export default function ConceptsPage() {
  return (
    <main className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-300 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-black">المراحل الدراسية — 4 Concepts</h1>
          <p className="text-gray-600 mt-2">اختر التصميم اللي تحب — يمكنك التفاعل مع الصور بـ Hover</p>
        </div>
      </div>

      {/* Concept 1 */}
      <div className="py-12 border-b-4 border-gray-400">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-black text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 1: Geometric + Wavy Divider</h2>
          </div>
          <p className="text-gray-700 text-lg">
            تصميم جريء مع حدود واضحة وأشكال هندسية نقية. الفاصل متموج بسلاسة.
          </p>
        </div>
        <Concept1StagesSection />
      </div>

      {/* Concept 2 */}
      <div className="py-12 border-b-4 border-gray-400">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-black text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 2: Organic + Circle Divider</h2>
          </div>
          <p className="text-gray-700 text-lg">
            تصميم عضوي مع زوايا مستديرة ومنحنيات ناعمة. الفاصل عبارة عن دوائر متداخلة.
          </p>
        </div>
        <Concept2StagesSection />
      </div>

      {/* Concept 3 */}
      <div className="py-12 border-b-4 border-gray-400">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-black text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 3: Bold Modern + Diagonal Divider</h2>
          </div>
          <p className="text-gray-700 text-lg">
            تصميم حديث وجريء مع حدود ثقيلة وخطوط لون متحركة. الفاصل عبارة عن خطوط قطرية ديناميكية.
          </p>
        </div>
        <Concept3StagesSection />
      </div>

      {/* Concept 4 */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-black text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 4: Classic Elegant + Arabesque Divider</h2>
          </div>
          <p className="text-gray-700 text-lg">
            تصميم أنيق وكلاسيكي مع نصوص متمركزة في الوسط ونقاط زخرفية. الفاصل متأثر بالعناصر العربية التقليدية.
          </p>
        </div>
        <Concept4StagesSection />
      </div>

      {/* Footer */}
      <div className="bg-white border-t-2 border-gray-300 py-8 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>اختر أي concept من الأعلى وقول لي أيها تفضل أو إذا بتحتاج تعديلات</p>
        </div>
      </div>
    </main>
  )
}

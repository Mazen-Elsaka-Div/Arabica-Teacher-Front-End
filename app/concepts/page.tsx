import {
  Concept1StagesSection,
  Concept2StagesSection,
  Concept3StagesSection,
  Concept4StagesSection,
} from '@/components/stages-section-concepts'
import {
  Concept5CardReveal,
  Concept6Tabbed,
  Concept7Timeline,
  Concept8Carousel,
} from '@/components/stages-section-advanced'
import { Concept9ScrollTimeline } from '@/components/stages-section-concept9'

export default function ConceptsPage() {
  return (
    <main className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-300 py-6 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-black">المراحل الدراسية — 9 Concepts</h1>
          <p className="text-gray-600 mt-2">اختر التصميم اللي تحب — يمكنك التفاعل مع جميع الـ Concepts بـ Hover</p>
          <p className="text-gray-500 text-sm mt-1">Concepts 1-4: التصاميم الأساسية | Concepts 5-8: التصاميم التفاعلية | Concept 9: Timeline مع Scroll</p>
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

      {/* Divider - Advanced Concepts */}
      <div className="bg-gradient-to-r from-gray-800 to-black py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">التصاميم التفاعلية المتقدمة</h2>
          <p className="text-gray-300">تصاميم غنية بالميزات والتفاعلات — Card Reveal، Tabs، Timeline، Carousel</p>
        </div>
      </div>

      {/* Concept 5 - Card Reveal (Recommended) */}
      <div className="py-12 border-b-4 border-green-500 bg-green-50">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 5: Card Reveal ⭐ (Recommended)</h2>
          </div>
          <p className="text-gray-700 text-lg">
            الفكرة الجديدة: نصوص على اليمين كقائمة (مع hover يتحول لأسود)، وعند الـ hover تظهر كارد على الشمال بالصورة والتفاصيل. مثالي للتفاعل السلس!
          </p>
        </div>
        <Concept5CardReveal />
      </div>

      {/* Concept 6 - Tabbed */}
      <div className="py-12 border-b-4 border-purple-500">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 6: Tabbed Interface</h2>
          </div>
          <p className="text-gray-700 text-lg">
            واجهة تبويب على خلفية سوداء. انقر على التبويب أو مرر الماوس لتحديث المحتوى مع صورة وتفاصيل.
          </p>
        </div>
        <Concept6Tabbed />
      </div>

      {/* Concept 7 - Timeline */}
      <div className="py-12 border-b-4 border-blue-500">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 7: Timeline</h2>
          </div>
          <p className="text-gray-700 text-lg">
            خط زمني عمودي يعرض المراحل بترتيب تصاعدي. عند الـ hover، العنصر يتحول لأسود ويكبر. تصميم كلاسيكي وأنيق.
          </p>
        </div>
        <Concept7Timeline />
      </div>

      {/* Concept 8 - Carousel */}
      <div className="py-12 border-b-4 border-amber-500">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 8: Carousel Slider</h2>
          </div>
          <p className="text-gray-700 text-lg">
            دوّار تفاعلي مع أزرار تنقل وتنقاط مؤشرات. الانتقال سلس بين المراحل مع صورة على اليسار ونصوص على اليمين.
          </p>
        </div>
        <Concept8Carousel />
      </div>

      {/* Concept 9 - Scroll Timeline (NEW) */}
      <div className="py-12 border-t-8 border-red-600 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg mb-4">
            <h2 className="text-2xl font-bold">Concept 9: Scroll Timeline (Merged 7+8) ⭐ NEW</h2>
          </div>
          <p className="text-gray-700 text-lg">
            تايم لاين عمودي في الوسط مع كارد تظهر على الجانب عند الـ scroll:
            <br />
            المرحلة 1 ← كارد على الشمال | المرحلة 2 ← كارد على اليمين | المرحلة 3 ← كارد على الشمال
            <br />
            <span className="text-red-600 font-bold">أفضل تجربة scroll مع animation سلسة!</span>
          </p>
        </div>
        <Concept9ScrollTimeline />
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">اختر التصميم المفضل</h3>
          <p className="text-gray-300 mb-4">
            Concept 9 (Scroll Timeline) أو Concept 5 (Card Reveal) موصى بهم للتفاعل الأمثل.
          </p>
          <p className="text-gray-400 text-sm">
            قول لي رقم الـ Concept أو اطلب تعديلات على أي منهم وأنا جاهز!
          </p>
        </div>
      </div>
    </main>
  )
}

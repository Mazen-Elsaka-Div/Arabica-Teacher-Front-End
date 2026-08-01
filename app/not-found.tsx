import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-xl text-center">
        <div className="font-mono text-8xl font-black text-foreground/10 select-none mb-2">
          404
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          الصفحة دي مش موجودة
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          يمكن الرابط اتكتب غلط أو الصفحة اتحذفت.
          <br />
          جرّب ترجع للرئيسية.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold px-6 py-3 hover:opacity-90 transition-opacity"
        >
          <Home className="size-4" />
          <span>الرئيسية</span>
          <ArrowRight className="size-4 rotate-180" />
        </Link>
      </div>
    </main>
  )
}

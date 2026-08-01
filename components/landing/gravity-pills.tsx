'use client'

import { useEffect, useRef } from 'react'
import Matter from 'matter-js'

type Pill = {
  label: string
  className: string
  shape?: 'pill' | 'circle'
  big?: boolean
}

const PILLS: Pill[] = [
  { label: 'نحو',    className: 'bg-primary text-primary-foreground', big: true },
  { label: 'صرف',   className: 'bg-navy text-cream dark:bg-ink-raised dark:text-ink-fg dark:ring-1 dark:ring-ink-line', big: true },
  { label: 'بلاغة', className: 'bg-emerald-brand text-cream', big: true },
  { label: 'إملاء', className: 'bg-gold-deep text-cream dark:bg-teal-deep dark:text-ink-fg' },
  { label: 'قراءة', className: 'bg-navy text-cream dark:bg-ink-raised dark:text-ink-fg dark:ring-1 dark:ring-ink-line' },
  { label: 'كتابة', className: 'bg-emerald-deep text-cream dark:bg-teal-glow dark:text-ink-base' },
  { label: 'إعراب', className: 'bg-primary text-primary-foreground', big: true },
  { label: 'أدب',   className: 'bg-emerald-brand text-cream' },
  { label: 'ض', className: 'bg-primary text-primary-foreground', shape: 'circle', big: true },
  { label: 'ع', className: 'bg-emerald-brand text-cream', shape: 'circle', big: true },
  { label: 'ص', className: 'bg-navy text-cream dark:bg-ink-raised dark:text-ink-fg', shape: 'circle', big: true },
  { label: 'ح', className: 'bg-gold-deep text-cream dark:bg-teal-deep dark:text-ink-fg', shape: 'circle' },
]

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function GravityPills() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const pillRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const w = scene.clientWidth
    const scale = w <= 380 ? 0.44 : w <= 520 ? 0.54 : 1

    pillRefs.current.forEach((el, i) => {
      if (!el) return
      const p = PILLS[i]
      const base = p.shape === 'circle' ? (p.big ? 128 : 96) : p.big ? 104 : 84
      const h = Math.round(base * scale)
      el.style.height = `${h}px`
      if (p.shape === 'circle') el.style.width = `${h}px`
      el.style.fontSize = `${Math.round((p.big ? 40 : 30) * scale)}px`
    })

    const {
      Engine, Runner, World, Bodies, Body,
      Mouse, MouseConstraint, Composite, Events,
    } = Matter

    const engine = Engine.create()
    engine.gravity.y = 1

    let width = scene.clientWidth
    let height = scene.clientHeight
    const wall = 80

    const createWalls = () => [
      Bodies.rectangle(width / 2, height + wall / 2, width + wall * 2, wall, { isStatic: true }),
      Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, { isStatic: true }),
      Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, { isStatic: true }),
    ]

    let walls = createWalls()
    World.add(engine.world, walls)

    const bodies: { body: Matter.Body; el: HTMLDivElement }[] = []
    pillRefs.current.forEach((el, i) => {
      if (!el) return
      const pw = el.offsetWidth
      const ph = el.offsetHeight
      const isCircle = PILLS[i].shape === 'circle'
      const cols = pillRefs.current.length
      const colW = width / cols
      const startX = Math.min(width - pw / 2, Math.max(pw / 2, colW * (i + 0.5) + random(-colW / 3, colW / 3)))
      const startY = random(-700, -60)
      const body = isCircle
        ? Bodies.circle(startX, startY, ph / 2, { restitution: 0.35, friction: 0.4, frictionAir: 0.02 })
        : Bodies.rectangle(startX, startY, pw, ph, { chamfer: { radius: ph / 2 }, restitution: 0.35, friction: 0.4, frictionAir: 0.02 })
      Body.setAngle(body, random(-0.4, 0.4))
      bodies.push({ body, el })
      World.add(engine.world, body)
    })

    const mouse = Mouse.create(scene)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })
    World.add(engine.world, mouseConstraint)
    mouse.element.removeEventListener('wheel', (mouse as unknown as { mousewheel: EventListener }).mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', (mouse as unknown as { mousewheel: EventListener }).mousewheel)

    const runner = Runner.create()

    const syncDom = () => {
      for (const { body, el } of bodies) {
        const { x, y } = body.position
        el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${body.angle}rad)`
      }
    }

    Events.on(engine, 'afterUpdate', syncDom)

    pillRefs.current.forEach((el, i) => {
      const entry = bodies[i]
      if (!el || !entry) return
      const { x, y } = entry.body.position
      el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2}px) rotate(${entry.body.angle}rad)`
      el.style.opacity = '1'
    })

    let started = false
    let io: IntersectionObserver | null = null

    if (prefersReduced) {
      for (let i = 0; i < 480; i++) Engine.update(engine, 1000 / 60)
      syncDom()
      started = true
      Runner.run(runner, engine)
    } else {
      const startDrop = () => {
        if (started) return
        started = true
        width = scene.clientWidth
        height = scene.clientHeight
        Composite.remove(engine.world, walls)
        walls = createWalls()
        World.add(engine.world, walls)
        Runner.run(runner, engine)
      }
      io = new IntersectionObserver(
        (entries) => { if (entries.some((e) => e.isIntersecting)) startDrop() },
        { threshold: 0.15 },
      )
      io.observe(scene)
      const rect = scene.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) startDrop()
      window.setTimeout(startDrop, 1800)
    }

    const handleResize = () => {
      const newW = scene.clientWidth
      const newH = scene.clientHeight
      if (newW === width && newH === height) return
      width = newW
      height = newH
      Composite.remove(engine.world, walls)
      walls = createWalls()
      World.add(engine.world, walls)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(scene)

    return () => {
      io?.disconnect()
      ro.disconnect()
      Runner.stop(runner)
      World.clear(engine.world, false)
      Engine.clear(engine)
      Events.off(engine, 'afterUpdate', syncDom)
    }
  }, [])

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    >
      {PILLS.map((p, i) => (
        <div
          key={p.label}
          ref={(el) => { pillRefs.current[i] = el }}
          className={`absolute left-0 top-0 flex select-none items-center justify-center font-extrabold shadow-xl will-change-transform ${
            p.shape === 'circle' ? 'rounded-full' : 'rounded-full px-8'
          } ${p.className}`}
          style={{
            opacity: 0,
            height: p.shape === 'circle' ? (p.big ? 128 : 96) : p.big ? 104 : 84,
            width: p.shape === 'circle' ? (p.big ? 128 : 96) : undefined,
            fontSize: p.big ? 40 : 30,
          }}
        >
          {p.label}
        </div>
      ))}
    </div>
  )
}

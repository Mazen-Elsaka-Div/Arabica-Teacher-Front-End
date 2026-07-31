'use client'

import Image from 'next/image'

export function BookLayout() {
  return (
    <section className="relative w-full py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Book Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - برديه Image */}
          <div className="flex justify-center items-center order-2 md:order-1">
            <div className="relative w-full aspect-square max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg" />
              <Image
                src="/برديه.png"
                alt="برديه"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side - حباره Image (bottom-right) */}
          <div className="flex flex-col justify-end items-center order-1 md:order-2">
            <div className="relative w-full aspect-video max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg" />
              <Image
                src="/حباره.png"
                alt="حباره"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

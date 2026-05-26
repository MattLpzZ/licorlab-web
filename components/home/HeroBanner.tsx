'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    id: 0,
    eyebrow: 'Puerto Plata · Entrega en 30 min',
    lines: ['TODO LO QUE', 'NECESITAS PARA'],
    accent: 'CELEBRAR.',
    sub: 'Rones, vinos, tequilas, vodkas y más. La mayor selección de licores importados y nacionales de RD.',
    cta: { label: 'Ver catálogo', href: '/catalog' },
    cta2: { label: 'Bundles · Ahorra 10%', href: '/catalog?category=bundles' },
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=1600&h=640&q=80',
  },
  {
    id: 1,
    eyebrow: 'Rones Premium · Puerto Plata',
    lines: ['BARCELÓ', 'IMPERIAL'],
    accent: 'MASTERBLEND.',
    sub: 'El ron dominicano más premiado. Añejado hasta 30 años en barricas de roble americano.',
    cta: { label: 'Ver Rones', href: '/catalog?category=rones' },
    cta2: { label: 'Ver precio', href: '/products/barcelo-imperial' },
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=1600&h=640&q=80',
  },
  {
    id: 2,
    eyebrow: 'Vodka Premium · Puerto Plata',
    lines: ['GREY', 'GOOSE'],
    accent: 'VODKA.',
    sub: 'Destilado en Francia con trigo de Beauce y agua de Gensac-la-Pallue. El estándar de la perfección.',
    cta: { label: 'Ver Vodkas', href: '/catalog?category=vodka' },
    cta2: { label: 'Ver precio', href: '/products/grey-goose' },
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=1600&h=640&q=80',
  },
]

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  // Direct DOM manipulation — no re-render on scroll
  useEffect(() => {
    function onScroll() {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const slide = SLIDES[current]

  return (
    <section className="relative h-[480px] overflow-hidden bg-[#0D0D0D]" aria-label="Portada">
      {/* Parallax background container — taller than section for travel room */}
      <div
        ref={parallaxRef}
        className="absolute left-0 right-0"
        style={{ top: '-12%', height: '124%', willChange: 'transform' }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={s.image}
              alt=""
              fill
              className="object-cover opacity-35"
              priority={i === 0}
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center max-w-site mx-auto px-4">
        <div className="max-w-xl">
          <p className="text-accent text-[11px] uppercase tracking-[0.35em] font-ui mb-4">
            {slide.eyebrow}
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl text-white leading-[0.9] mb-5">
            {slide.lines.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
            <span className="text-accent">{slide.accent}</span>
          </h1>
          <p className="text-white/55 font-ui text-sm leading-relaxed mb-7 max-w-sm">
            {slide.sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={slide.cta.href}
              className="inline-block bg-accent text-white font-ui font-semibold text-xs uppercase tracking-[0.2em] px-7 py-3.5 rounded-lg hover:bg-accent-light transition-colors"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.cta2.href}
              className="inline-block border border-white/25 text-white/80 font-ui text-xs uppercase tracking-[0.15em] px-7 py-3.5 rounded-lg hover:border-white/60 hover:text-white transition-colors"
            >
              {slide.cta2.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white/70 hover:text-white transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Slide siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white/70 hover:text-white transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-accent w-8' : 'bg-white/40 w-3 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary to-transparent" />
    </section>
  )
}

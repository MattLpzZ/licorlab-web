import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'

export default function EditorialBanner() {
  return (
    <section className="relative h-[55vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1600&h=600&q=80"
        alt="La Selección del Verano"
        fill
        className="object-cover opacity-40"
        sizes="100vw"
        unoptimized
      />
      <div className="absolute inset-0 bg-black/60" />

      <AnimateIn className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto" direction="none">
        <span className="inline-block border border-accent text-accent text-xs font-body uppercase tracking-widest px-3 py-1 mb-6">
          Temporada
        </span>
        <h2 className="font-heading text-5xl md:text-7xl text-white mb-4 leading-tight">
          La Selección del Verano
        </h2>
        <p className="text-white/70 text-sm font-body mb-8 max-w-md">
          Las etiquetas más refrescantes y elegantes para esta temporada. Curadas por nuestros sommeliers.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-primary text-text-1 font-body text-sm font-medium uppercase tracking-wider px-10 py-3 hover:bg-surface transition-colors"
        >
          Explorar ahora
        </Link>
      </AnimateIn>
    </section>
  )
}

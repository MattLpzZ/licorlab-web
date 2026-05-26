import Image from 'next/image'
import Link from 'next/link'

export default function EditorialBanner() {
  return (
    <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1600&h=600&q=80"
        alt="La Selección del Verano"
        fill
        className="object-cover opacity-40"
        sizes="100vw"
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto">
        <span className="inline-block border border-accent text-accent text-xs font-body uppercase tracking-widest px-3 py-1 mb-6">
          Temporada
        </span>
        <h2 className="font-heading text-5xl md:text-7xl text-text-1 mb-4 leading-tight">
          La Selección del Verano
        </h2>
        <p className="text-text-2 text-sm font-body mb-8 max-w-md">
          Las etiquetas más refrescantes y elegantes para esta temporada. Curadas por nuestros sommeliers.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-accent text-primary font-body text-sm font-medium uppercase tracking-wider px-10 py-3 hover:bg-accent-light transition-colors"
        >
          Explorar ahora
        </Link>
      </div>
    </section>
  )
}

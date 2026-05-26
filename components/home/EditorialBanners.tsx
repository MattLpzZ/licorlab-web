import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'

interface BannerItem {
  eyebrow: string
  headline: string
  sub: string
  cta: string
  href: string
  bg: string
  textColor: string
  subColor: string
  ctaBg: string
  image: string
  video?: string | null
  imageAlt: string
  imageRight: boolean
}

const BANNERS: BannerItem[] = [
  {
    eyebrow: 'Descuentos automáticos',
    headline: 'Lleva 6,\nahorras 10%',
    sub: 'Cualquier combinación de botellas. Sin código, se aplica solo en el carrito.',
    cta: 'Ver precios',
    href: '/catalog?sort=price_asc',
    bg: 'bg-[#1a0a0e]',
    textColor: 'text-white',
    subColor: 'text-white/60',
    ctaBg: 'bg-accent hover:bg-accent-light text-white',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=700&h=480&q=80',
    video: null,
    imageAlt: 'Botellas de ron',
    imageRight: true,
  },
  {
    eyebrow: 'Vinos del mundo',
    headline: 'Tintos, blancos\ny espumantes',
    sub: 'Desde Casillero del Diablo hasta Termanthia. La mayor selección en Puerto Plata.',
    cta: 'Explorar vinos',
    href: '/catalog?category=vinos',
    bg: 'bg-[#f5f0eb]',
    textColor: 'text-text-1',
    subColor: 'text-text-2',
    ctaBg: 'bg-text-1 hover:bg-[#333] text-white',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&h=480&q=80',
    video: null,
    imageAlt: 'Copas de vino',
    imageRight: false,
  },
  {
    eyebrow: 'Scotch · Bourbon · Japanese',
    headline: 'El mundo\ndel whisky',
    sub: 'Dewars, Johnnie Walker, single malts y más. Envío express en 30 minutos.',
    cta: 'Ver whiskies',
    href: '/catalog?category=whisky',
    bg: 'bg-[#1c1410]',
    textColor: 'text-white',
    subColor: 'text-white/60',
    ctaBg: 'bg-accent hover:bg-accent-light text-white',
    image: 'https://images.unsplash.com/photo-1584283604310-2aab12743a01?auto=format&fit=crop&w=700&h=480&q=80',
    video: null,
    imageAlt: 'Botella de whisky',
    imageRight: true,
  },
]

function BannerMedia({ src, videoSrc, alt, imageRight }: {
  src: string
  videoSrc?: string | null
  alt: string
  imageRight: boolean
  bg: string
}) {
  return (
    <div className="relative md:w-[44%] h-52 md:h-auto shrink-0 overflow-hidden">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      )}
      {/* Fade edge toward text */}
      <div
        className={`absolute inset-y-0 ${imageRight ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} w-28 from-current to-transparent opacity-100`}
        style={{ color: 'inherit' }}
        aria-hidden
      />
    </div>
  )
}

export default function EditorialBanners() {
  return (
    <section className="py-4 px-4 bg-primary space-y-3">
      <div className="max-w-site mx-auto space-y-3">
        {BANNERS.map((b, i) => (
          <AnimateIn key={b.href} delay={i * 60}>
            <div
              className={`relative overflow-hidden rounded-2xl ${b.bg} flex flex-col md:flex-row ${b.imageRight ? '' : 'md:flex-row-reverse'} min-h-[220px] md:min-h-[240px]`}
            >
              {/* Text */}
              <div className="flex-1 flex flex-col justify-center px-8 py-10 md:py-0 md:pl-12 md:pr-6 z-10">
                <p className="text-accent text-[10px] uppercase tracking-[0.25em] font-ui mb-3">
                  {b.eyebrow}
                </p>
                <h3 className={`font-heading font-extrabold text-3xl md:text-4xl leading-tight mb-3 whitespace-pre-line ${b.textColor}`}>
                  {b.headline}
                </h3>
                <p className={`text-sm font-ui leading-relaxed mb-6 max-w-xs ${b.subColor}`}>
                  {b.sub}
                </p>
                <div>
                  <Link
                    href={b.href}
                    className={`inline-block font-ui font-semibold text-xs uppercase tracking-[0.18em] px-6 py-3 rounded-lg transition-colors ${b.ctaBg}`}
                  >
                    {b.cta}
                  </Link>
                </div>
              </div>

              {/* Media (image or video) */}
              <div className={`relative md:w-[44%] h-52 md:h-auto shrink-0`}>
                {b.video ? (
                  <video
                    src={b.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={b.image}
                    alt={b.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
                {/* Color fade toward text */}
                <div
                  className={`absolute inset-y-0 ${b.imageRight ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} w-24 to-transparent`}
                  style={{
                    backgroundImage: `linear-gradient(to ${b.imageRight ? 'right' : 'left'}, ${
                      b.bg === 'bg-[#f5f0eb]' ? '#f5f0eb' :
                      b.bg === 'bg-[#1a0a0e]' ? '#1a0a0e' : '#1c1410'
                    }, transparent)`
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

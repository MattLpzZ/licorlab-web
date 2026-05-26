import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'

const BLOCKS = [
  { top: 'RD$800', mid: 'Y', bottom: 'BAJO', href: '/catalog?max_price=800' },
  { top: 'RD$2,000', mid: 'Y', bottom: 'BAJO', href: '/catalog?max_price=2000' },
  { top: 'RD$4,000', mid: 'Y', bottom: 'BAJO', href: '/catalog?max_price=4000' },
  { top: 'FINE,', mid: 'RARE', bottom: '& LUX', href: '/catalog?min_price=4000' },
]

export default function ShopByPrice() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-site mx-auto px-4">
        <AnimateIn className="text-center mb-14">
          <p className="text-accent text-xs uppercase tracking-[0.2em] font-body mb-2">Tu presupuesto</p>
          <h2 className="font-heading text-4xl md:text-5xl text-text-1">Compra por precio</h2>
        </AnimateIn>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {BLOCKS.map(({ top, mid, bottom, href }, i) => (
            <AnimateIn key={href} delay={i * 80} direction="up">
              <Link href={href} className="block group">
                <div className="
                  w-40 h-40 md:w-52 md:h-52
                  rounded-full
                  bg-surface-2
                  border-2 border-accent/20
                  group-hover:border-accent
                  group-hover:bg-surface
                  group-hover:scale-105
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  cursor-pointer
                  shadow-[0_0_0_0_rgba(231,31,70,0)]
                  group-hover:shadow-[0_0_24px_0_rgba(231,31,70,0.15)]
                ">
                  <span className="font-heading text-xl md:text-2xl text-accent font-semibold leading-none">
                    {top}
                  </span>
                  <span className="font-body text-[10px] text-text-3 uppercase tracking-[0.18em] mt-1">
                    {mid}
                  </span>
                  <span className="font-body text-[10px] text-text-3 uppercase tracking-[0.18em]">
                    {bottom}
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

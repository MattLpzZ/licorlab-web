import Link from 'next/link'

interface PromoBannerProps {
  eyebrow?: string
  headline: string
  sub?: string
  href: string
  cta: string
  variant?: 'dark' | 'gold' | 'red'
}

const bg = {
  dark: 'bg-text-1',
  gold: 'bg-accent',
  red: 'bg-red-700',
}
const headlineColor = {
  dark: 'text-white',
  gold: 'text-text-1',
  red: 'text-white',
}
const subColor = {
  dark: 'text-white/60',
  gold: 'text-text-1/70',
  red: 'text-white/70',
}
const eyebrowColor = {
  dark: 'text-accent',
  gold: 'text-text-1/60',
  red: 'text-white/70',
}
const ctaClass = {
  dark: 'bg-white text-text-1 hover:bg-surface',
  gold: 'bg-text-1 text-white hover:bg-text-2',
  red: 'bg-white text-red-700 hover:bg-surface',
}

export default function PromoBanner({
  eyebrow,
  headline,
  sub,
  href,
  cta,
  variant = 'dark',
}: PromoBannerProps) {
  return (
    <section className={`${bg[variant]} py-9 md:py-12`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          {eyebrow && (
            <p className={`text-[11px] font-body uppercase tracking-[0.25em] mb-2 ${eyebrowColor[variant]}`}>
              {eyebrow}
            </p>
          )}
          <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] ${headlineColor[variant]}`}>
            {headline}
          </h2>
          {sub && (
            <p className={`font-body text-sm mt-2 ${subColor[variant]}`}>{sub}</p>
          )}
        </div>
        <Link
          href={href}
          className={`${ctaClass[variant]} font-body font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 transition-colors whitespace-nowrap shrink-0`}
        >
          {cta} →
        </Link>
      </div>
    </section>
  )
}

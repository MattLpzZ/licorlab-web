import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = [
  { label: 'Rones', slug: 'rones' },
  { label: 'Vodka', slug: 'vodka' },
  { label: 'Vinos', slug: 'vinos' },
  { label: 'Tequila', slug: 'tequila' },
  { label: 'Brandies', slug: 'brandies' },
  { label: 'Gin', slug: 'gin' },
  { label: 'Horario', slug: 'horario' },
  { label: 'Fine & Lux', slug: '' },
]

const INFO_LINKS = [
  { label: 'Sobre nosotros', href: '/about' },
  { label: 'Política de entrega', href: '/delivery' },
  { label: 'Política de devoluciones', href: '/returns' },
  { label: 'Términos y condiciones', href: '/terms' },
  { label: 'Preguntas frecuentes', href: '/faq' },
]

export default function Footer() {
  return (
    <footer className="bg-[#e71f46]">
      <div className="px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/">
              <Image
                src="/LG-BLACK.svg"
                alt="LicorLab"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm font-ui leading-relaxed">
              La selección que mereces. Envío express en Santo Domingo.
            </p>
            <p className="text-white/50 text-xs font-ui uppercase tracking-wider">
              Solo para mayores de 18 años.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Categorías
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.map(({ label, slug }) => (
                <li key={label}>
                  <Link
                    href={slug ? `/catalog?category=${slug}` : '/catalog'}
                    className="text-white/70 hover:text-white text-sm font-ui transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Información
            </h3>
            <ul className="flex flex-col gap-2.5">
              {INFO_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm font-ui transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-ui font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Contacto
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-0.5">
                <span className="text-white/50 text-[11px] font-ui uppercase tracking-wider">WhatsApp</span>
                <a
                  href="https://wa.me/18091234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white text-sm font-ui transition-colors"
                >
                  +1 (809) 123-4567
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-white/50 text-[11px] font-ui uppercase tracking-wider">Email</span>
                <a
                  href="mailto:hola@licorlab.do"
                  className="text-white/80 hover:text-white text-sm font-ui transition-colors"
                >
                  hola@licorlab.do
                </a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-white/50 text-[11px] font-ui uppercase tracking-wider">Horario</span>
                <span className="text-white/80 text-sm font-ui">Lun–Dom · 10AM – 10PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-ui">
            © 2025 LicorLab. Todos los derechos reservados.
          </p>
          <p className="text-white/50 text-xs font-ui">
            Powered by LicorLab · Santo Domingo, RD
          </p>
        </div>
      </div>
    </footer>
  )
}

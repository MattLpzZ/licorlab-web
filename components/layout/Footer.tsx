import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = [
  { label: 'Rones', slug: 'rones' },
  { label: 'Vodka', slug: 'vodka' },
  { label: 'Vinos', slug: 'vinos' },
  { label: 'Tequila', slug: 'tequila' },
  { label: 'Brandies', slug: 'brandies' },
  { label: 'Gin', slug: 'gin' },
  { label: 'Ver Todo', slug: '' },
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
    <footer className="bg-surface border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/">
              <Image src="/LG-WHITE.svg" alt="LicorLab" width={120} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-text-3 text-sm leading-relaxed">La selección que mereces.</p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-heading text-text-1 text-base mb-4 tracking-wide">Categorías</h3>
            <ul className="flex flex-col gap-2">
              {CATEGORIES.map(({ label, slug }) => (
                <li key={label}>
                  <Link
                    href={slug ? `/catalog?category=${slug}` : '/catalog'}
                    className="text-text-2 hover:text-text-1 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="font-heading text-text-1 text-base mb-4 tracking-wide">Información</h3>
            <ul className="flex flex-col gap-2">
              {INFO_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-text-2 hover:text-text-1 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-heading text-text-1 text-base mb-4 tracking-wide">Contacto</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://wa.me/18091234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-2 hover:text-text-1 text-sm transition-colors flex items-center gap-2"
                >
                  <span className="text-text-3 text-xs uppercase tracking-wider">WhatsApp</span>
                  <span>+1 (809) 123-4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hola@licorlab.do"
                  className="text-text-2 hover:text-text-1 text-sm transition-colors flex items-center gap-2"
                >
                  <span className="text-text-3 text-xs uppercase tracking-wider">Email</span>
                  <span>hola@licorlab.do</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-3 text-xs">
            © 2025 LicorLab. Todos los derechos reservados.
          </p>
          <p className="text-text-3 text-xs">
            Solo para mayores de 18 años.
          </p>
        </div>
      </div>
    </footer>
  )
}

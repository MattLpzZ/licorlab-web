import type { Metadata, Viewport } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import MobileNav from '@/components/layout/MobileNav'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#e71f46',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'LicorLab — Rones, Vinos, Tequilas y más en Puerto Plata',
    template: '%s | LicorLab',
  },
  description:
    'Compra rones, vinos, tequilas, vodkas y licores premium con entrega express en 30 minutos en Puerto Plata, RD. La mayor selección de licores importados y nacionales.',
  keywords: [
    'licores Puerto Plata',
    'rones dominicanos',
    'vinos República Dominicana',
    'tequila RD',
    'vodka entrega a domicilio',
    'licorería online RD',
    'LicorLab',
    'comprar licores online',
  ],
  openGraph: {
    title: 'LicorLab — Rones, Vinos, Tequilas con envío en 30 min · Puerto Plata',
    description:
      'La mayor selección de licores importados y nacionales. Envío express en 30 minutos en Puerto Plata.',
    type: 'website',
    locale: 'es_DO',
    siteName: 'LicorLab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LicorLab — Licores Premium · Envío 30 min · Puerto Plata',
    description: 'Rones, vinos, tequilas y más. Entrega express en Puerto Plata.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://licorlab.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${montserrat.variable}`}>
      {/* pb-16 leaves room for the fixed mobile bottom nav */}
      <body className="pb-16 md:pb-0">
        {children}
        <WhatsAppButton />
        <MobileNav />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LicorLab — Selección Premium de Licores',
  description: 'La selección que mereces. Envío express en Santo Domingo.',
  openGraph: {
    title: 'LicorLab — Selección Premium de Licores',
    description: 'La selección que mereces. Envío express en Santo Domingo.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LicorLab — Licores Premium',
    short_name: 'LicorLab',
    description: 'Rones, vinos, tequilas y más con envío express en Puerto Plata',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f0eb',
    theme_color: '#e71f46',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}

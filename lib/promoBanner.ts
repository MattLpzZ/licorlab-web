/**
 * BANNER PROMOCIONAL DEL CATÁLOGO
 * ─────────────────────────────────────────────────────────────────────────────
 * Edita este objeto para cambiar el banner inferior del catálogo.
 * Soporta imagen estática O video (autoplay, muted, loop).
 *
 * Para festividades simplemente cambia los campos:
 *
 * Día de la Madre (mayo):
 *   eyebrow: 'Día de la Madre · 11 de Mayo'
 *   headline: 'EL REGALO\nPERFECTO'
 *   sub: 'Sorprende a mamá con una botella especial. Entrega en 30 minutos.'
 *
 * Día del Padre (junio):
 *   eyebrow: 'Día del Padre · 15 de Junio'
 *   headline: 'PARA EL\nPAPÁ ESPECIAL'
 *
 * Navidad / Año Nuevo:
 *   eyebrow: 'Temporada de Celebración'
 *   headline: 'BRINDA\nCON ESTILO'
 */

export const PROMO_BANNER = {
  eyebrow: 'Sin código requerido',
  headline: 'LLEVA 6,\nAHORRA 10%',
  sub: 'Cualquier combinación de botellas. Descuento automático en el carrito.',
  cta: 'Armar mi pack',
  href: '/catalog?sort=price_asc',

  // Imagen de fondo (siempre se usa de fallback)
  image:
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1600&h=360&q=80',

  // Video opcional — si se define, reemplaza la imagen (formato mp4 o webm)
  // Ejemplo: video: 'https://cdn.licorlab.com/promos/lleva6.mp4'
  video: null as string | null,

  // Colores del overlay (gradiente izquierda → derecha)
  gradient: 'from-[#e71f46]/95 via-[#e71f46]/80 to-[#e71f46]/50',
  ctaStyle: 'bg-white text-accent hover:bg-surface',
  textStyle: 'text-white',
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'
import ProductDetail from '@/components/product/ProductDetail'
import RelatedProducts from '@/components/product/RelatedProducts'
import { getProductBySlug, getRelatedProducts } from '@/lib/api/products'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Producto no encontrado — LicorLab' }
  }

  return {
    title: `${product.name} — LicorLab`,
    description: product.short_description ?? product.description,
    openGraph: {
      images: [product.image_url],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const related = await getRelatedProducts(product, 4)

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image_url,
    description: product.short_description ?? product.description,
    brand: { '@type': 'Brand', name: product.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'DOP',
      price: product.price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://licorlab.com/products/${product.slug}`,
      seller: { '@type': 'Organization', name: 'LicorLab' },
    },
  }

  return (
    <main className="min-h-screen bg-primary font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />
      <CartDrawer />

      <ProductDetail product={product} />
      <RelatedProducts products={related} />

      <Footer />
    </main>
  )
}

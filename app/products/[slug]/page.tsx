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

  return (
    <main className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />

      <ProductDetail product={product} />
      <RelatedProducts products={related} />

      <Footer />
    </main>
  )
}

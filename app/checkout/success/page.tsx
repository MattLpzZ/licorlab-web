'use client'

export const dynamic = 'force-static'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order') || 'LL-XXXXXXXX'

  return (
    <div className="min-h-screen bg-primary font-body flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle
        size={64}
        className="text-accent mb-8"
        strokeWidth={1.5}
      />

      <h1 className="font-heading text-5xl text-text-1 mb-4">
        ¡Pedido confirmado!
      </h1>

      <p className="font-heading text-2xl text-accent mb-6">{orderId}</p>

      <p className="text-text-2 max-w-md leading-relaxed mb-10">
        Recibirás una confirmación en tu email. Te contactaremos pronto para
        coordinar la entrega.
      </p>

      <Link
        href="/"
        className="bg-accent hover:bg-accent-light text-primary px-8 py-4 font-medium transition-colors rounded-sm"
      >
        Seguir comprando
      </Link>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <p className="text-text-2">Cargando...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

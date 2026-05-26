'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import CartDrawer from '@/components/layout/CartDrawer'
import { useCartStore } from '@/store/cartStore'
import { submitOrder } from '@/lib/api/orders'

const schema = z
  .object({
    customer_name: z.string().min(2, 'Nombre requerido'),
    customer_phone: z.string().min(7, 'Teléfono inválido'),
    customer_email: z.string().email('Email inválido'),
    delivery_method: z.enum(['delivery', 'pickup']),
    delivery_address: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine((d) => !(d.delivery_method === 'delivery' && !d.delivery_address), {
    message: 'Dirección requerida para entrega',
    path: ['delivery_address'],
  })

type FormValues = z.infer<typeof schema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { delivery_method: 'delivery' },
  })

  const deliveryMethod = watch('delivery_method')
  const total = getTotal()

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/')
    }
  }, [items.length, router])

  async function onSubmit(data: FormValues) {
    setSubmitError(null)
    try {
      const confirmation = await submitOrder({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_email: data.customer_email,
        delivery_method: data.delivery_method,
        delivery_address: data.delivery_address ?? '',
        notes: data.notes,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          quantity: i.quantity,
          unit_price: i.product.price,
        })),
        subtotal: total,
        total,
      })

      clearCart()
      router.push(`/checkout/success?order=${confirmation.order_id}`)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Error al procesar la orden'
      )
    }
  }

  const inputClass =
    'w-full bg-surface border border-border text-text-1 px-4 py-3 rounded-sm focus:outline-none focus:border-accent placeholder-text-3 transition-colors'
  const labelClass = 'block text-text-2 text-sm mb-2'
  const errorClass = 'text-red-400 text-xs mt-1'

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-heading text-4xl text-text-1 mb-10">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Form — 60% */}
            <div className="flex-[3] space-y-6">
              {/* Contact */}
              <div className="bg-surface border border-border p-6 rounded-sm space-y-4">
                <h2 className="font-heading text-xl text-text-1 mb-2">
                  Información de contacto
                </h2>

                <div>
                  <label className={labelClass}>Nombre completo</label>
                  <input
                    {...register('customer_name')}
                    placeholder="Juan Pérez"
                    className={inputClass}
                  />
                  {errors.customer_name && (
                    <p className={errorClass}>{errors.customer_name.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Teléfono</label>
                  <input
                    {...register('customer_phone')}
                    placeholder="809-000-0000"
                    type="tel"
                    className={inputClass}
                  />
                  {errors.customer_phone && (
                    <p className={errorClass}>{errors.customer_phone.message}</p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    {...register('customer_email')}
                    placeholder="juan@ejemplo.com"
                    type="email"
                    className={inputClass}
                  />
                  {errors.customer_email && (
                    <p className={errorClass}>{errors.customer_email.message}</p>
                  )}
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-surface border border-border p-6 rounded-sm space-y-4">
                <h2 className="font-heading text-xl text-text-1 mb-2">
                  Método de entrega
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                  {[
                    { value: 'delivery', label: 'Entrega a domicilio' },
                    { value: 'pickup', label: 'Recoger en tienda' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 flex-1 px-4 py-3 border rounded-sm cursor-pointer transition-colors ${
                        deliveryMethod === opt.value
                          ? 'border-accent bg-surface-2'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <input
                        {...register('delivery_method')}
                        type="radio"
                        value={opt.value}
                        className="accent-accent"
                      />
                      <span className="text-text-1 text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {/* Address — conditional */}
                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className={labelClass}>Dirección de entrega</label>
                    <input
                      {...register('delivery_address')}
                      placeholder="Av. Winston Churchill #123, Santo Domingo"
                      className={inputClass}
                    />
                    {errors.delivery_address && (
                      <p className={errorClass}>{errors.delivery_address.message}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="bg-surface border border-border p-6 rounded-sm">
                <label className={labelClass}>
                  Notas adicionales{' '}
                  <span className="text-text-3">(opcional)</span>
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Instrucciones especiales para la entrega..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {submitError && (
                <p className="text-red-400 text-sm bg-red-950/40 border border-red-800/40 px-4 py-3 rounded-sm">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent-light text-primary font-medium py-4 w-full rounded-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar pedido'}
              </button>
            </div>

            {/* Order summary — 40% */}
            <div className="flex-[2]">
              <div className="bg-surface border border-border p-6 rounded-sm sticky top-24">
                <h2 className="font-heading text-xl text-text-1 mb-6">
                  Resumen del pedido
                </h2>

                <ul className="space-y-4 mb-6">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between items-start gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-text-1 text-sm leading-snug line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-text-3 text-xs mt-0.5">
                          {item.product.brand}
                        </p>
                        <p className="text-text-2 text-xs mt-0.5">
                          x{item.quantity}
                        </p>
                      </div>
                      <span className="text-text-1 text-sm font-medium whitespace-nowrap">
                        RD$
                        {(item.product.price * item.quantity).toLocaleString(
                          'es-DO'
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-text-2 text-sm">Total</span>
                  <span className="font-heading text-2xl text-accent font-semibold">
                    RD${total.toLocaleString('es-DO')}
                  </span>
                </div>

                <p className="text-text-3 text-xs mt-4 leading-relaxed">
                  Te contactaremos para confirmar disponibilidad y coordinar el
                  pago antes de la entrega.
                </p>

                <Link
                  href="/catalog"
                  className="block text-center text-text-2 text-xs hover:text-accent transition-colors mt-4 underline underline-offset-2"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

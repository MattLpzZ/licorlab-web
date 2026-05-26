'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
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
    payment_method: z.enum(['card', 'transfer', 'cash'], {
      required_error: 'Selecciona un método de pago',
    }),
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

  // Promo code local state
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [cardNumber, setCardNumber] = useState('')

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
  const watchPayment = watch('payment_method')
  const total = getTotal()

  // Promo code logic
  function applyPromo() {
    if (promoCode.trim().toUpperCase() === 'LICORLAB10') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Código inválido')
      setPromoApplied(false)
    }
  }
  const discount = promoApplied ? Math.round(total * 0.1) : 0
  const finalTotal = total - discount

  // Card number formatting
  function formatCard(val: string) {
    return val
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim()
  }

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
        payment_method: data.payment_method,
        notes: data.notes,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          quantity: i.quantity,
          unit_price: i.product.price,
        })),
        subtotal: total,
        total: finalTotal,
      })

      clearCart()
      router.push(`/checkout/success?order=${confirmation.order_id}`)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Error al procesar la orden'
      )
    }
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-primary font-body">
      <Navbar />
      <CartDrawer />
      <main className="max-w-site mx-auto px-4 py-8 md:py-12">
        {/* Back link */}
        <Link
          href="/catalog"
          className="flex items-center gap-2 text-text-2 hover:text-text-1 text-sm font-ui mb-6 transition-colors"
        >
          <ChevronLeft size={16} /> Seguir comprando
        </Link>
        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-text-1 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* MOBILE: col, summary first. DESKTOP: row, form left (flex-[3]), summary right (flex-[2]) */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ORDER SUMMARY — shown top on mobile, right column on desktop */}
            <div className="lg:order-last flex-[2]">
              {/* sticky on desktop */}
              <div className="bg-surface border border-border rounded-xl p-6 lg:sticky lg:top-24">
                <h2 className="font-heading font-bold text-lg text-text-1 mb-5">
                  Resumen del pedido
                </h2>
                {/* items list */}
                <ul className="space-y-3 mb-5">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-text-1 text-sm font-ui font-medium leading-snug line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-text-3 text-xs mt-0.5">
                          {item.product.brand} · x{item.quantity}
                        </p>
                      </div>
                      <span className="text-text-1 text-sm font-ui font-semibold whitespace-nowrap">
                        RD$
                        {(item.product.price * item.quantity).toLocaleString(
                          'es-DO'
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                {/* totals */}
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm text-text-2">
                    <span>Subtotal</span>
                    <span>RD${total.toLocaleString('es-DO')}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600 font-ui font-medium">
                      <span>Descuento (LICORLAB10)</span>
                      <span>-RD${discount.toLocaleString('es-DO')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-text-2">
                    <span>Envío</span>
                    <span className="text-green-600 font-ui font-semibold">
                      Gratis
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="font-ui font-bold text-text-1">Total</span>
                    <span className="font-heading font-extrabold text-2xl text-accent">
                      RD${finalTotal.toLocaleString('es-DO')}
                    </span>
                  </div>
                </div>
                {/* secure badge */}
                <p className="text-text-3 text-[11px] text-center mt-5 flex items-center justify-center gap-1">
                  <span>🔒</span> Compra 100% segura · SSL cifrado
                </p>
              </div>
            </div>

            {/* FORM SECTIONS — left column */}
            <div className="flex-[3] space-y-5">
              {/* 01 — Contacto */}
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent text-xs font-ui font-bold">
                    01
                  </span>
                  <h2 className="font-heading font-bold text-lg text-text-1">
                    Información de contacto
                  </h2>
                </div>

                <div>
                  <label className="block text-text-2 text-sm mb-2">
                    Nombre completo
                  </label>
                  <input
                    {...register('customer_name')}
                    placeholder="Juan Pérez"
                    className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors font-ui text-sm"
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customer_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-text-2 text-sm mb-2">
                    Teléfono
                  </label>
                  <input
                    {...register('customer_phone')}
                    placeholder="809-000-0000"
                    type="tel"
                    className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors font-ui text-sm"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customer_phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-text-2 text-sm mb-2">
                    Email
                  </label>
                  <input
                    {...register('customer_email')}
                    placeholder="juan@ejemplo.com"
                    type="email"
                    className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors font-ui text-sm"
                  />
                  {errors.customer_email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.customer_email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 02 — Entrega */}
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent text-xs font-ui font-bold">
                    02
                  </span>
                  <h2 className="font-heading font-bold text-lg text-text-1">
                    Método de entrega
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {[
                    { value: 'delivery', label: 'Entrega a domicilio' },
                    { value: 'pickup', label: 'Recoger en tienda' },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 flex-1 px-4 py-3 border-2 rounded-xl cursor-pointer transition-colors ${
                        deliveryMethod === opt.value
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/40'
                      }`}
                    >
                      <input
                        {...register('delivery_method')}
                        type="radio"
                        value={opt.value}
                        className="accent-accent"
                      />
                      <span className="text-text-1 text-sm font-ui font-medium">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Address — conditional */}
                {deliveryMethod === 'delivery' && (
                  <div>
                    <label className="block text-text-2 text-sm mb-2">
                      Dirección de entrega
                    </label>
                    <input
                      {...register('delivery_address')}
                      placeholder="Calle Duarte #45, Puerto Plata"
                      className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors font-ui text-sm"
                    />
                    {errors.delivery_address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.delivery_address.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 03 — Código de promoción */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent text-xs font-ui font-bold">
                    03
                  </span>
                  <h2 className="font-heading font-bold text-lg text-text-1">
                    Código de descuento
                  </h2>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value.toUpperCase())
                      setPromoError('')
                    }}
                    placeholder="LICORLAB10"
                    className="flex-1 bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors font-ui text-sm uppercase"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="shrink-0 bg-text-1 text-white font-ui font-semibold text-sm px-5 py-3 rounded-lg hover:bg-[#333] transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-600 text-sm font-ui font-medium mt-2">
                    ✓ Código aplicado — 10% de descuento
                  </p>
                )}
                {promoError && (
                  <p className="text-red-500 text-sm mt-2">{promoError}</p>
                )}
              </div>

              {/* 04 — Método de pago */}
              <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent text-xs font-ui font-bold">
                    04
                  </span>
                  <h2 className="font-heading font-bold text-lg text-text-1">
                    Método de pago
                  </h2>
                </div>

                <div className="space-y-3">
                  {/* Card */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      watchPayment === 'card'
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/40'
                    }`}
                  >
                    <input
                      {...register('payment_method')}
                      type="radio"
                      value="card"
                      className="mt-0.5 accent-accent"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-ui font-semibold text-text-1 text-sm">
                          Tarjeta de crédito/débito
                        </span>
                        <div className="flex gap-1.5 text-[10px] font-bold">
                          <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded">
                            VISA
                          </span>
                          <span className="bg-red-500 text-white px-1.5 py-0.5 rounded">
                            MC
                          </span>
                          <span className="bg-green-600 text-white px-1.5 py-0.5 rounded">
                            AMEX
                          </span>
                        </div>
                      </div>
                      {watchPayment === 'card' && (
                        <div className="mt-4 space-y-3">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCard(e.target.value))
                            }
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 text-sm font-ui tracking-widest transition-colors"
                            maxLength={19}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 text-sm font-ui transition-colors"
                              maxLength={5}
                            />
                            <input
                              type="text"
                              placeholder="CVV"
                              className="bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 text-sm font-ui transition-colors"
                              maxLength={4}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Nombre en la tarjeta"
                            className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 text-sm font-ui transition-colors"
                          />
                          <p className="text-text-3 text-[11px] flex items-center gap-1">
                            🔒 Powered by Azul · Procesador certificado PCI DSS
                            en República Dominicana
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Bank transfer */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      watchPayment === 'transfer'
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/40'
                    }`}
                  >
                    <input
                      {...register('payment_method')}
                      type="radio"
                      value="transfer"
                      className="mt-0.5 accent-accent"
                    />
                    <div className="flex-1">
                      <span className="font-ui font-semibold text-text-1 text-sm">
                        Transferencia bancaria
                      </span>
                      {watchPayment === 'transfer' && (
                        <div className="mt-3 bg-surface-2 rounded-lg p-4 space-y-1.5">
                          <p className="text-text-1 text-sm font-ui font-semibold">
                            Banco Popular Dominicano
                          </p>
                          <p className="text-text-2 text-sm">
                            Cuenta Corriente:{' '}
                            <span className="text-text-1 font-semibold">
                              123-456789-0
                            </span>
                          </p>
                          <p className="text-text-2 text-sm">
                            Nombre:{' '}
                            <span className="text-text-1 font-semibold">
                              LicorLab SRL
                            </span>
                          </p>
                          <p className="text-text-2 text-sm">
                            Concepto:{' '}
                            <span className="text-text-1">
                              Tu número de orden (se enviará al confirmar)
                            </span>
                          </p>
                          <p className="text-accent text-xs font-ui mt-2">
                            Envía el comprobante por WhatsApp al +1 (809)
                            123-4567
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Cash */}
                  <label
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      watchPayment === 'cash'
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/40'
                    }`}
                  >
                    <input
                      {...register('payment_method')}
                      type="radio"
                      value="cash"
                      className="mt-0.5 accent-accent"
                    />
                    <div className="flex-1">
                      <span className="font-ui font-semibold text-text-1 text-sm">
                        Efectivo contra entrega
                      </span>
                      {watchPayment === 'cash' && (
                        <p className="text-text-2 text-sm mt-2">
                          Paga en efectivo al momento de la entrega. Nuestro
                          repartidor llevará cambio para billetes de hasta
                          RD$2,000.
                        </p>
                      )}
                    </div>
                  </label>
                </div>

                {errors.payment_method && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.payment_method.message ||
                      'Selecciona un método de pago'}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div className="bg-surface border border-border rounded-xl p-6">
                <label className="block text-text-2 text-sm mb-2">
                  Notas adicionales{' '}
                  <span className="text-text-3">(opcional)</span>
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Instrucciones especiales para la entrega..."
                  className="w-full bg-white border border-border text-text-1 px-4 py-3 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 placeholder-text-3 transition-colors resize-none text-sm"
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
                  {submitError}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent hover:bg-accent-light text-white font-ui font-bold text-sm uppercase tracking-[0.18em] rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed btn-pulse"
              >
                {isSubmitting
                  ? 'Procesando...'
                  : `Confirmar pedido · RD$${finalTotal.toLocaleString('es-DO')}`}
              </button>

              {/* Disclaimers */}
              <div className="text-center space-y-1.5 pb-4">
                <p className="text-text-3 text-[11px]">
                  🔒 Tus datos están protegidos con cifrado SSL de 256 bits
                </p>
                <p className="text-text-3 text-[11px]">
                  Este sitio vende bebidas alcohólicas. Al confirmar declaras
                  ser mayor de 18 años.
                </p>
                <p className="text-text-3 text-[11px]">
                  La venta de alcohol a menores está prohibida por la Ley 63-17
                  de República Dominicana.
                </p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

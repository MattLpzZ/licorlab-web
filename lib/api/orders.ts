import type { OrderPayload, OrderConfirmation } from '@/types'

export async function submitOrder(payload: OrderPayload): Promise<OrderConfirmation> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error ?? 'Error al procesar la orden')
  }

  return res.json()
}

export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { customAlphabet } from 'nanoid'
import type { OrderPayload } from '@/types'

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json()

    if (!body.customer_name || !body.customer_email || !body.items?.length) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    const order_id = `LL-${nanoid()}`
    const created_at = new Date().toISOString()

    const itemsRows = body.items
      .map(
        (i) =>
          `<tr><td style="padding:8px">${i.product_name}</td><td style="padding:8px">x${i.quantity}</td><td style="padding:8px">RD$${(i.unit_price * i.quantity).toLocaleString()}</td></tr>`
      )
      .join('')

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#111113;color:#F5F0E8;padding:32px">
        <h1 style="font-size:28px;color:#C9963F">LicorLab — Orden #${order_id}</h1>
        <p>Estimado/a <strong>${body.customer_name}</strong>,</p>
        <p>Recibimos tu pedido y te contactaremos pronto para confirmar.</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr style="border-bottom:1px solid #242220"><th style="padding:8px;text-align:left">Producto</th><th>Cant.</th><th>Precio</th></tr>
          ${itemsRows}
          <tr><td colspan="2" style="padding:8px;font-weight:bold">Total</td><td style="padding:8px;color:#C9963F;font-weight:bold">RD$${body.total.toLocaleString()}</td></tr>
        </table>
        <p><strong>Método:</strong> ${body.delivery_method === 'delivery' ? 'Entrega a domicilio' : 'Recoger en tienda'}</p>
        ${body.delivery_method === 'delivery' ? `<p><strong>Dirección:</strong> ${body.delivery_address}</p>` : ''}
        ${body.notes ? `<p><strong>Notas:</strong> ${body.notes}</p>` : ''}
        <p style="color:#9C9589;margin-top:32px">LicorLab · Santo Domingo, RD</p>
      </div>
    `

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await Promise.all([
        resend.emails.send({
          from: 'LicorLab <ordenes@licorlab.com>',
          to: body.customer_email,
          subject: `Confirmación de orden #${order_id} — LicorLab`,
          html,
        }),
        resend.emails.send({
          from: 'LicorLab Pedidos <ordenes@licorlab.com>',
          to: process.env.LICORLAB_OWNER_EMAIL ?? 'admin@licorlab.com',
          subject: `Nueva orden #${order_id} — ${body.customer_name} · RD$${body.total.toLocaleString()}`,
          html,
        }),
      ])
    }

    return NextResponse.json({ order_id, created_at }, { status: 201 })
  } catch (err) {
    console.error('[checkout]', err)
    return NextResponse.json(
      { error: 'Error al procesar la orden' },
      { status: 500 }
    )
  }
}

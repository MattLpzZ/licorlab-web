'use client'

import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/cn'

export default function Toast() {
  const { toasts, remove } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg pointer-events-auto',
            'min-w-[220px] max-w-[320px] text-sm font-ui animate-slide-up',
            t.type === 'success' && 'bg-green-600 text-white',
            t.type === 'error' && 'bg-red-600 text-white',
            t.type === 'info' && 'bg-text-1 text-white'
          )}
        >
          {t.type === 'success' && <CheckCircle size={15} className="shrink-0" />}
          {t.type === 'error' && <AlertCircle size={15} className="shrink-0" />}
          {t.type === 'info' && <Info size={15} className="shrink-0" />}
          <span className="flex-1 leading-snug">{t.message}</span>
          <button
            onClick={() => remove(t.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

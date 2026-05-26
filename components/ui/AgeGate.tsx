'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const STORAGE_KEY = 'licorlab-age-verified'

export default function AgeGate() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    if (!verified) setShow(true)
  }, [])

  function confirm() {
    localStorage.setItem(STORAGE_KEY, '1')
    setShow(false)
  }

  function deny() {
    window.location.href = 'https://www.google.com'
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
        <Image
          src="/LG-BLACK.svg"
          alt="LicorLab"
          width={120}
          height={30}
          className="h-8 w-auto mx-auto mb-6"
          priority
        />

        <h2 className="font-heading font-extrabold text-2xl text-text-1 mb-2">
          Verificación de edad
        </h2>
        <p className="text-text-2 text-sm font-ui mb-2">
          Este sitio vende bebidas alcohólicas.
        </p>
        <p className="text-text-2 text-sm font-ui mb-8">
          ¿Eres mayor de <span className="text-text-1 font-semibold">18 años</span>?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={confirm}
            className="w-full py-3.5 bg-accent text-white font-ui font-bold text-sm uppercase tracking-[0.15em] rounded-xl hover:bg-accent-light transition-colors"
          >
            Sí, soy mayor de 18
          </button>
          <button
            onClick={deny}
            className="w-full py-3.5 border border-border text-text-2 font-ui text-sm rounded-xl hover:border-text-2 transition-colors"
          >
            No, soy menor de edad
          </button>
        </div>

        <p className="text-text-3 text-[10px] mt-6 leading-relaxed">
          La venta de alcohol a menores está prohibida por la Ley 63-17 de República Dominicana.
        </p>
      </div>
    </div>
  )
}

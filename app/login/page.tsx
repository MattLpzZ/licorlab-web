'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoggedIn } = useAuthStore()
  const [tab, setTab] = useState<Tab>('login')
  const [error, setError] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Register fields
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')

  useEffect(() => {
    if (isLoggedIn()) router.replace('/account')
  }, [isLoggedIn, router])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!loginEmail.includes('@')) {
      setError('Ingresa un correo válido.')
      return
    }
    // Phase 1: accept any credentials, derive name from email prefix
    const name = loginEmail.split('@')[0].replace(/[._]/g, ' ')
    const capitalized = name.replace(/\b\w/g, (c) => c.toUpperCase())
    login({ name: capitalized, email: loginEmail })
    router.push('/account')
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!regName.trim()) { setError('Ingresa tu nombre.'); return }
    if (!regEmail.includes('@')) { setError('Ingresa un correo válido.'); return }
    if (regPassword.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    login({ name: regName.trim(), email: regEmail, phone: regPhone || undefined })
    router.push('/account')
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="max-w-site mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/">
            <Image src="/LG-BLACK.svg" alt="LicorLab" width={88} height={22} className="h-[22px] w-auto" />
          </Link>
          <Link href="/catalog" className="text-text-3 hover:text-text-1 text-sm font-ui transition-colors">
            Seguir comprando →
          </Link>
        </div>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex rounded-xl border border-border overflow-hidden mb-8">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-2.5 text-sm font-ui font-semibold transition-colors ${
                  tab === t
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text-2 hover:bg-surface-2'
                }`}
              >
                {t === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-500 font-ui mb-4 px-1">{error}</p>
          )}

          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-white font-ui font-semibold text-sm py-3 rounded-lg transition-colors mt-2"
              >
                Entrar
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  placeholder="Juan Pérez"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  placeholder="tu@correo.com"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Teléfono <span className="text-text-3 normal-case font-normal">(opcional)</span>
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+1 809 000 0000"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <div>
                <label className="block text-[11px] font-ui font-semibold text-text-3 uppercase tracking-widest mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-surface border border-border text-text-1 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-accent/50 placeholder-text-3"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-white font-ui font-semibold text-sm py-3 rounded-lg transition-colors mt-2"
              >
                Crear cuenta
              </button>
            </form>
          )}

          <p className="text-[11px] text-text-3 font-ui text-center mt-6 leading-relaxed">
            Al continuar aceptas nuestros{' '}
            <Link href="#" className="text-accent hover:underline">Términos de servicio</Link>
            {' '}y{' '}
            <Link href="#" className="text-accent hover:underline">Política de privacidad</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}

'use client'
import GoogleButton from '@/components/GoogleButton'
import { CredentialsButton } from '@/components/CredentialsButton'
import { useSession } from 'next-auth/react'
import { saveSession } from '@/utils/sessionHooks'

export default function Login() {
  const sessionContext = useSession()
  let isLogged = false
  const sessionData = sessionContext.data
  if (sessionContext.status === 'authenticated' && sessionData) {
    isLogged = true
    saveSession(sessionData)
    window.location.href = '/'
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="bg-neutral-50 shadow rounded-3xl p-10 w-96">
        <header className="mb-5">
          <h1 className="txt-900 text-2xl font-semibold mb-3">
            {isLogged
              ? `Bienvenido ${sessionData?.user?.first_name}`
              : 'Inicia sesión con tu cuenta'}
          </h1>
          <p className="text-sm font-normal">Nos da gusto verte de regreso</p>
        </header>
        <div className="mt-5">{!isLogged && <CredentialsButton />}</div>
        <div className="mt-5">{!isLogged && <GoogleButton />}</div>
      </figure>
      <a href="#" className="text-gray-500">
        Aviso de Privacidad
      </a>
    </main>
  )
}

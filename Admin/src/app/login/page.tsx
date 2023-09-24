'use client'
import { useSession } from 'next-auth/react'
import GoogleButton from '@/components/GoogleButton'

export default function Login() {
  const { data: session } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="bg-neutral-50 shadow rounded-3xl p-10 w-96">
        <header className="mb-5">
          <h1 className="txt-900 text-2xl font-semibold mb-3">
            {session
              ? `Bienvenido ${session?.user?.first_name}`
              : 'Inicia sesión con tu cuenta'}
          </h1>
          <p className="text-sm font-normal">Nos da gusto verte de regreso</p>
        </header>
        <div className="mt-5">{!session && <GoogleButton />}</div>
      </figure>
      <a href="#" className="text-gray-500">
        Aviso de Privacidad
      </a>
    </main>
  )
}

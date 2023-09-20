'use client'
import { signOut, useSession } from 'next-auth/react'
import { deleteTokens } from '@/utils/authUtils'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  const { data: session } = useSession()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="bg-neutral-50 shadow rounded-3xl p-10 w-96">
        <header className="mb-5">
          <h1 className="txt-900 text-2xl font-semibold mb-3">Home</h1>
          <p className="text-sm font-normal">
            {session ? `Bienvenido ${session?.user?.first_name}` : ''}
          </p>
        </header>
        <div className="mt-5">
          {session && session.user && (
            <button
              onClick={() => {
                signOut()
                deleteTokens()
              }}
              className="text-red-600"
            >
              Salir
            </button>
          )}
        </div>
      </figure>
    </main>
  )
}

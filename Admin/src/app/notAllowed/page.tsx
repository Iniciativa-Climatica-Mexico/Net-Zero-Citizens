'use client'

export default function notAllowed() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="bg-neutral-50 shadow rounded-3xl p-10 w-96">
        <header className="mb-5">
          <h1 className="txt-900 text-2xl font-semibold mb-3">
              No tienes permitido acceder a esta página
          </h1>
        </header>
        
      </figure>
    </main>
  )
}

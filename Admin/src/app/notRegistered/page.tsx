'use client'
import Image from 'next/image'

export default function notFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <figure className="bg-neutral-50 shadow rounded-3xl p-10 w-96 flex flex-col items-center">
        <header className="mb-5">
          <h1 className="txt-900 text-2xl font-semibold mb-3 text-center">
            No se ha encontrado tu cuenta o tus credenciales fueron incorrectas.
          </h1>
        </header>
        <Image
          src="/notAllowed.svg"
          alt="Not allowed Image"
          height="100"
          width="100"
        />
        <button
          onClick={() => (window.location.href = '/login')}
          className=" bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded mt-4 shadow-md"
        >
          Regresar a Inicio de Sesión
        </button>
      </figure>
    </main>
  )
}

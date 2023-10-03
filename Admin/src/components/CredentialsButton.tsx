'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Modal from 'react-modal'

export const CredentialsButton = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className="flex w-full justify-center gap-5 rounded bg-white px-4 text-sm font-bold drop-shadow-md hover:bg-gray-50 h-12 items-center rounded-4xl"
        onClick={() => setIsOpen(true)}
      >
        <span>Continuar con Credenciales</span>
      </button>

      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 'fit-content',
            minHeight: 'fit-content',
            maxWidth: '40rem',
          },
        }}
      >
        <input type="text" placeholder="Email" id="email" />
        <input type="password" placeholder="Password" id="passwordIn" />

        <button
          onClick={() => {
            const email = document.getElementById('email') as HTMLInputElement
            const password = document.getElementById('passwordIn') as HTMLInputElement
            console.log(
              email, password
            )
            const cred = {
              username: email.value,
              password: password.value,
            }
            console.log(cred)
            signIn('credentials', cred)
          }}
        >
          Iniciar Secion
        </button>
      </Modal>
    </>
  )
}

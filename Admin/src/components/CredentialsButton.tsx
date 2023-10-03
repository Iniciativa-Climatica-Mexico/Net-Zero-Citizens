'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Modal from 'react-modal'
import CloseIcon from '@mui/icons-material/Close'

export const CredentialsButton = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        className="flex w-full justify-center gap-5 rounded bg-white px-4 text-sm font-bold drop-shadow-md hover:bg-gray-50 h-12 items-center rounded-4xl"
        onClick={() => setIsOpen(true)}
      >
        <span>Iniciar Sesión</span>
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
            maxWidth: '40rem',
            height: 'fit-content',
            border: 'transparent',
            background: 'transparent',
          },
        }}
      >
        <div className="flex flex-col relative">
          <div className="flex justify-end w-50 pr-4 pb-2 self-end absolute top-4">
            <CloseIcon
              color="disabled"
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(false)
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-background border-[2px] border-gray-300 py-16 px-10 shadow-md">
            <input
              type="text"
              className="px-2 py-2 mb-3 rounded border border-solid border-gray-300 w-full h-11 min-w-xl focus:border-primary-700"
              placeholder="Email"
              id="email"
            />
            <input
              type="password"
              className="px-2 py-2 mb-3 rounded border border-gray-300 w-full h-11 focus:border-primary-700"
              placeholder="Password"
              id="passwordIn"
            />
            <button
              className=" bg-primary-base hover:bg-primary-900 text-white font-bold py-2 px-4 rounded mt-4 shadow-md"
              onClick={() => {
                const email = document.getElementById(
                  'email'
                ) as HTMLInputElement
                const password = document.getElementById(
                  'passwordIn'
                ) as HTMLInputElement
                const cred = {
                  username: email.value,
                  password: password.value,
                }
                signIn('credentials', cred)
              }}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

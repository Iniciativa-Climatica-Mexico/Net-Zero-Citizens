/**
 * Represents provisional navbar used in layout
 *
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../public/Logo.svg'
import { usePathname } from 'next/navigation'
import { deleteSession, refreshTokens } from '@/utils/sessionHooks'

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const [condition, setCondition] = useState(false)
  let created = false

  useEffect(() => {
    setCondition(true)

    if (!created) {
      created = true
      console.log('Creating interval')
      setInterval(refreshTokens, 1 * 60 * 60 * 1000) // 1 hour
    }
  }, [])

  const toggleMobileMenu = () => {
    if (!mobileMenuVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    setMobileMenuVisible((prev) => !prev)
  }

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  if (pathname === '/login' || pathname === '/notAllowed') {
    return <></>
  }

  return (
    <>
      {condition && (
        <nav className="bg-white border-b border-[#C1C9D2] dark:bg-gray-900 w-full h-17">
          <div className="flex flex-wrap justify-between items-center mx-auto px-4 py-1 mt-2 font-bold">
            <div className="flex items-center space-x-4">
              <Image
                src={Logo}
                alt="Green Circle"
                width={46}
                height={46}
                className="inline-block w-10 h-10 mr-2"
              />
              <span className="flex text-base whitespace-nowrap dark:text-white">
                Green Circle
              </span>
            </div>
            {/* Desktop navigation */}
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex items-center flex-col px-4 py-1 md:p-0 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
                <li>
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                    aria-current="page"
                  >
                    Proovedores
                  </a>
                </li>
                <li>
                  <a
                    href="/encuestas"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                  >
                    Encuestas
                  </a>
                </li>
                <li>
                  <a
                    href="/usuarios"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                  >
                    Usuarios
                  </a>
                </li>
                <li>
                  <a
                    href="/quejas"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent no-underline"
                  >
                    Quejas
                  </a>
                </li>
                <li>
                  <div>
                    <Image
                      src={Logo}
                      alt="Green Circle"
                      width={40}
                      height={40}
                      className="mr-2 rounded-full"
                    />
                  </div>
                </li>
                <li>
                  <div>
                    {session && session.user && (
                      <button
                        onClick={() => {
                          signOut()
                          deleteSession()
                        }}
                        className="text-red-600"
                      >
                        Salir
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
            {/* Mobile navigation */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`text-gray-900 dark:text-white transition-transform ease-in-out duration-200 ${
                  mobileMenuVisible ? 'rotate-90' : ''
                }`}
              >
                ☰
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuVisible && (
            <div className="md:hidden fixed top-17 right-0 h-screen w-48 bg-white border-l border-[#C1C9D2] dark:bg-gray-800 overflow-auto transform transition-transform ease-in-out duration-200 z-10">
              <ul className="flex flex-col py-4">
                <li className="border-b border-[#C1C9D2] border-opacity-50">
                  <a
                    href="/"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white"
                  >
                    Proovedores
                  </a>
                </li>
                <li className="border-b border-[#C1C9D2] border-opacity-50">
                  <a
                    href="/encuestas"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white"
                  >
                    Encuestas
                  </a>
                </li>
                <li className="border-b border-[#C1C9D2] border-opacity-50">
                  <a
                    href="/usuarios"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white"
                  >
                    Usuarios
                  </a>
                </li>
                <li className="border-b border-[#C1C9D2] border-opacity-50">
                  <a
                    href="/quejas"
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white"
                  >
                    Quejas
                  </a>
                </li>
                <li className="border-b border-[#C1C9D2] border-opacity-50">
                  <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 dark:text-white">
                    {session && session.user && (
                      <button
                        onClick={() => {
                          signOut()
                          deleteSession()
                        }}
                        className="text-red-600"
                      >
                        Salir
                      </button>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
    </>
  )
}

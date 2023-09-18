import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '../components/Providers'
const inter = Inter({ subsets: ['latin'] })
import { cookies } from 'next/headers'
import { ClientCookiesProvider } from '../components/CookiesProvider'


export const metadata: Metadata = {
  title: 'Green Circle Admin',
  description: 'Admin Dashboard for Green Circle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <Providers>
            {children}
          </Providers>
        </ClientCookiesProvider>
      </body>  
    </html>
  )
}

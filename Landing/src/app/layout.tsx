import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

const lato = Lato({ weight: ['400', '700'], subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Green Circle App - Iniciativa Climática de México',
  description: 'Iniciativa Climática de México',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={lato.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

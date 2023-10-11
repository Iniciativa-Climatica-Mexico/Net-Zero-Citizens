import ICMLogo from '@public/images/ICM-logo.png'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='w-full flex flex-col md:flex-row justify-between items-center px-6 py-1 border-t-2 border-gray-200 text-xs'>
      <div className='flex justify-center items-center gap-2'>
        <Image src={ICMLogo} alt="logo" className='w-12' />
        <p className='font-bold text-[#4365a0]'>Iniciativa Climática de México</p>
      </div>
      <p>Todos los derechos reservados ©2023</p>
    </footer>
  )
}
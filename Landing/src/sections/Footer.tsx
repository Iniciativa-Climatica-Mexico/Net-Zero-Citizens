import ICMLogo from '@public/images/ICM-logo.png'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className='w-full mt-12 flex flex-col md:flex-row justify-between items-center py-5 lg:py-3 lg:px-12 border-t-2 border-gray-200 text-xs'>
      <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
        <Image src={ICMLogo} alt="logo" className='w-24 lg:w-12' />
        <p className='font-bold text-[#4365a0] hidden lg:block'>Iniciativa Climática de México</p>
      </div>
      <p className='mt-5 lg:my-0'>Todos los derechos reservados ©2023</p>
    </footer>
  )
}
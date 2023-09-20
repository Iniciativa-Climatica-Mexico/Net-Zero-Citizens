/**
 * Represents a hero section component.
 *
 * @component
 * @example
 * ```tsx
 * <Hero />
 * ```
 */

import GreenTriangleSVG from '@/components/GreenTriangle'
import StoreButton from '@/components/StoreButton'
import PhoneMockup from '@public/images/phoneMockup.png'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="flex flex-col items-center w-full text-center lg:flex-row lg:items-start lg:max-h-[85vh]">
      <div className="absolute w-full overflow-x-hidden top-0 -z-30">
        <GreenTriangleSVG />
      </div>
      <article className="relative flex flex-col items-center gap-5 py-10 px-12 lg:gap-10 lg:px-40 lg:py-28 lg:w-full lg:text-left lg:items-start">
        <h1 className="font-bold text-[3rem] leading-[3rem] lg:text-[5.5rem] lg:leading-[5.5rem] lg:max-w-4xl relative">
          Ilumina tu camino solar
        </h1>
        <p className="text-lg">
          ¡Conéctate con proveedores y desata el potencial del sol!
        </p>
        {/* TODO: CHANGE STORE BUTTON FOR A REAL ONE */}
        {/* STORE BUTTONS */}
        <StoreButton />
      </article>
      <Image
        src={PhoneMockup}
        alt="Phone mockup"
        className="w-full h-auto -mt-20 lg:w-[28%] lg:-mt-16 lg:mr-40"
        priority
        width={0}
        height={0}
        sizes="100vw"
      />
    </section>
  )
}

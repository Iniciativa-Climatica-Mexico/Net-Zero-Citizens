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
import PhoneMockup from '@public/images/phoneMockup.png'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="flex flex-col items-center w-full text-center lg:flex-row lg:items-start lg:max-h-[85vh]">
      <div className="absolute w-full overflow-x-hidden top-0 -z-30">
        <GreenTriangleSVG />
      </div>
      <article className="relative flex flex-col items-center gap-5 py-10 px-12 lg:gap-10 lg:px-40 lg:py-28 lg:w-full lg:text-left lg:items-start">
        <h1 className="font-bold text-[2.5rem] leading-[3rem] lg:text-[4.5rem] lg:leading-[4.5rem] lg:max-w-4xl relative">
          Descarboniza tu vida y protege tu futuro
        </h1>
        <p className="text-lg">
          ¡Conecta con proveedores de energía solar fácilmente para que
          experimentes la independencia energética!
        </p>
        <a
          href="https://www.iniciativaclimatica.org/wp-content/uploads/android/app-release.apk"
          target="_blank"
          className="bg-primary-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Descargar para Android
        </a>
      </article>
      <Image
        src={PhoneMockup}
        alt="Phone mockup"
        className="w-4/6 h-auto -mt-12 lg:w-[23%] lg:-mt-10 lg:mr-52"
        priority
        width={0}
        height={0}
        sizes="100vw"
      />
    </section>
  )
}

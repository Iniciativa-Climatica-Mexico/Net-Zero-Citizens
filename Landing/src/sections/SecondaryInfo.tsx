import Image from 'next/image'
import CatalogueScreen from '@public/images/catalogue-screen.jpg'
import MapScreen from '@public/images/map-screen.jpg'
import ReviewScreen from '@public/images/review-screen.jpg'

export default function SecondaryInfo() {
  return (
    <section className="px-8 py-12 w-full text-primary-black lg:px-40">
      <article className="flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-left lg:max-w-md">
            <h2 className="font-semibold text-3xl">
              Acceso directo a proveedores confiables
            </h2>
            <p className='mt-10'>
              Obtén acceso rápido y directo a una red verificada de proveedores
              de paneles solares de alta calidad.
            </p>
          </div>
          <div className="flex justify-center mx-12 mt-10 items-start overflow-hidden lg:max-w-[30rem] h-80 rounded-lg shadow-lg">
            <Image
              className='object-cover -mt-6 lg:-mt-24'
              src={CatalogueScreen}
              alt="Catálogo de proveedores"
            />
          </div>
        </div>

        <div className="flex flex-col mt-12 lg:flex-row justify-between items-center">
          <div className="flex order-2 lg:order-1 justify-center mx-12 mt-10 items-start overflow-hidden max-w-[30rem] h-80 rounded-lg shadow-lg">
            <Image
              className='object-cover -mt-6 lg:-mt-24'
              src={MapScreen}
              alt="Mapa de proveedores"
            />
          </div>
          <div className="text-left lg:max-w-md  order-1 lg:order-2">
            <h2 className="font-semibold text-3xl">
              Variedad de opciones
            </h2>
            <p className='mt-10'>
              Explora una amplia gama de paneles y calentadores solares para
              encontrar la solución perfecta para tu hogar o negocio.
              
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-12 lg:flex-row justify-between items-center">
          <div className="text-left lg:max-w-md">
            <h2 className="font-semibold text-3xl">
              Contribuye al medio ambiente
            </h2>
            <p className='mt-10'>
              Al optar por la energía solar, estás ayudando a reducir tu huella
              de carbono y a cuidar el medio ambiente.
            </p>
          </div>
          <div className="flex justify-center mx-12 mt-10 items-start overflow-hidden max-w-[30rem] h-80 lg:h-[28rem] rounded-lg shadow-lg">
            <Image
              className='object-cover -mt-6 lg:-mt-24'
              src={ReviewScreen}
              alt="Reviews"
            />
          </div>
        </div>
      </article>
    </section>
  )
}

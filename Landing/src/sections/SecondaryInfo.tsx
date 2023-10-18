import Image from 'next/image'
import CatalogueScreen from '@public/images/catalogue-screen.jpg'
import MapScreen from '@public/images/map-screen.jpg'
import ReviewScreen from '@public/images/review-screen.jpg'

export default function SecondaryInfo() {
  return (
    <section className="px-8 py-12 w-full text-primary-black lg:px-40 flex justify-center items-center">
      <article className="flex flex-col w-full lg:w-11/12">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-left lg:max-w-md">
            <h2 className="font-semibold text-3xl">
              Acceso directo a proveedores certificados
            </h2>
            <p className="mt-10">
              Obtén acceso rápido y directo a un catálogo verificado de
              proveedores de paneles solares de alta calidad.
            </p>
          </div>
          <Image
            className="object-cover m-9 w-5/6 lg:max-w-sm rounded-lg shadow-lg"
            src={CatalogueScreen}
            alt="Catálogo de proveedores"
            width={800}
            height={800}
          />
        </div>

        <div className="flex flex-col mt-12 lg:mt-7 lg:flex-row justify-between items-center">
          <Image
            className="object-cover m-9 w-5/6 lg:max-w-sm rounded-lg shadow-lg order-2 lg:order-1"
            src={MapScreen}
            alt="Mapa de proveedores"
            width={800}
            height={800}
          />
          <div className="text-left lg:max-w-md  order-1 lg:order-2">
            <h2 className="font-semibold text-3xl">Variedad de opciones</h2>
            <p className="mt-10">
              ¡Explora a tus proveedores cercanos y escoge la mejor opción!
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-12 lg:mt-7 lg:flex-row justify-between items-center">
          <div className="text-left lg:max-w-md">
            <h2 className="font-semibold text-3xl">
              Contribuye al medio ambiente
            </h2>
            <p className="mt-10">
              Al optar por la energía solar, estás ayudando a reducir tu huella
              de carbono y a cuidar el medio ambiente.
            </p>
          </div>
          <Image
            className="object-cover mt-12 lg:mt-7 w-5/6 lg:max-w-sm rounded-lg shadow-lg"
            src={ReviewScreen}
            alt="Reviews"
            width={800}
            height={800}
          />
        </div>
      </article>
    </section>
  )
}

import Image from 'next/image'

export default function SecondaryInfo() {
  return (
    <section className="px-8 py-12 w-full text-primary-black lg:px-40">
      <article className="lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col">
          <div className="text-left">
            <h2 className="font-semibold text-3xl">
              Acceso directo a proveedores confiables
            </h2>
            <p>
              Obtén acceso rápido y directo a una red verificada de proveedores
              de paneles solares de alta calidad.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/phoneMockup.png"
              alt="Phone Mockup"
              width={150}
              height={150}
              id="img1"
            />
          </div>
          <div className="text-right lg:text-left">
            <h2 className="font-semibold text-3xl">Variedad de opciones</h2>
            <p>
              Explora una amplia gama de paneles y calentadores solares para
              encontrar la solución perfecta para tu hogar o negocio.
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-center">
            <Image
              src="/images/phoneMockup.png"
              alt="Phone Mockup"
              width={150}
              height={150}
            />
          </div>
          <div className="text-left lg:text-right">
            <h2 className="font-semibold text-3xl">
              Contribuye al medio ambiente
            </h2>
            <p>
              Al optar por la energía solar, estás ayudando a reducir tu huella
              de carbono y a cuidar el medio ambiente.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/phoneMockup.png"
              alt="Phone Mockup"
              width={150}
              height={150}
            />
          </div>
        </div>
      </article>
    </section>
  )
}

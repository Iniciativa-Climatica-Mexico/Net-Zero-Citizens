import Image from 'next/image'

export default function SecondaryInfo() {
  return (
    <section className="px-8 py-32 w-full text-primary-black lg:px-40">
      <article className="lg:flex">
        <div>
          <h2 className="text-3xl font-semibold">
            Contribuye al medio ambiente
          </h2>
          <p>
            Al optar por la energía solar, estás ayudando a reducir tu huella de
            carbono y a cuidar el medio ambiente.
          </p>
        </div>
        <Image
          src="/images/phoneMockup.png"
          width={500}
          height={500}
          alt="phone mockup"
        />
      </article>
      <article>
        <div>
          <h2 className="text-3xl font-semibold">
            Contribuye al medio ambiente
          </h2>
          <p>
            Al optar por la energía solar, estás ayudando a reducir tu huella de
            carbono y a cuidar el medio ambiente.
          </p>
        </div>
        <Image
          src="/images/phoneMockup.png"
          width={500}
          height={500}
          alt="phone mockup"
        />
      </article>
      <article>
        <div>
          <h2 className="text-3xl font-semibold">
            Contribuye al medio ambiente
          </h2>
          <p>
            Al optar por la energía solar, estás ayudando a reducir tu huella de
            carbono y a cuidar el medio ambiente.
          </p>
        </div>
        <Image
          src="/images/phoneMockup.png"
          alt="phone mockup"
          className="w-full h-auto"
          width={0}
          height={0}
          sizes="100vw"
        />
      </article>
    </section>
  )
}

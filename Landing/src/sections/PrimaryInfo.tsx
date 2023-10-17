/**
 * Represents a primary info section component.
 *
 * @component
 * @example
 * ```tsx
 * <PrimaryInfo />
 * ```
 */

import PeopleIcon from '@public/svg/peopleIcon.svg'
import StarIcon from '@public/svg/starIcon.svg'

export default function PrimaryInfo() {
  return (
    <section className="bg-primary-blue px-8 py-32 w-full text-center text-primary-white lg:px-40">
      <article className="flex flex-col gap-28 lg:flex-row lg:gap-44">
        <div className="flex flex-col items-center gap-5 w-full">
          <StarIcon />
          <h2 className="text-3xl font-semibold">
            Protege el clima y tus finanzas
          </h2>
          <p>
            Optar por energía solar, tanto para la electricidad como para
            calentar agua, es de las acciones más importantes que puedes tomar
            en casa para proteger el clima, el medio ambiente y tu futuro. La
            energía renovable es la manera más inteligente de proteger tu
            economía ante la ineludible inflación de los precios de la energía.
          </p>
          <p>
            Protege tu futuro financiero y el de tu familia, para que te
            asegures de siempre tener recursos para mantener tu modo de vida,
            libre de cualquier dependencia a la falible red eléctrica.
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <PeopleIcon />
          <h2 className="text-3xl font-semibold">¿Cómo funciona?</h2>
          <p>
            A través de GreenCircle puedes explorar los distintos productos y
            servicios de energía solar para acercarte a la descarbonización y
            que ayudes al medio ambiente.
          </p>
        </div>
      </article>
    </section>
  )
}

import PeopleIcon from '@public/svg/peopleIcon.svg';
import StarIcon from '@public/svg/starIcon.svg';

export default function PrimaryInfo() {
  return (
    <section className="bg-primary-blue px-8 py-36 w-full">
      <article className="flex flex-col gap-28 lg:flex-row">
        <div className="flex flex-col items-center text-center text-primary-white">
          <StarIcon />
          <h2 className=" text-3xl font-semibold py-8">
            ¿Qué puedes hacer?
          </h2>
          <p>
            GreenCircle es una aplicación donde conectamos de manera
            efectiva a proveedores comprometidos con la sostenibilidad
            ambiental con consumidores conscientes, que desean tomar
            decisiones de compra más responsables.
          </p>
        </div>
        <div className="flex flex-col items-center text-center text-primary-white">
          <PeopleIcon />
          <h2 className="text-3xl font-semibold py-8">
            ¿Cómo funciona?
          </h2>
          <p>
            A través de GreenCircle los usuarios pueden explorar una
            amplia variedad de productos y servicios ofrecidos por
            proveedores que comparten su compromiso con la
            conservación del medio ambiente.
          </p>
        </div>
      </article>
    </section>
  );
}

export default function PrimaryInfo() {
  return (
    <section className="bg-primary-blue p-8">
      <div className="flex flex-row">
        <div className="basis-1/2 px-20 text-center text-primary-white">
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
        <div className="basis-1/2 px-20 text-center text-primary-white">
          <h2 className=" text-3xl font-semibold py-8">
            ¿Cómo funciona?
          </h2>
          <p>
            A través de GreenCircle los usuarios pueden explorar una
            amplia variedad de productos y servicios ofrecidos por
            proveedores que comparten su compromiso con la
            conservación del medio ambiente.
          </p>
        </div>
      </div>
    </section>
  );
}

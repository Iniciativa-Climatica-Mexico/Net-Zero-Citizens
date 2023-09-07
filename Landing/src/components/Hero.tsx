import GreenTriangle from '@public/svg/greenTriangle.svg';
import PhoneMockup from '@public/images/phoneMockup.png';
import AppStoreThumb from '@public/images/appStoreThumb.png';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-[90vh] text-center">
      <div className="absolute w-full overflow-x-hidden top-0">
        <GreenTriangle className="w-[120vmax] lg:w-[110%]" />
      </div>
      <div className="relative flex flex-col gap-5 py-10 px-12">
        <h1 className="font-bold text-[3rem] relative leading-[3rem]">
          Ilumina tu camino solar
        </h1>
        <p className="relative">
          ¡Conéctate con proveedores y desata el potencial del sol!
        </p>
      </div>
      <Image
        src={PhoneMockup}
        alt="Phone mockup"
        className="relative z-10"
        height={300}
        width={300}
      />
    </section>
  );
}

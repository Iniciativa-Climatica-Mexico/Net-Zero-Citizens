import Image from 'next/image';
import Navbar from '@/components/Nabvar';
import GreenTriangle from '../../public/svg/greenTriangle.svg';

export default function Home() {
  return (
    <section
      className="w-full h-full overflow-x-hidden text-center"
      id="hero"
    >
      <GreenTriangle className="w-[60rem] lg:w-[100rem] absolute" />
      <h1 className="font-bold text-5xl relative">
        Ilumina tu camino solar
      </h1>
      <p className="relative">
        ¡Conéctate con proveedores y desata el potencial del sol!
      </p>
    </section>
  );
}

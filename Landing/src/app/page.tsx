import Hero from '@/sections/Hero';
import PrimaryInfo from '@/sections/PrimaryInfo';
import GreenTriangleSVG from '@/components/GreenTriangle';
import PhoneMockup from '@public/images/phoneMockup.png';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Hero />
      <PrimaryInfo />
    </>
  );
}

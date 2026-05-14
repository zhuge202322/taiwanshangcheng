import Hero from '@/components/home/Hero';
import ThreePromises from '@/components/home/ThreePromises';
import Stats from '@/components/home/Stats';
import ExpertEndorse from '@/components/home/ExpertEndorse';
import IntlMaterials from '@/components/home/IntlMaterials';
import Safety from '@/components/home/Safety';
import Reviews from '@/components/home/Reviews';
import UserShowcase from '@/components/home/UserShowcase';
import ProductGrid from '@/components/home/ProductGrid';
import Media from '@/components/home/Media';
import Consult from '@/components/home/Consult';

export default function Home() {
  return (
    <>
      <Hero />
      <ThreePromises />
      <Stats />
      <ExpertEndorse />
      <IntlMaterials />
      <Safety />
      <Reviews />
      <UserShowcase />
      <ProductGrid />
      <Media />
      <Consult />
    </>
  );
}

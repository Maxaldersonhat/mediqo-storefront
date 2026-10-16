import Banner from '@/components/Banner';
import CategoryGrid from '../components/CategoryGrid';
import Catalogue from '../components/Catalogue';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="bg-[#F3F4FA]">
      <Banner />
      <CategoryGrid products={products} />
      <Catalogue products={products} />
    </main>
  );
}
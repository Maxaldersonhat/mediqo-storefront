import Banner from '@/components/Banner';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/api';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <Banner />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Shop our catalog</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">No products available right now.</p>
        )}
      </section>
    </main>
  );
}
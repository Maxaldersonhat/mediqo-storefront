'use client';

import { motion } from 'framer-motion';
import type { StoreProduct } from '@/lib/api';
import { iconFor } from '@/lib/categoryMeta';

export default function CategoryGrid({ products }: { products: StoreProduct[] }) {
  const counts = new Map<string, number>();
  for (const p of products) {
    if (!p.category) continue;
    counts.set(p.category.name, (counts.get(p.category.name) ?? 0) + 1);
  }
  const categories = Array.from(counts.entries()).map(([name, count]) => ({ name, count }));

  if (!categories.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0F3D3E]/70">Clinical Taxonomy</p>
      <h2 className="mt-1 text-2xl font-bold text-gray-900">Product Categories</h2>

      <div className="mt-5 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="min-w-[220px] shrink-0 rounded-2xl border border-[#E7E8F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:min-w-0 sm:shrink"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{iconFor(c.name)}</span>
              <span className="text-xs font-medium text-gray-400">{c.count}+ Items</span>
            </div>
            <h3 className="mt-3 font-semibold text-gray-900">{c.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mediqo.com';
  const products = await getProducts();
  return [
    { url: base, lastModified: new Date() },
    ...products.map((p) => ({ url: `${base}/product/${p.id}`, lastModified: new Date(p.updatedAt) })),
  ];
}
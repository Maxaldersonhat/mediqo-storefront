import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://shop.mediqosolutions.co.ke"
).replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map(
    (product) => ({
      url: `${SITE_URL}/product/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticPages, ...productPages];
}
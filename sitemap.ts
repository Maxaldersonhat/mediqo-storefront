import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://store.mediqosolutions.co.ke"
).replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/product/${product.id}/`,
      lastModified:
        product.updatedAt &&
        !Number.isNaN(Date.parse(product.updatedAt))
          ? product.updatedAt
          : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
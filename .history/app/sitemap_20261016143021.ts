import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://store.mediqosolutions.co.ke"
  ).replace(/\/+$/, "");

  const products = await getProducts();

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${base}/product/${product.id}`,
      lastModified: new Date(product.updatedAt),
    })),
  ];
}
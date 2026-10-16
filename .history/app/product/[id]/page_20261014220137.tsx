import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getProducts,
  getProduct,
  imageSrc,
} from "@/lib/api";

import AddToCartButton from "@/components/AddToCartButton";

interface Props {
  params: Promise<{ id: string }>;
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://store.mediqosolutions.co.ke"
).replace(/\/+$/, "");

// Only product IDs generated during build are available.
// Unknown IDs will not be generated on demand.
export const dynamicParams = false;

// Discover every product from the API during next build.
export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: String(product.id),
  }));
}

// Each product receives its own SEO title,
// description, canonical URL and Open Graph metadata.
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const img = imageSrc(product.imageUrl);

  const description =
    product.description ||
    `Explore ${product.name} at Mediqo Solutions Kenya.`;

  return {
    title: product.name,
    description,

    alternates: {
      canonical: `${SITE_URL}/product/${product.id}/`,
    },

    openGraph: {
      type: "website",
      title: product.name,
      description,
      url: `${SITE_URL}/product/${product.id}/`,
      images: img ? [{ url: img, alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  const img = imageSrc(product.imageUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: img ? [img] : undefined,
    sku: product.sku,
    offers:
      product.price == null
        ? undefined
        : {
            "@type": "Offer",
            url: `${SITE_URL}/product/${product.id}/`,
            priceCurrency: "KES",
            price: product.price,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-50">
          {img ? (
            <img
              src={img}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="mt-2 text-xl font-semibold text-gray-900">
            {product.price != null
              ? `KES ${product.price.toLocaleString()}`
              : "Price on request"}
          </p>

          {product.description && (
            <p className="mt-4 text-gray-600">
              {product.description}
            </p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}
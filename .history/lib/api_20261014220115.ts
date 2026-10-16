const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3000"
).replace(/\/+$/, "");

export interface StoreProduct {
  id: number;
  name: string;
  sku: string;
  description: string | null;
  price: number | null;
  inStock: boolean;
  imageUrl: string | null;
  category: { id: number; name: string } | null;
  updatedAt: string;
}

// Used by the storefront homepage and generateStaticParams.
export async function getProducts(): Promise<StoreProduct[]> {
  const res = await fetch(`${API_BASE}/api/products`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data.products)) {
    throw new Error("Unexpected products API response");
  }

  return data.products;
}

// Used by individual product pages and SEO metadata.
export async function getProduct(
  id: number
): Promise<StoreProduct | null> {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    cache: "force-cache",
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Failed to load product ${id}: ${res.status}`);
  }

  const data = await res.json();
  return data.product;
}

// Supports both relative and absolute image URLs.
export function imageSrc(path: string | null): string | null {
  if (!path) return null;

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE}/${path.replace(/^\/+/, "")}`;
}

// Checkout stays dynamic: called from the user's browser.
export async function createOrder(payload: {
  customerName: string;
  customerPhone: string;
  customerLocation?: string;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}): Promise<{ ref: string; total: number }> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Failed to place order");
  }

  return res.json();
}
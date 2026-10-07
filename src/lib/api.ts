import type { Product, Category } from '@/types/api';

const PRIMARY_BASE = process.env.BAZARDOR_API_PRIMARY || 'https://api.api-store.workers.dev/api/bazardor';
const FALLBACK_BASE = process.env.BAZARDOR_API_FALLBACK || 'https://api.abcz.workers.dev/api/bazardor';

async function fetchWithFallback<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const primaryUrl = `${PRIMARY_BASE}${endpoint}`;
  const fallbackUrl = `${FALLBACK_BASE}${endpoint}`;

  try {
    const res = await fetch(primaryUrl, options);
    if (!res.ok) {
      throw new Error(`Primary request failed with status: ${res.status}`);
    }
    const data: T = await res.json();
    return data;
  } catch {
    const res = await fetch(fallbackUrl, options);
    if (!res.ok) {
      throw new Error(`Fallback request failed with status: ${res.status}`);
    }
    const data: T = await res.json();
    return data;
  }
}

export async function getCategories(): Promise<Category[]> {
  return fetchWithFallback<Category[]>('/categories', {
    next: { revalidate: 3600 },
  });
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const query = categorySlug ? `?category=${encodeURIComponent(categorySlug)}` : '';
  return fetchWithFallback<Product[]>(`/products${query}`, {
    next: { revalidate: 300 },
  });
}

export async function getProductBySlug(identifier: string): Promise<Product | null> {
  const products = await getProducts();
  const match = products.find(
    (p) => p.slug === identifier || p.id.toString() === identifier
  );
  return match ?? null;
}

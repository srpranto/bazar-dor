import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types/api';

interface ProductGridProps {
  products: Product[];
  cardAccentVariant?: 'default' | 'riser' | 'faller';
}

export function ProductGrid({
  products,
  cardAccentVariant = 'default',
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.slug}
          product={product}
          accentVariant={cardAccentVariant}
        />
      ))}
    </div>
  );
}

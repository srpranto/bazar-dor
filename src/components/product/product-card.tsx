import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Product } from '@/types/api';
import { formatPriceBn, formatPercentageBn, formatUnitBn } from '@/lib/formatters';

interface ProductCardProps {
  product: Product;
  accentVariant?: 'default' | 'riser' | 'faller';
}

export function ProductCard({
  product,
  accentVariant = 'default',
}: ProductCardProps) {
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  const hoverBorderClass =
    accentVariant === 'riser'
      ? 'hover:border-red-300/90'
      : accentVariant === 'faller'
      ? 'hover:border-emerald-300/90'
      : 'hover:border-primary/40';

  const hoverTextClass =
    accentVariant === 'riser'
      ? 'group-hover:text-red-700'
      : accentVariant === 'faller'
      ? 'group-hover:text-emerald-700'
      : 'group-hover:text-primary';

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-border/80 shadow-xs hover:shadow-md ${hoverBorderClass} transition-all duration-200 cursor-pointer`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="h-12 w-12 sm:h-13 sm:w-13 lg:h-14 lg:w-14 rounded-2xl bg-muted/60 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-105 transition-transform shadow-2xs">
            {product.image}
          </div>
          <span
            className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-2xs ${
              isUp
                ? 'bg-red-50 text-red-700 border border-red-200/60'
                : isDown
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                : 'bg-gray-50 text-gray-700 border border-gray-200/60'
            }`}
          >
            {isUp ? (
              <TrendingUp className="h-3.5 w-3.5 stroke-[2.5]" />
            ) : isDown ? (
              <TrendingDown className="h-3.5 w-3.5 stroke-[2.5]" />
            ) : (
              <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
            )}
            <span>{formatPercentageBn(product.change.pct)}</span>
          </span>
        </div>

        <div className="mt-3.5 sm:mt-4">
          <h3
            className={`text-base sm:text-lg lg:text-xl font-extrabold text-foreground tracking-tight ${hoverTextClass} transition-colors`}
          >
            {product.nameBn}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
            {formatUnitBn(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-border/60 flex items-baseline justify-between">
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">আজকের দাম</span>
        <span className="text-base sm:text-lg lg:text-xl font-black text-foreground tracking-tight">
          {formatPriceBn(product.today)}
        </span>
      </div>
    </Link>
  );
}

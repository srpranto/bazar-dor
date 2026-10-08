import { getProducts } from '@/lib/api';
import { formatPriceBn, formatPercentageBn, formatUnitBn } from '@/lib/formatters';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export async function PriceTicker() {
  const products = await getProducts();
  const tickerItems = [...products, ...products];

  return (
    <div
      aria-label="আজকের দাম পরিবর্তনের তালিকা"
      className="w-full bg-secondary/40 border-y border-border/80 overflow-hidden py-2"
    >
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {tickerItems.map((p, idx) => {
          const isUp = p.change.dir === 'up';
          const isDown = p.change.dir === 'down';

          return (
            <Link
              key={`${p.slug}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 text-xs font-medium text-foreground/90 hover:text-primary transition-colors cursor-pointer select-none"
            >
              <span>{p.image}</span>
              <span className="font-semibold">{p.nameBn}</span>
              <span className="text-muted-foreground">
                {formatPriceBn(p.today)}/{formatUnitBn(p.unit).replace('প্রতি ', '')}
              </span>
              <span
                className={`inline-flex items-center gap-1 font-bold ${
                  isUp
                    ? 'text-red-600'
                    : isDown
                    ? 'text-emerald-600'
                    : 'text-gray-500'
                }`}
              >
                {isUp ? (
                  <TrendingUp className="h-3 w-3 stroke-[2.5]" />
                ) : isDown ? (
                  <TrendingDown className="h-3 w-3 stroke-[2.5]" />
                ) : (
                  <Minus className="h-3 w-3 stroke-[2.5]" />
                )}
                <span>{formatPercentageBn(p.change.pct)}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

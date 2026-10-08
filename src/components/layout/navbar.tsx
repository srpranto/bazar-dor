import Link from 'next/link';
import { Suspense } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getCategories } from '@/lib/api';
import { UserMenu } from '@/components/layout/user-menu';
import { CategoryNav } from '@/components/layout/category-nav';
import { PriceTicker } from '@/components/layout/price-ticker';
import { BanglaDateDisplay } from '@/components/layout/bangla-date-display';

export async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <ShoppingCart className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors truncate">
                বাজার দর
              </span>
              <BanglaDateDisplay className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate" />
            </div>
          </Link>

          <Suspense fallback={<div className="h-8 w-24 bg-muted/60 animate-pulse rounded-md" />}>
            <UserMenu />
          </Suspense>
        </div>

        <div className="border-t border-border/60">
          <Suspense fallback={<div className="h-10 w-full bg-muted/30 animate-pulse rounded-md my-1" />}>
            <CategoryNav categories={categories} />
          </Suspense>
        </div>
      </div>

      <PriceTicker />
    </header>
  );
}

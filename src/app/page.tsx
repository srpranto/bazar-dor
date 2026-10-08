import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getProducts } from '@/lib/api';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductSortSelect } from '@/components/product/product-sort-select';
import { toBengaliNumber } from '@/lib/formatters';
import { BanglaDateDisplay } from '@/components/layout/bangla-date-display';

interface HomePageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { sort } = await searchParams;
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  const sortedAllProducts = [...products];
  if (sort === 'price-asc') {
    sortedAllProducts.sort((a, b) => a.today - b.today);
  } else if (sort === 'price-desc') {
    sortedAllProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12 sm:space-y-16">
      <section className="relative overflow-hidden rounded-3xl bg-secondary/70 border border-border/80 p-5 sm:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-border text-xs font-semibold text-primary shadow-2xs">
              <BanglaDateDisplay />
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-xs sm:text-base text-muted-foreground max-w-xl leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base shadow-sm hover:bg-primary/90 transition-all cursor-pointer"
              >
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[280px] sm:max-w-[315px] flex items-center justify-center">
            <Image
              src="/bazar-hero.png"
              alt="বাজার দর"
              width={315}
              height={263}
              preload
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shadow-2xs">
            <TrendingUp className="h-4 w-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            আজ দাম বেড়েছে
          </h2>
        </div>
        <ProductGrid products={risers} cardAccentVariant="riser" />
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs">
            <TrendingDown className="h-4 w-4 stroke-[2.5]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            আজ দাম কমেছে
          </h2>
        </div>
        <ProductGrid products={fallers} cardAccentVariant="faller" />
      </section>

      <section id="সব-পণ্য" className="scroll-mt-40 sm:scroll-mt-48 lg:scroll-mt-52 space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              মোট {toBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>

          <ProductSortSelect />
        </div>

        <ProductGrid products={sortedAllProducts} />
      </section>
    </div>
  );
}

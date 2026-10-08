import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-react';
import { auth } from '@/lib/auth';
import { getProductBySlug } from '@/lib/api';
import { SummaryMetricCard } from '@/components/product/summary-metric-card';
import { MarketPriceTable } from '@/components/product/market-price-table';
import {
  formatPriceBn,
  formatPercentageBn,
  formatUnitBn,
} from '@/lib/formatters';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} এর আজকের বাজারদর | বাজার দর`,
    description: `${product.nameBn} এর আজকের দাম, সর্বনিম্ন ও সর্বাধিক বাজারদর এবং বিস্তারিত তথ্য।`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackURL=/product/${slug}&auth_redirect=1`);
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice =
    product.markets.length > 0
      ? Math.round(
          product.markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) /
            product.markets.length
        )
      : product.today;

  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';
  const changeSentence = isUp
    ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPercentageBn(product.change.pct)}`
    : isDown
    ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPercentageBn(product.change.pct)}`
    : 'গতকালের তুলনায় আজ দাম অপরিবর্তিত';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          হোম
        </Link>
        <span>&gt;</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <span>&gt;</span>
        <span className="text-foreground font-semibold">{product.nameBn}</span>
      </nav>

      <div className="rounded-3xl border border-border/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-muted/60 flex items-center justify-center text-3xl sm:text-4xl shadow-2xs">
            {product.image}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {product.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-foreground/80 pt-1">
              {changeSentence}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto p-4 sm:p-6 rounded-2xl bg-secondary/80 border border-border/80 shadow-2xs flex sm:block items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground block">আজকের দাম</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-foreground block my-0.5">
              {formatPriceBn(product.today)}
            </span>
            <span className="text-xs text-muted-foreground block sm:hidden">
              {formatUnitBn(product.unit)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground hidden sm:block">
              {formatUnitBn(product.unit)}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-xs font-bold mt-1 ${
                isUp ? 'text-red-700' : isDown ? 'text-emerald-700' : 'text-gray-700'
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
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          <SummaryMetricCard
            title="সর্বনিম্ন দাম"
            amount={formatPriceBn(minPrice)}
            subtitle="সবচেয়ে কম দামের বাজার"
            variant="green"
          />
          <SummaryMetricCard
            title="সর্বাধিক দাম"
            amount={formatPriceBn(maxPrice)}
            subtitle="সবচেয়ে বেশি দামের বাজার"
            variant="red"
          />
          <SummaryMetricCard
            title="গড় দাম"
            amount={formatPriceBn(avgPrice)}
            subtitle={`${formatUnitBn(product.unit)} এর হিসাবে`}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <MarketPriceTable markets={product.markets} />
        <div className="pt-2">
          <Link
            href={`/category/${product.category}`}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-border bg-white text-xs sm:text-sm font-bold text-foreground hover:bg-muted/40 hover:text-primary transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>সকল {product.categoryNameBn} পণ্য দেখুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

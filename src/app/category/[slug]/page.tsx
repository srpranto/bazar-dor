import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getProducts } from '@/lib/api';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductSortSelect } from '@/components/product/product-sort-select';
import { toBengaliNumber } from '@/lib/formatters';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    return {
      title: 'ক্যাটাগরি পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${cat.nameBn} এর আজকের দাম | বাজার দর`,
    description: `${cat.nameBn} ক্যাটাগরির সব পণ্যের আজকের দাম ও দামের পরিবর্তন।`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const categories = await getCategories();
  const currentCategory = categories.find((c) => c.slug === slug);

  if (!currentCategory) {
    notFound();
  }

  const categoryProducts = await getProducts(slug);

  if (categoryProducts.length === 0) {
    notFound();
  }

  const sortedProducts = [...categoryProducts];
  if (sort === 'price-asc') {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sort === 'price-desc') {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl">
            {currentCategory.icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {currentCategory.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              মোট {toBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
        </div>

        <ProductSortSelect />
      </div>

      <ProductGrid products={sortedProducts} />
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types/api';

interface CategoryNavProps {
  categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full overflow-x-auto py-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
        {categories.map((c) => {
          const isActive = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/70 text-foreground/80 hover:bg-muted hover:text-foreground'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

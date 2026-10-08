'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SortOption } from '@/types/api';

const sortOptions: readonly { value: SortOption; label: string }[] = [
  { value: 'default', label: 'ডিফল্ট' },
  { value: 'price-asc', label: 'দাম: কম থেকে বেশি' },
  { value: 'price-desc', label: 'দাম: বেশি থেকে কম' },
] as const;

export function ProductSortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'default';

  const activeOption =
    sortOptions.find((opt) => opt.value === currentSort) ?? sortOptions[0];

  const handleSelect = (val: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', val);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto h-10 px-3.5 rounded-xl border border-border/80 bg-white hover:bg-secondary/70 hover:border-primary/40 text-xs sm:text-sm font-semibold text-foreground shadow-2xs transition-all cursor-pointer outline-none group"
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground font-normal">সাজান:</span>
            <span className="font-bold text-foreground">{activeOption.label}</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-56 p-1.5 rounded-2xl border border-border/80 bg-white shadow-xl shadow-black/5"
      >
        {sortOptions.map((opt) => {
          const isSelected = opt.value === currentSort;
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-secondary text-primary font-bold'
                  : 'text-foreground hover:bg-secondary/60 hover:text-primary'
              }`}
            >
              <span>{opt.label}</span>
              {isSelected && <Check className="h-4 w-4 text-primary shrink-0 ml-2" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

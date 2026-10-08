import type { MarketPrice } from '@/types/api';
import { formatPriceBn, formatDecimalBn } from '@/lib/formatters';

interface MarketPriceTableProps {
  markets: MarketPrice[];
}

export function MarketPriceTable({ markets }: MarketPriceTableProps) {
  const sortedMarkets = [...markets].map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  })).sort((a, b) => a.avg - b.avg);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="bg-muted/60 text-xs font-bold text-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 sm:px-6">বাজার</th>
              <th className="px-4 py-3 sm:px-6">বিভাগ</th>
              <th className="px-4 py-3 sm:px-6 text-right">সর্বনিম্ন</th>
              <th className="px-4 py-3 sm:px-6 text-right">সর্বাধিক</th>
              <th className="px-4 py-3 sm:px-6 text-right">গড়</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {sortedMarkets.map((m, idx) => (
              <tr key={`${m.market}-${idx}`} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3.5 sm:px-6 font-semibold text-foreground">
                  {m.market}
                </td>
                <td className="px-4 py-3.5 sm:px-6 text-muted-foreground">
                  {m.division}
                </td>
                <td className="px-4 py-3.5 sm:px-6 text-right text-foreground font-medium">
                  {formatPriceBn(m.min)}
                </td>
                <td className="px-4 py-3.5 sm:px-6 text-right text-foreground font-medium">
                  {formatPriceBn(m.max)}
                </td>
                <td className="px-4 py-3.5 sm:px-6 text-right font-bold text-primary">
                  {formatDecimalBn(m.avg)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

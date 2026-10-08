interface SummaryMetricCardProps {
  title: string;
  amount: string;
  subtitle: string;
  variant?: 'green' | 'red' | 'default';
}

export function SummaryMetricCard({
  title,
  amount,
  subtitle,
  variant = 'default',
}: SummaryMetricCardProps) {
  const textColor =
    variant === 'green'
      ? 'text-green-700'
      : variant === 'red'
      ? 'text-red-700'
      : 'text-foreground';

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border/80 shadow-xs flex flex-col justify-between">
      <span className="text-xs sm:text-sm font-semibold text-muted-foreground">
        {title}
      </span>
      <div className="my-2">
        <span className={`text-2xl sm:text-3xl font-extrabold ${textColor}`}>
          {amount}
        </span>
      </div>
      <span className="text-xs text-muted-foreground/80">{subtitle}</span>
    </div>
  );
}

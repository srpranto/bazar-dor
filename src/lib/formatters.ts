import type { ProductUnit } from '@/types/api';

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(val: number | string): string {
  return String(val).replace(/\d/g, (d) => BENGALI_DIGITS[Number(d)] ?? d);
}

export function formatPriceBn(amount: number): string {
  const formatted = new Intl.NumberFormat('bn-BD').format(amount);
  return `${formatted} টাকা`;
}

export function formatDecimalBn(amount: number): string {
  const formatted = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} টাকা`;
}

export function formatPercentageBn(pct: number): string {
  const formatted = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(pct));
  return `${formatted}%`;
}

export function formatUnitBn(unit: ProductUnit): string {
  switch (unit) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return '';
  }
}

export function getBengaliDate(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('bn-BD', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);
}

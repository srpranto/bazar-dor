'use client';

import { useSyncExternalStore } from 'react';
import { getBengaliDate } from '@/lib/formatters';

let cachedDate = '';

function getDateSnapshot(): string {
  if (!cachedDate) {
    cachedDate = getBengaliDate();
  }
  return cachedDate;
}

function getServerSnapshot(): string {
  return '';
}

const emptySubscribe = () => () => {};

export function BanglaDateDisplay({ className }: { className?: string }) {
  const dateStr = useSyncExternalStore(
    emptySubscribe,
    getDateSnapshot,
    getServerSnapshot
  );

  if (!dateStr) {
    return <span className={className}>&nbsp;</span>;
  }

  return <span className={className}>{dateStr}</span>;
}

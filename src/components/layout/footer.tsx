import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
        <div>
          <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
            বাজার দর
          </Link>
          <span className="mx-2">—</span>
          <span>প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        </div>
        <div>
          <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
        </div>
      </div>
    </footer>
  );
}

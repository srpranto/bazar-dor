import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
      <div className="text-6xl sm:text-7xl">🧺</div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          এই নামে কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          আপনি যে পণ্যটি খুঁজছেন সেটি তালিকায় নেই বা সরানো হয়েছে।
        </p>
      </div>
      <div>
        <Button asChild size="lg" className="font-bold">
          <Link href="/">হোম পেজে ফিরে যান</Link>
        </Button>
      </div>
    </div>
  );
}

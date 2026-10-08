import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 sm:py-32 text-center space-y-6">
      <div className="text-6xl sm:text-7xl">🧺</div>
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
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

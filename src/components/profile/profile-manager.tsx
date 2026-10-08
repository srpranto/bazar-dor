'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileManagerProps {
  initialUser: {
    name: string;
    email: string;
  };
}

export function ProfileManager({ initialUser }: ProfileManagerProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initial = initialUser.name ? initialUser.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে।');
      router.push('/');
      router.refresh();
    } catch {
      setIsLoggingOut(false);
      toast.error('সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
    }
  };

  return (
    <Card className="border-border/80 shadow-xs overflow-hidden">
      <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-xs">
            {initial}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                {initialUser.name}
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-secondary text-secondary-foreground border border-border">
                সক্রিয়
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground font-latin">
              {initialUser.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60 w-full sm:w-auto">
          <Link
            href="/profile/update"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 h-9 px-3 sm:px-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <User className="h-4 w-4 shrink-0 text-primary-foreground/90" />
            <span>তথ্য পরিবর্তন করুন</span>
          </Link>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex-1 sm:flex-initial gap-1.5 sm:gap-2 h-9 px-3 sm:px-3.5 rounded-xl border-destructive/25 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer font-semibold text-xs sm:text-sm shadow-2xs whitespace-nowrap"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>{isLoggingOut ? 'লগআউট হচ্ছে…' : 'সাইন আউট'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

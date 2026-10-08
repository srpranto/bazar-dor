'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export function UserMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে।');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-16 bg-muted animate-pulse rounded-md" />
        <div className="h-8 w-16 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  if (session?.user) {
    const displayName = session.user.name || 'ব্যবহারকারী';
    const firstInitial = displayName.charAt(0).toUpperCase();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 sm:pr-2.5 py-1 rounded-full border border-border/80 bg-white/90 hover:bg-secondary/70 hover:border-primary/30 transition-all cursor-pointer outline-none shadow-2xs group shrink-0">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs group-hover:scale-105 transition-transform">
              {firstInitial}
            </div>
            <span className="hidden sm:inline-block text-xs sm:text-sm font-semibold text-foreground max-w-[100px] md:max-w-[130px] truncate group-hover:text-primary transition-colors">
              {displayName}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 sm:w-72 p-2 rounded-2xl border border-border/80 bg-white shadow-xl shadow-black/5"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="p-3 rounded-xl bg-secondary/70 border border-secondary-foreground/10 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                {firstInitial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-foreground truncate leading-snug">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground font-latin truncate leading-tight mt-0.5">
                  {session.user.email}
                </p>
                <span className="inline-flex items-center gap-1.5 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-primary border border-primary/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  সক্রিয় অ্যাকাউন্ট
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="my-1.5 bg-border/60" />

          <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer w-full group"
            >
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold">আমার প্রোফাইল</span>
                <span className="text-[11px] text-muted-foreground font-normal">অ্যাকাউন্টের বিবরণ ও সেটিংস</span>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-destructive hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive cursor-pointer transition-colors w-full group mt-0.5"
          >
            <div className="h-8 w-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center shrink-0 group-hover:bg-destructive group-hover:text-white transition-colors shadow-2xs">
              <LogOut className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold">সাইন আউট</span>
              <span className="text-[11px] text-destructive/70 font-normal">লগআউট করুন</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <Button variant="ghost" size="sm" asChild className="text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
        <Link href="/signin">সাইন ইন</Link>
      </Button>
      <Button size="sm" asChild className="text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9">
        <Link href="/signup">সাইন আপ</Link>
      </Button>
    </div>
  );
}

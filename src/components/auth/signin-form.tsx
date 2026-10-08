'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialAuthButtons } from '@/components/auth/social-auth-buttons';
import { toast } from 'sonner';

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toastTriggeredRef = useRef(false);

  useEffect(() => {
    if (searchParams.get('auth_redirect') === '1' && !toastTriggeredRef.current) {
      toastTriggeredRef.current = true;
      toast.error('বিস্তারিত দেখতে প্রথমে সাইন ইন করুন।');
    }
  }, [searchParams]);

  const callbackURL = searchParams.get('callbackURL') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('সঠিক ইমেইল ঠিকানা দিন।');
      return;
    }
    if (password.length < 8) {
      setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }

    setLoading(true);
    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।');
        toast.error('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।');
      } else {
        toast.success('সফলভাবে সাইন ইন হয়েছে।');
        router.push(callbackURL);
        router.refresh();
      }
    } catch {
      setError('লগইন প্রক্রিয়াটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।');
      toast.error('লগইন প্রক্রিয়াটি সম্পন্ন হয়নি। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-xs sm:text-sm rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-foreground">ইমেইল</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="font-latin"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-foreground">পাসওয়ার্ড</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full h-11 text-base font-bold">
          {loading ? 'অপেক্ষা করুন…' : 'সাইন ইন'}
        </Button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-border w-full absolute" />
        <span className="bg-white px-3 text-xs text-muted-foreground relative font-medium">অথবা</span>
      </div>

      <SocialAuthButtons />

      <div className="text-center text-xs sm:text-sm text-muted-foreground">
        <span>অ্যাকাউন্ট নেই? </span>
        <Link
          href={callbackURL !== '/' ? `/signup?callbackURL=${encodeURIComponent(callbackURL)}` : '/signup'}
          className="text-primary font-bold hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </div>
    </div>
  );
}

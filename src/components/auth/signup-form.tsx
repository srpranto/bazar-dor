'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SocialAuthButtons } from '@/components/auth/social-auth-buttons';
import { toast } from 'sonner';

export function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get('callbackURL') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError('নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
      return;
    }
    if (!email.trim()) {
      setError('সঠিক ইমেইল ঠিকানা দিন।');
      return;
    }
    if (password.length < 8) {
      setError('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }
    if (password !== confirmPassword) {
      setError('দুটি পাসওয়ার্ড মিলছে না।');
      return;
    }

    setLoading(true);
    try {
      const res = await signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
        toast.error('অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।');
      } else {
        toast.success('অ্যাকাউন্ট তৈরি হয়েছে! স্বাগতম।');
        router.push(callbackURL);
        router.refresh();
      }
    } catch {
      setError('অনুরোধটি সম্পন্ন হয়নি। একটু পরে আবার চেষ্টা করুন।');
      toast.error('অনুরোধটি সম্পন্ন হয়নি। একটু পরে আবার চেষ্টা করুন।');
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
          <label className="text-xs sm:text-sm font-semibold text-foreground">নাম</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            required
          />
        </div>

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

        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-semibold text-foreground">পাসওয়ার্ড নিশ্চিত করুন</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="আবার লিখুন"
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full h-11 text-base font-bold">
          {loading ? 'অপেক্ষা করুন…' : 'অ্যাকাউন্ট তৈরি করুন'}
        </Button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-border w-full absolute" />
        <span className="bg-white px-3 text-xs text-muted-foreground relative font-medium">অথবা</span>
      </div>

      <SocialAuthButtons />

      <div className="text-center text-xs sm:text-sm text-muted-foreground">
        <span>অ্যাকাউন্ট আছে? </span>
        <Link
          href={callbackURL !== '/' ? `/signin?callbackURL=${encodeURIComponent(callbackURL)}` : '/signin'}
          className="text-primary font-bold hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </div>
    </div>
  );
}

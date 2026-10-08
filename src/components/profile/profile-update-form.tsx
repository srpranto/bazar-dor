'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { updateUser } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { User, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileUpdateFormProps {
  initialUser: {
    name: string;
    email: string;
  };
}

export function ProfileUpdateForm({ initialUser }: ProfileUpdateFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialUser.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = name.trim();
  const isUnchanged = trimmedName === initialUser.name;
  const isEmpty = trimmedName.length === 0;
  const isTooShort = trimmedName.length > 0 && trimmedName.length < 2;
  const canSubmit = !isUnchanged && !isTooShort && !isEmpty;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isUnchanged) {
      setError('এই নামটি ইতিমধ্যে বিদ্যমান রয়েছে। নতুন নাম লিখুন।');
      return;
    }

    if (trimmedName.length < 2) {
      setError('নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
      return;
    }

    setLoading(true);
    try {
      await updateUser({
        name: trimmedName,
      });
      toast.success('তথ্য সফলভাবে আপডেট হয়েছে।');
      router.push('/profile');
      router.refresh();
    } catch {
      setError('তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
      toast.error('তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <Card className="border-border/80 shadow-xs">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-foreground">
                তথ্য পরিবর্তন
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                আপনার অ্যাকাউন্টের নাম ও তথ্য পরিবর্তন করে সংরক্ষণ করুন।
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-xs sm:text-sm rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-foreground">
                নাম
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="আপনার নাম লিখুন"
                className="h-11 text-sm bg-background border-border/80 focus-visible:ring-primary"
                required
              />
              {isUnchanged && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs sm:text-sm font-medium mt-1.5">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>এই নামটি ইতিমধ্যে বিদ্যমান রয়েছে। পরিবর্তন করতে নতুন নাম লিখুন।</span>
                </div>
              )}
              {isEmpty && (
                <p className="text-xs text-red-600 font-medium pt-0.5">
                  নামের ঘরটি খালি রাখা যাবে না।
                </p>
              )}
              {isTooShort && (
                <p className="text-xs text-red-600 font-medium pt-0.5">
                  নাম কমপক্ষে ২ অক্ষরের হতে হবে।
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-muted-foreground">
                ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
              </label>
              <Input
                type="email"
                value={initialUser.email}
                disabled
                className="h-11 text-sm bg-muted/40 border-border/60 text-muted-foreground font-latin cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button
                type="submit"
                disabled={!canSubmit || loading}
                className="h-11 px-6 text-sm font-bold cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    <span>আপডেট হচ্ছে…</span>
                  </>
                ) : (
                  <span>তথ্য আপডেট করুন</span>
                )}
              </Button>
              <Link
                href="/profile"
                className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
              >
                বাতিল
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

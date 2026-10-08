import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { ProfileManager } from '@/components/profile/profile-manager';

export const metadata: Metadata = {
  title: 'আমার প্রোফাইল | বাজার দর',
  description: 'আপনার বাজার দর অ্যাকাউন্টের বিবরণ ও সেটিংস।',
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?callbackURL=/profile&auth_redirect=1');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          আপনার অ্যাকাউন্টের তথ্য ও সেটিংস পরিচালনা করুন।
        </p>
      </div>

      <ProfileManager initialUser={session.user} />
    </div>
  );
}

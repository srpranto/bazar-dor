import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { ProfileUpdateForm } from '@/components/profile/profile-update-form';

export const metadata: Metadata = {
  title: 'তথ্য পরিবর্তন | বাজার দর',
  description: 'আপনার বাজার দর অ্যাকাউন্টের নাম ও তথ্য পরিবর্তন করুন।',
};

export default async function ProfileUpdatePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/signin?callbackURL=/profile/update&auth_redirect=1');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-6">
      <ProfileUpdateForm initialUser={session.user} />
    </div>
  );
}

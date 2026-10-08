import type { Metadata } from 'next';
import { AuthCardWrapper } from '@/components/auth/auth-card-wrapper';
import { SignInForm } from '@/components/auth/signin-form';

export const metadata: Metadata = {
  title: 'সাইন ইন | বাজার দর',
  description: 'বাজার দর অ্যাকাউন্টে সাইন ইন করে বিস্তারিত দাম ও বাজার তুলনা দেখুন।',
};

export default function SignInPage() {
  return (
    <AuthCardWrapper
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm />
    </AuthCardWrapper>
  );
}

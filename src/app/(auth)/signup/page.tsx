import type { Metadata } from 'next';
import { AuthCardWrapper } from '@/components/auth/auth-card-wrapper';
import { SignUpForm } from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'সাইন আপ | বাজার দর',
  description: 'বাজার দর অ্যাকাউন্ট তৈরি করে বিস্তারিত দাম ও বাজার তুলনা দেখুন।',
};

export default function SignUpPage() {
  return (
    <AuthCardWrapper
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <SignUpForm />
    </AuthCardWrapper>
  );
}

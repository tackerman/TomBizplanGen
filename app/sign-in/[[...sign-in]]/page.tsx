'use client';

import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none',
                footer: 'hidden',
                footerAction: 'hidden',        // ← NEW
                footerActionLink: 'hidden',    // ← NEW
                footerPages: 'hidden',         // ← NEW
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/"       // ← Return home after sign-in
            afterSignInUrl="/"
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

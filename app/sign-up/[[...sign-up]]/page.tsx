'use client';

import { SignUp } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Start generating business plans today</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Terms Acceptance */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                I agree to the{' '}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-indigo-600 hover:text-indigo-700 underline"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Clerk Sign Up Component */}
          {termsAccepted ? (
            <SignUp
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
              path="/sign-up"
              signInUrl="/sign-in"
              forceRedirectUrl="/"       // ← Return home after sign-up
              afterSignUpUrl="/"
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                Please accept the terms and conditions to continue
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

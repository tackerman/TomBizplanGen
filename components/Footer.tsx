'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BP</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Business Plan Generator
              </span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Generate comprehensive, AI-powered business plans tailored to your company's 
              goals, strengths, and market opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {currentYear} Thomas Ackerman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

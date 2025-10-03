'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex space-x-4">
              <span>📞 +1 (555) 123-4567</span>
              <span>✉️ info@daynnight.com</span>
            </div>
            <div className="flex space-x-4">
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Day & Night
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                🔍
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {session.user.name}</span>
                {session.user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button className="text-gray-700 hover:text-gray-900">
              🛒 <span className="ml-1">Cart (0)</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile search */}
              <div className="px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Mobile navigation */}
              <nav className="flex flex-col space-y-2 px-4">
                <Link href="/" className="text-gray-700 hover:text-gray-900 py-2">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-gray-900 py-2">
                  Products
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-gray-900 py-2">
                  Categories
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-gray-900 py-2">
                  About
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-gray-900 py-2">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
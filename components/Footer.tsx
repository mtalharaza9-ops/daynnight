'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Day & Night Logo" className="h-8 w-8" />
              <h3 className="text-xl font-bold">Day & Night Inc.</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for premium products, available 24/7. 
              We bring you the best selection of daily essentials, electronics, 
              and lifestyle products at unbeatable prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>123 Business Street, Suite 100, New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@daynnight.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-300 hover:text-white transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal & Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Press & Media
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="text-center lg:text-left">
              <h4 className="text-sm font-semibold mb-4">We Accept</h4>
              <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-4">
                {/* Visa */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                    <path fill="#FFFFFF" d="M18.5 10.5h3.2l-2 11h-3.2l2-11zm8.8 0c-.6 0-1.1.3-1.4.8l-4.8 10.2h3.4l.7-1.9h4.2l.4 1.9h3l-2.6-11h-2.9zm.5 3.2l1 4.8h-2.7l1.7-4.8zm-8.5-3.2c-1.1 0-2.1.6-2.1 1.5 0 .8.7 1.2 1.2 1.5.5.3.7.5.7.8 0 .5-.6.7-1.1.7-.7 0-1.1-.1-1.7-.4l-.3 1.4c.4.2 1.1.3 1.8.3 1.2 0 2-.6 2-1.6 0-.6-.4-1.1-.9-1.4-.5-.3-.8-.5-.8-.8 0-.4.4-.6.9-.6.5 0 .9.1 1.3.2l.2-1.4c-.4-.1-.9-.2-1.4-.2z"/>
                    <path fill="#FFD700" d="M8 10.5l-.1.6c1.4.3 2.7 1.1 3.5 2.1l-.5-2.4c-.1-.3-.3-.4-.6-.4H8z"/>
                  </svg>
                </div>

                {/* Mastercard */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#000000"/>
                    <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                    <circle cx="24" cy="16" r="10" fill="#FF5F00"/>
                    <path fill="#FFFFFF" d="M22 8.5c-1.8 1.4-3 3.6-3 6.1s1.2 4.7 3 6.1c1.8-1.4 3-3.6 3-6.1s-1.2-4.7-3-6.1z"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#003087"/>
                    <path fill="#009CDE" d="M12 8h8c3 0 5 1 5 4s-2 4-5 4h-4l-1 4h-2l3-12z"/>
                    <path fill="#012169" d="M16 12h4c1.5 0 2.5-.5 2.5-2s-1-2-2.5-2h-4l-2 8h2l2-4z"/>
                    <path fill="#FFFFFF" d="M8 20h2l1-4h2c2 0 3-.5 3-2s-1-2-3-2h-4l-3 12h2z"/>
                  </svg>
                </div>

                {/* Apple Pay */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#000000"/>
                    <path fill="#FFFFFF" d="M18.5 12c-.8 0-1.5-.4-1.8-1-.3-.6-.2-1.3.3-1.8.5-.5 1.2-.8 1.9-.8.8 0 1.5.4 1.8 1 .3.6.2 1.3-.3 1.8-.5.5-1.2.8-1.9.8zm3 1.3c-1 0-1.8.5-2.3.5s-1.3-.5-2.3-.5c-1.2 0-2.3.7-2.9 1.7-1.3 2.4-.3 5.8 1 7.7.7.9 1.4 2 2.4 2 1 0 1.3-.7 2.5-.7s1.5.7 2.5.7c1 0 1.7-1 2.4-2 .8-1.1 1-2.2 1-2.3 0 0-1.9-.8-1.9-3.1 0-2 1.7-3.1 1.8-3.1-1-1.4-2.5-1.6-3-1.6z"/>
                  </svg>
                </div>

                {/* Google Pay */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#FFFFFF"/>
                    <path fill="#4285F4" d="M24 14c0-1-.1-2-.3-3h-9v5h5.2c-.2 1.3-1 2.5-2.1 3.3v2.7h3.4c2-1.8 3.1-4.5 3.1-8.5l-.3.5z"/>
                    <path fill="#34A853" d="M15 25c2.9 0 5.3-.9 7.1-2.5l-3.4-2.7c-.9.7-2.2 1-3.7 1-2.8 0-5.2-1.9-6-4.4h-3.5v2.8c1.8 3.6 5.5 5.9 9.5 5.9v-.1z"/>
                    <path fill="#FBBC04" d="M9 16.6c-.3-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2v-2.8h-3.5c-.8 1.5-1.2 3.2-1.2 5s.4 3.5 1.2 5l3.5-2.8z"/>
                    <path fill="#EA4335" d="M15 8.2c1.6 0 3.1.6 4.2 1.6l3.1-3.1c-1.9-1.7-4.3-2.7-7.3-2.7-4 0-7.7 2.3-9.5 5.9l3.5 2.8c.8-2.5 3.2-4.4 6-4.4v-.1z"/>
                  </svg>
                </div>

                {/* American Express */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-16 h-10 shadow-sm">
                  <svg viewBox="0 0 48 32" className="w-10 h-6">
                    <rect width="48" height="32" rx="4" fill="#006FCF"/>
                    <path fill="#FFFFFF" d="M10 11h3l.7 1.7.7-1.7h3v6h-2v-3.7l-.8 2h-1l-.8-2v3.7h-2v-6zm10 0h5v1.3h-3v.7h2.8v1.3h-2.8v.7h3v1.3h-5v-5.3zm6.7 0h2.2l1.3 2.7 1.3-2.7h2.2l-2.7 5.3h-1.7l-2.6-5.3z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="text-center lg:text-right">
              <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex justify-center lg:justify-end space-x-4">
                <a
                  href="https://facebook.com/daynightinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/daynightinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 p-2 rounded-full transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/daynightinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 hover:bg-blue-500 p-2 rounded-full transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/daynightinc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} Day & Night Inc. All rights reserved. | 
              <span className="ml-1">Designed with ❤️ for our customers</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>🔒 Secure Shopping</span>
              <span>•</span>
              <span>📦 Fast Delivery</span>
              <span>•</span>
              <span>🔄 Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
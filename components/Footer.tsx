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
              <div className="flex items-center space-x-1">
                <span className="text-2xl">☀️</span>
                <span className="text-2xl">🌙</span>
              </div>
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
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <path fill="#1434CB" d="M16.283 12.853l1.313-8.1h2.096l-1.313 8.1h-2.096zm10.493-7.895c-.417-.156-1.073-.323-1.896-.323-2.096 0-3.573 1.094-3.583 2.656-.01.938.854 1.459 1.51 1.771.677.323 1.073.531 1.073.823-.01.448-.552.646-1.063.646-.708 0-1.083-.104-1.667-.354l-.229-.104-.25 1.5c.5.229 1.417.427 2.375.438 2.229 0 3.677-1.083 3.688-2.76.01-.74-.448-1.302-1.438-1.771-.594-.302-.958-.5-.958-.802 0-.271.313-.563.979-.563.563-.01 1.073.115 1.427.25l.167.083.25-1.51zm4.073 5.22c.177-.469.854-2.281.854-2.281-.01.021.177-.469.281-.771l.146.708s.406 1.906.49 2.302h-1.771v.042zm2.458-5.205h-1.615c-.5 0-.875.146-1.094.677l-3.104 7.26h2.229s.365-.99.448-1.208h2.729c.063.281.26 1.208.26 1.208h1.969l-1.823-7.937h.001zm-15.593 0l-2.073 5.406-.219-1.094c-.385-1.281-1.583-2.667-2.927-3.365l1.875 6.99h2.25l3.344-8.1-2.25.163z"/>
                    <path fill="#FFD700" d="M6.647 4.753H2.917l-.031.188c2.656.677 4.417 2.313 5.146 4.281l-.74-3.76c-.125-.5-.49-.677-.979-.709z"/>
                  </svg>
                </div>

                {/* Mastercard */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <circle fill="#FF5F00" cx="15" cy="12" r="7"/>
                    <circle fill="#EB001B" cx="9" cy="12" r="7"/>
                    <circle fill="#F79E1B" cx="21" cy="12" r="7"/>
                  </svg>
                </div>

                {/* PayPal */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <path fill="#003087" d="M8.533 4.533h4.8c2.133 0 3.733.533 4.533 1.6.8 1.067.8 2.4 0 4-.8 1.6-2.4 2.4-4.533 2.4h-2.4l-.8 2.4h-1.6l2.4-7.2c.133-.4.4-.533.8-.533z"/>
                    <path fill="#0070BA" d="M13.333 8.533h2.4c1.067 0 1.867-.267 2.267-.8.4-.533.4-1.2 0-2-.4-.8-1.2-1.2-2.267-1.2h-2.4l-1.2 3.6c0 .133.067.267.2.4z"/>
                  </svg>
                </div>

                {/* Apple Pay */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <path fill="#000" d="M12.533 8.533c-.533 0-1.067-.267-1.333-.8-.267-.533-.133-1.2.267-1.6.4-.4.933-.667 1.467-.667.533 0 1.067.267 1.333.8.267.533.133 1.2-.267 1.6-.4.4-.933.667-1.467.667zm2.4 1.067c-.8 0-1.467.4-1.867.4s-1.067-.4-1.867-.4c-.933 0-1.8.533-2.267 1.333-1.067 1.867-.267 4.533.8 6 .533.733 1.133 1.533 1.933 1.533.8 0 1.067-.533 2-.533s1.2.533 2 .533c.8 0 1.4-.8 1.933-1.533.6-.867.8-1.733.8-1.8 0 0-1.533-.6-1.533-2.4 0-1.6 1.333-2.4 1.4-2.4-.8-1.133-2-1.267-2.4-1.267z"/>
                  </svg>
                </div>

                {/* Google Pay */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <path fill="#4285F4" d="M19.533 12c0-.8-.067-1.533-.2-2.267h-7.2v4.267h4.133c-.2 1.067-.8 2-1.667 2.6v2.133h2.667c1.533-1.4 2.4-3.533 2.4-6.733z"/>
                    <path fill="#34A853" d="M12.133 20c2.267 0 4.133-.733 5.533-2l-2.667-2.133c-.733.533-1.733.8-2.867.8-2.2 0-4.067-1.467-4.733-3.467h-2.733v2.2c1.4 2.8 4.267 4.6 7.467 4.6z"/>
                    <path fill="#FBBC04" d="M7.4 13.2c-.2-.533-.267-1.133-.267-1.733s.067-1.2.267-1.733v-2.2h-2.733c-.6 1.2-.933 2.533-.933 3.933s.333 2.733.933 3.933l2.733-2.2z"/>
                    <path fill="#EA4335" d="M12.133 6.533c1.267 0 2.4.433 3.267 1.267l2.4-2.4c-1.467-1.333-3.333-2.133-5.667-2.133-3.2 0-6.067 1.8-7.467 4.6l2.733 2.2c.667-2 2.533-3.533 4.733-3.533z"/>
                  </svg>
                </div>

                {/* American Express */}
                <div className="bg-white rounded p-2 flex items-center justify-center w-12 h-8">
                  <svg viewBox="0 0 40 24" className="w-8 h-5">
                    <rect fill="#006FCF" width="40" height="24" rx="2"/>
                    <path fill="#FFF" d="M8.533 8.533h2.4l.533 1.333.533-1.333h2.4v4.8h-1.6v-2.933l-.667 1.6h-.8l-.667-1.6v2.933h-1.6v-4.8zm8 0h4v1.067h-2.4v.533h2.267v1.067h-2.267v.533h2.4v1.067h-4v-4.267zm5.333 0h1.733l1.067 2.133 1.067-2.133h1.733l-2.133 4.267h-1.333l-2.133-4.267z"/>
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
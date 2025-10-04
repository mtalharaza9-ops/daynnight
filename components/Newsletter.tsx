'use client';

import { useState } from 'react';
import { Mail, Gift, Zap, Bell, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8">
            <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to the Family! 🎉
            </h2>
            <p className="text-lg text-green-100 mb-6">
              Thank you for subscribing! You'll receive exclusive deals and updates straight to your inbox.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="bg-white text-green-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <Mail className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Subscribe for Exclusive Deals & Updates
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our newsletter and be the first to know about flash sales, new arrivals, 
              and exclusive member-only discounts. Plus, get 10% off your first order!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Exclusive Deals</h3>
              <p className="text-sm text-blue-100">
                Get access to member-only discounts and special offers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Flash Sale Alerts</h3>
              <p className="text-sm text-blue-100">
                Be notified instantly when flash sales and limited-time offers go live
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3 inline-block">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">New Arrivals</h3>
              <p className="text-sm text-blue-100">
                Stay updated on the latest products and trending items
              </p>
            </div>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe Now'
                )}
              </button>
            </div>
          </form>

          {/* Disclaimer */}
          <p className="text-xs text-blue-200 text-center mt-6 max-w-lg mx-auto">
            By subscribing, you agree to receive marketing emails from Day & Night Inc. 
            You can unsubscribe at any time. We respect your privacy and will never share your information.
          </p>

          {/* Special Offer Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm">
              <Gift className="h-4 w-4 mr-2" />
              Get 10% OFF your first order when you subscribe!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
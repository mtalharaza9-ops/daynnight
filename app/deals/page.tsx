'use client';

import { useState, useEffect } from 'react';
import { Star, Clock, Zap, ShoppingCart, Heart, Timer, Percent, Gift } from 'lucide-react';
import Link from 'next/link';

interface Deal {
  id: number;
  name: string;
  description: string;
  original_price: number;
  sale_price: number;
  discount_percentage: number;
  image_url: string;
  category: string;
  rating?: number;
  reviews_count?: number;
  deal_end_time: string;
  stock_remaining?: number;
  is_flash_deal?: boolean;
  is_featured?: boolean;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      updateCountdowns();
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/deals');
      const data = await response.json();
      
      if (data.success) {
        setDeals(data.data);
      } else {
        throw new Error('Failed to fetch deals');
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
      setError('Failed to load deals');
      // Fallback deals data
      setDeals([
        {
          id: 1,
          name: 'Premium Noise-Cancelling Headphones',
          description: 'Professional-grade headphones with active noise cancellation',
          original_price: 299.99,
          sale_price: 179.99,
          discount_percentage: 40,
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          category: 'Electronics',
          rating: 4.8,
          reviews_count: 1247,
          deal_end_time: '2024-01-20T23:59:59Z',
          stock_remaining: 15,
          is_flash_deal: true,
          is_featured: true
        },
        {
          id: 2,
          name: 'Smart Fitness Tracker',
          description: 'Advanced fitness tracking with heart rate and sleep monitoring',
          original_price: 199.99,
          sale_price: 129.99,
          discount_percentage: 35,
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          category: 'Electronics',
          rating: 4.6,
          reviews_count: 892,
          deal_end_time: '2024-01-21T12:00:00Z',
          stock_remaining: 8,
          is_flash_deal: true
        },
        {
          id: 3,
          name: 'Organic Skincare Set',
          description: 'Complete skincare routine with natural organic ingredients',
          original_price: 149.99,
          sale_price: 89.99,
          discount_percentage: 40,
          image_url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400',
          category: 'Beauty',
          rating: 4.9,
          reviews_count: 654,
          deal_end_time: '2024-01-22T18:30:00Z',
          stock_remaining: 23
        },
        {
          id: 4,
          name: 'Professional Coffee Maker',
          description: 'Barista-quality coffee maker with built-in grinder',
          original_price: 399.99,
          sale_price: 249.99,
          discount_percentage: 38,
          image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
          category: 'Home & Kitchen',
          rating: 4.7,
          reviews_count: 423,
          deal_end_time: '2024-01-23T09:00:00Z',
          stock_remaining: 12,
          is_featured: true
        },
        {
          id: 5,
          name: 'Wireless Charging Station',
          description: 'Multi-device wireless charging pad for phone, watch, and earbuds',
          original_price: 89.99,
          sale_price: 54.99,
          discount_percentage: 39,
          image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          category: 'Electronics',
          rating: 4.5,
          reviews_count: 567,
          deal_end_time: '2024-01-24T15:45:00Z',
          stock_remaining: 31
        },
        {
          id: 6,
          name: 'Luxury Bamboo Sheets',
          description: 'Ultra-soft bamboo fiber bed sheets, hypoallergenic and breathable',
          original_price: 179.99,
          sale_price: 107.99,
          discount_percentage: 40,
          image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          category: 'Home & Garden',
          rating: 4.8,
          reviews_count: 334,
          deal_end_time: '2024-01-25T20:00:00Z',
          stock_remaining: 19
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateCountdowns = () => {
    const newTimeRemaining: { [key: number]: string } = {};
    
    deals.forEach((deal) => {
      const endTime = new Date(deal.deal_end_time).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          newTimeRemaining[deal.id] = `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
          newTimeRemaining[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeRemaining[deal.id] = `${minutes}m ${seconds}s`;
        }
      } else {
        newTimeRemaining[deal.id] = 'Expired';
      }
    });

    setTimeRemaining(newTimeRemaining);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStockStatus = (remaining?: number) => {
    if (!remaining) return null;
    
    if (remaining <= 5) {
      return { text: `Only ${remaining} left!`, color: 'text-red-600 bg-red-50' };
    } else if (remaining <= 15) {
      return { text: `${remaining} remaining`, color: 'text-orange-600 bg-orange-50' };
    }
    return { text: `${remaining} in stock`, color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Zap className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Deals of the Day
            </h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Limited-time offers with incredible savings. Don't miss out on these amazing deals!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Deal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Percent className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">Up to 50%</h3>
            <p className="text-gray-600">Maximum Savings</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Timer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">24 Hours</h3>
            <p className="text-gray-600">Limited Time</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Gift className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">Free Shipping</h3>
            <p className="text-gray-600">On All Deals</p>
          </div>
        </div>

        {/* Flash Deals Banner */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 mb-12 border-2 border-red-200">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <Zap className="h-8 w-8 text-red-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Flash Deals</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lightning-fast deals with the biggest discounts. These offers won't last long, so grab them while you can!
            </p>
          </div>
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg h-64 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => {
              const stockStatus = getStockStatus(deal.stock_remaining);
              
              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-red-200"
                >
                  {/* Deal Image */}
                  <div className="relative">
                    <img
                      src={deal.image_url}
                      alt={deal.name}
                      className="w-full h-64 object-cover"
                    />
                    
                    {/* Deal Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Percent className="h-3 w-3 mr-1" />
                        {deal.discount_percentage}% OFF
                      </span>
                      
                      {deal.is_flash_deal && (
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          Flash Deal
                        </span>
                      )}
                      
                      {deal.is_featured && (
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <button className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Category */}
                    <div className="mb-2">
                      <span className="text-xs text-red-600 font-medium uppercase tracking-wide">
                        {deal.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {deal.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {deal.description}
                    </p>

                    {/* Rating */}
                    {deal.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {renderStars(deal.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {deal.rating} ({deal.reviews_count || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl font-bold text-red-600">
                          ${deal.sale_price.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${deal.original_price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-sm text-green-600 font-medium">
                        You save ${(deal.original_price - deal.sale_price).toFixed(2)}
                      </span>
                    </div>

                    {/* Stock Status */}
                    {stockStatus && (
                      <div className="mb-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                    )}

                    {/* Countdown Timer */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          Deal ends in:
                        </div>
                        <span className="text-sm font-bold text-red-600">
                          {timeRemaining[deal.id] || 'Loading...'}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Grab This Deal
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center text-white">
          <Zap className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">
            Never Miss a Deal
          </h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our deal alerts and be the first to know about flash sales, exclusive discounts, and limited-time offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-red-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Get Alerts
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse All Products
            <Zap className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
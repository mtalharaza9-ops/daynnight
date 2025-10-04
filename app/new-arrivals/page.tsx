'use client';

import { useState, useEffect } from 'react';
import { Star, Clock, Sparkles, ShoppingCart, Heart, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating?: number;
  reviews_count?: number;
  created_at: string;
  is_featured?: boolean;
  discount_percentage?: number;
}

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<'all' | 'week' | 'month'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchNewArrivals();
  }, [filterBy, categoryFilter]);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        filter: filterBy,
        category: categoryFilter
      });
      const response = await fetch(`/api/products/new-arrivals?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error('Failed to fetch new arrivals');
      }
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      setError('Failed to load new arrivals');
      // Fallback new arrivals data
      setProducts([
        {
          id: 1,
          name: 'Ultra-Slim Laptop Stand',
          description: 'Ergonomic aluminum laptop stand with adjustable height',
          price: 89.99,
          image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
          category: 'Electronics',
          rating: 4.8,
          reviews_count: 24,
          created_at: '2024-01-15T10:00:00Z',
          is_featured: true,
          discount_percentage: 10
        },
        {
          id: 2,
          name: 'Bamboo Fiber Bedsheet Set',
          description: 'Eco-friendly bamboo fiber bedsheets, ultra-soft and breathable',
          price: 129.99,
          image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          category: 'Home & Garden',
          rating: 4.9,
          reviews_count: 18,
          created_at: '2024-01-14T15:30:00Z',
          is_featured: true
        },
        {
          id: 3,
          name: 'Wireless Charging Pad',
          description: 'Fast wireless charging pad compatible with all Qi devices',
          price: 39.99,
          image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          category: 'Electronics',
          rating: 4.6,
          reviews_count: 31,
          created_at: '2024-01-13T09:15:00Z'
        },
        {
          id: 4,
          name: 'Artisan Coffee Blend',
          description: 'Premium single-origin coffee beans, freshly roasted',
          price: 24.99,
          image_url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400',
          category: 'Food & Beverage',
          created_at: '2024-01-12T14:20:00Z'
        },
        {
          id: 5,
          name: 'Minimalist Desk Organizer',
          description: 'Clean and modern desk organizer with multiple compartments',
          price: 49.99,
          image_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
          category: 'Office',
          rating: 4.7,
          reviews_count: 12,
          created_at: '2024-01-11T11:45:00Z'
        },
        {
          id: 6,
          name: 'Sustainable Water Bottle',
          description: 'Insulated stainless steel water bottle, keeps drinks cold for 24h',
          price: 34.99,
          image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
          category: 'Sports',
          rating: 4.5,
          reviews_count: 28,
          created_at: '2024-01-10T16:00:00Z',
          discount_percentage: 15
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, discount?: number) => {
    if (discount) {
      const discountedPrice = price * (1 - discount / 100);
      return {
        original: price.toFixed(2),
        discounted: discountedPrice.toFixed(2),
        savings: (price - discountedPrice).toFixed(2)
      };
    }
    return { current: price.toFixed(2) };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Added today';
    if (diffDays <= 7) return `Added ${diffDays} days ago`;
    if (diffDays <= 30) return `Added ${Math.ceil(diffDays / 7)} weeks ago`;
    return `Added ${Math.ceil(diffDays / 30)} months ago`;
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

  const categories = ['all', 'Electronics', 'Home & Garden', 'Clothing', 'Sports', 'Office', 'Food & Beverage'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Sparkles className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              New Arrivals
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Be the first to discover our latest products and trending items
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured New Arrivals Banner */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <Sparkles className="h-8 w-8 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Fresh & Exciting
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest additions to our collection. From cutting-edge tech to stylish accessories, 
              find the newest products that everyone's talking about.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Time Filter */}
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Added:</span>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as 'all' | 'week' | 'month')}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
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
            {products.map((product) => {
              const priceInfo = formatPrice(product.price, product.discount_percentage);
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </span>
                    </div>
                    
                    {product.is_featured && (
                      <div className="absolute top-4 left-4 mt-8">
                        <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                    
                    {product.discount_percentage && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                          -{product.discount_percentage}%
                        </span>
                      </div>
                    )}
                    
                    <button className="absolute top-4 right-4 mt-8 bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(product.created_at)}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {product.rating} ({product.reviews_count || 0} reviews)
                        </span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {priceInfo.discounted ? (
                          <>
                            <span className="text-2xl font-bold text-gray-900">
                              ${priceInfo.discounted}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ${priceInfo.original}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold text-gray-900">
                            ${priceInfo.current}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">
            Never Miss a New Arrival
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, exclusive launches, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse All Products
            <Sparkles className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
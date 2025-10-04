'use client';

import { useState, useEffect } from 'react';
import { Star, TrendingUp, Award, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  reviews_count: number;
  sales_count?: number;
  discount_percentage?: number;
}

export default function BestSellersPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'sales' | 'rating' | 'price'>('sales');

  useEffect(() => {
    fetchBestSellers();
  }, [sortBy]);

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/best-sellers?sort=${sortBy}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error('Failed to fetch best sellers');
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      setError('Failed to load best sellers');
      // Fallback best sellers data
      setProducts([
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 299.99,
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          category: 'Electronics',
          rating: 4.8,
          reviews_count: 1247,
          sales_count: 2850,
          discount_percentage: 15
        },
        {
          id: 2,
          name: 'Organic Cotton T-Shirt',
          description: 'Comfortable and sustainable organic cotton t-shirt',
          price: 29.99,
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          category: 'Clothing',
          rating: 4.6,
          reviews_count: 892,
          sales_count: 1950
        },
        {
          id: 3,
          name: 'Smart Fitness Watch',
          description: 'Advanced fitness tracking with heart rate monitor',
          price: 199.99,
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          category: 'Electronics',
          rating: 4.7,
          reviews_count: 654,
          sales_count: 1680,
          discount_percentage: 20
        },
        {
          id: 4,
          name: 'Ceramic Coffee Mug Set',
          description: 'Beautiful handcrafted ceramic mugs, set of 4',
          price: 49.99,
          image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400',
          category: 'Home & Garden',
          rating: 4.9,
          reviews_count: 423,
          sales_count: 1420
        },
        {
          id: 5,
          name: 'Yoga Mat Premium',
          description: 'Non-slip premium yoga mat with carrying strap',
          price: 79.99,
          image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
          category: 'Sports',
          rating: 4.5,
          reviews_count: 567,
          sales_count: 1280
        },
        {
          id: 6,
          name: 'Leather Wallet',
          description: 'Genuine leather wallet with RFID protection',
          price: 89.99,
          image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          category: 'Accessories',
          rating: 4.4,
          reviews_count: 334,
          sales_count: 1150
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <TrendingUp className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Sellers
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Discover our most popular products loved by thousands of customers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Award className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">50K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">98%</h3>
            <p className="text-gray-600">Satisfaction Rate</p>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">4.7</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Top Selling Products</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'sales' | 'rating' | 'price')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="sales">Most Sold</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
              </select>
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
            {products.map((product, index) => {
              const priceInfo = formatPrice(product.price, product.discount_percentage);
              
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Bestseller Badge */}
                  <div className="relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        #{index + 1} Best Seller
                      </span>
                    </div>
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
                    <div className="mb-2">
                      <span className="text-xs text-orange-600 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {renderStars(product.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews_count} reviews)
                      </span>
                    </div>

                    {/* Sales Count */}
                    {product.sales_count && (
                      <div className="mb-4">
                        <span className="text-sm text-green-600 font-medium">
                          {product.sales_count.toLocaleString()} sold
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
                    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to see more amazing products?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our full catalog of products and discover new favorites that could become your next best purchase.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse All Products
            <TrendingUp className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
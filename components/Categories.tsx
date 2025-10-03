'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Package } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  image_url: string;
  product_count: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();

      if (data.success) {
        setCategories(data.data || []);
      } else {
        setError('Failed to load categories');
      }
    } catch (err) {
      setError('Error loading categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fallback categories if API fails
  const fallbackCategories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      product_count: 25,
    },
    {
      id: 2,
      name: 'Clothing',
      description: 'Fashion and apparel for all occasions',
      image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      product_count: 18,
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      product_count: 12,
    },
    {
      id: 4,
      name: 'Sports',
      description: 'Sports equipment and fitness gear',
      image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      product_count: 15,
    },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of product categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of product categories, each carefully curated to meet your needs
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800">{error}. Showing sample categories.</p>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover cursor-pointer group"
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                
                {/* Product Count Badge */}
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Package className="h-4 w-4" />
                  <span>{category.product_count}</span>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                {/* View Category Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {category.product_count} products
                  </span>
                  <div className="flex items-center text-primary-600 group-hover:text-primary-700 font-semibold">
                    <span className="mr-2">View All</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2">
            <span>View All Categories</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
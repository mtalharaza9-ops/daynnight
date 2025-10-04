'use client';

import { useState, useEffect } from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

const bestSellingProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Smart Home Security Camera',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
    badge: 'Trending'
  },
  {
    id: 3,
    name: 'Organic Coffee Beans (2lb)',
    price: 24.99,
    rating: 4.9,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop',
    badge: 'Top Rated'
  },
  {
    id: 4,
    name: 'Stainless Steel Water Bottle',
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviews: 1543,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'LED Desk Lamp with USB Charging',
    price: 45.99,
    rating: 4.5,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    badge: 'New'
  },
  {
    id: 6,
    name: 'Bamboo Cutting Board Set',
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 934,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Wireless Phone Charger',
    price: 29.99,
    rating: 4.4,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1609592806787-3d0b4c7b0e4b?w=300&h=300&fit=crop',
    badge: 'Fast Charging'
  },
  {
    id: 8,
    name: 'Essential Oil Diffuser',
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.6,
    reviews: 1123,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop'
  }
];

export default function BestSellers() {
  const [products] = useState(bestSellingProducts);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product.name);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers & Trending Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items loved by thousands of customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm text-green-600 font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
            View All Best Sellers
          </button>
        </div>
      </div>
    </section>
  );
}
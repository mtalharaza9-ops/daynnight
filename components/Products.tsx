'use client';

import { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
}

interface ProductsProps {
  category?: string;
  searchQuery?: string;
}

export default function Products({ category, searchQuery }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/api/products';
      if (category) {
        url += `?category=${encodeURIComponent(category)}`;
      } else if (searchQuery) {
        url += `?search=${encodeURIComponent(searchQuery)}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data || []);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error loading products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number) => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setAddingToCart(productId);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        // Show success message or update UI
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      alert('An error occurred while adding to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  // Fallback products if API fails
  const fallbackProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics',
      rating: 4.5,
      reviews_count: 128,
      in_stock: true,
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring',
      price: 299.99,
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics',
      rating: 4.3,
      reviews_count: 89,
      in_stock: true,
    },
    {
      id: 3,
      name: 'Designer T-Shirt',
      description: 'Premium cotton t-shirt with modern design',
      price: 49.99,
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'Clothing',
      rating: 4.7,
      reviews_count: 203,
      in_stock: true,
    },
    {
      id: 4,
      name: 'Running Shoes',
      description: 'Comfortable running shoes for all terrains',
      price: 129.99,
      image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Sports',
      rating: 4.6,
      reviews_count: 156,
      in_stock: true,
    },
    {
      id: 5,
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable settings',
      price: 89.99,
      image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      category: 'Home & Garden',
      rating: 4.4,
      reviews_count: 74,
      in_stock: true,
    },
    {
      id: 6,
      name: 'Yoga Mat',
      description: 'Non-slip yoga mat for comfortable workouts',
      price: 39.99,
      image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      category: 'Sports',
      rating: 4.8,
      reviews_count: 312,
      in_stock: true,
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products, loved by customers worldwide
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800">{error}. Showing sample products.</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-primary-600 hover:text-white transition-colors duration-300">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </div>

                {/* Stock Status */}
                {!product.in_stock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews_count} reviews)
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.in_stock || addingToCart === product.id}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2 ${
                      product.in_stock
                        ? 'bg-primary-600 hover:bg-primary-700 text-white disabled:bg-primary-400'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>
                      {addingToCart === product.id
                        ? 'Adding...'
                        : product.in_stock
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
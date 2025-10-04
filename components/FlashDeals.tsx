'use client';

import { useState, useEffect } from 'react';
import { Clock, ShoppingCart, Zap } from 'lucide-react';

interface Deal {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  stock: number;
  sold: number;
}

const flashDeals: Deal[] = [
  {
    id: 1,
    name: 'Smart Watch Pro',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    stock: 50,
    sold: 23
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 49.99,
    originalPrice: 89.99,
    discount: 44,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop',
    stock: 100,
    sold: 67
  },
  {
    id: 3,
    name: 'Portable Speaker',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
    stock: 30,
    sold: 18
  },
  {
    id: 4,
    name: 'Gaming Mouse',
    price: 39.99,
    originalPrice: 69.99,
    discount: 43,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop',
    stock: 75,
    sold: 45
  }
];

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target time to end of day
    const targetTime = new Date();
    targetTime.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime.getTime() - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Reset to 24 hours when timer reaches 0
        const newTarget = new Date();
        newTarget.setDate(newTarget.getDate() + 1);
        newTarget.setHours(23, 59, 59, 999);
        setTimeLeft({ hours: 24, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (deal: Deal) => {
    console.log('Adding flash deal to cart:', deal.name);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-red-500 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-yellow-300 mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Flash Deals of the Day
            </h2>
            <Zap className="h-8 w-8 text-yellow-300 ml-2" />
          </div>
          <p className="text-lg text-red-100 mb-6">
            Limited time offers - grab them before they're gone!
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Clock className="h-6 w-6 text-yellow-300" />
            <div className="flex items-center space-x-2 text-white">
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="text-2xl font-bold">:</div>
              <div className="bg-white bg-opacity-20 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  -{deal.discount}%
                </div>
                <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold">
                  FLASH DEAL
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {deal.name}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-red-600">
                      ${deal.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">
                    Save ${(deal.originalPrice - deal.price).toFixed(2)}
                  </span>
                </div>

                {/* Stock Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Sold: {deal.sold}</span>
                    <span>Available: {deal.stock - deal.sold}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
                      style={{ width: `${(deal.sold / deal.stock) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(deal)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Grab Deal Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Promotion Banner */}
        <div className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            🎉 Buy 1 Get 1 Free on Selected Items! 🎉
          </h3>
          <p className="text-red-100 mb-4">
            Mix and match from our special BOGO collection. Limited time offer!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors duration-300">
            Shop BOGO Deals
          </button>
        </div>
      </div>
    </section>
  );
}
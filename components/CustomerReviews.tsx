'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  product: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, NY',
    rating: 5,
    review: 'Amazing quality products and super fast delivery! I ordered kitchen essentials and everything arrived perfectly packaged. The customer service team was incredibly helpful when I had questions.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    product: 'Kitchen Essentials Set',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Los Angeles, CA',
    rating: 5,
    review: 'Day & Night Inc. has become my go-to store for everything! From electronics to daily essentials, they have it all. The prices are competitive and the quality is outstanding.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    product: 'Electronics Bundle',
    date: '2024-01-12'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    review: 'I love the variety of products available! The website is easy to navigate, and I always find what I need. The flash deals are incredible - saved so much money!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    product: 'Personal Care Items',
    date: '2024-01-10'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Chicago, IL',
    rating: 4,
    review: 'Great experience overall! The delivery was prompt and the products were exactly as described. Customer support resolved my query within minutes. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    product: 'Home Essentials',
    date: '2024-01-08'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    location: 'Seattle, WA',
    rating: 5,
    review: 'The best online shopping experience I\'ve had! Products are authentic, delivery is super fast, and the return policy is very customer-friendly. Will definitely shop again!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    product: 'Health & Wellness',
    date: '2024-01-05'
  },
  {
    id: 6,
    name: 'James Wilson',
    location: 'Austin, TX',
    rating: 5,
    review: 'Exceptional service and quality! I\'ve been shopping here for months and every order exceeds my expectations. The packaging is eco-friendly too, which I really appreciate.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    product: 'Daily Essentials',
    date: '2024-01-03'
  }
];

export default function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate reviews
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their shopping experience.
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Review Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={reviews[currentIndex].avatar}
                  alt={reviews[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-blue-600 mb-4 mx-auto md:mx-0" />
                
                {/* Review Text */}
                <p className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                  "{reviews[currentIndex].review}"
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start mb-4">
                  {renderStars(reviews[currentIndex].rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({reviews[currentIndex].rating}/5)
                  </span>
                </div>

                {/* Customer Info */}
                <div className="space-y-1">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {reviews[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {reviews[currentIndex].location}
                  </p>
                  <p className="text-sm text-blue-600">
                    Purchased: {reviews[currentIndex].product}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">2M+</div>
            <div className="text-gray-600">Orders Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
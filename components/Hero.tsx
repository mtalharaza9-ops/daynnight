'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Fall Sale - Up to 40% OFF',
    subtitle: 'Seasonal Promotions at Day & Night Inc.',
    description: 'Discover amazing deals on your favorite products. Free shipping on orders over $50!',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    cta: 'Shop Now',
    badge: 'Free Shipping',
  },
  {
    id: 2,
    title: 'Best-Selling Categories',
    subtitle: 'Home Essentials & Daily Needs',
    description: 'From groceries to household items - everything you need for daily life.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    cta: 'Explore Categories',
    badge: '100% Original',
  },
  {
    id: 3,
    title: 'Electronics & Gadgets',
    subtitle: 'Latest Technology at Your Fingertips',
    description: 'From smartphones to smart home devices, find the latest tech innovations.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop',
    cta: 'Shop Electronics',
    badge: '24/7 Support',
  },
  {
    id: 4,
    title: 'Easy Returns Policy',
    subtitle: 'Shop with Complete Confidence',
    description: 'Not satisfied? Return within 30 days for a full refund. No questions asked.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop',
    cta: 'Learn More',
    badge: 'Easy Returns',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative h-[500px] md:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {slide.badge}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary-200">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                  {slide.description}
                </p>
                <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl">
                  <ShoppingBag className="h-5 w-5" />
                  <span>{slide.cta}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
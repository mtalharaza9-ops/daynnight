'use client';

import { Shield, Truck, Headphones, RotateCcw, Award, Clock, CreditCard, Users } from 'lucide-react';

const features = [
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Round-the-clock assistance for all your queries and concerns',
    color: 'text-blue-600'
  },
  {
    icon: Truck,
    title: 'Fast & Secure Delivery',
    description: 'Quick delivery with secure packaging to your doorstep',
    color: 'text-green-600'
  },
  {
    icon: Award,
    title: '100% Original Products',
    description: 'Authentic products from verified brands and suppliers',
    color: 'text-purple-600'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free returns within 30 days of purchase',
    color: 'text-orange-600'
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your payment information is protected with bank-level security',
    color: 'text-red-600'
  },
  {
    icon: Clock,
    title: 'Same Day Delivery',
    description: 'Order before 2 PM and get same-day delivery in select areas',
    color: 'text-indigo-600'
  },
  {
    icon: CreditCard,
    title: 'Flexible Payment Options',
    description: 'Multiple payment methods including buy now, pay later options',
    color: 'text-teal-600'
  },
  {
    icon: Users,
    title: 'Trusted by Millions',
    description: 'Join over 2 million satisfied customers worldwide',
    color: 'text-pink-600'
  }
];

export default function WhyShopWithUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Shop With Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience. 
            Here's what makes us different from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center group"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Trusted & Certified
            </h3>
            <p className="text-gray-600">
              We maintain the highest standards of quality and security
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* SSL Certificate */}
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4 mb-2">
                <Shield className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-gray-900">SSL Secured</p>
              <p className="text-xs text-gray-600">256-bit encryption</p>
            </div>

            {/* Money Back Guarantee */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-lg p-4 mb-2">
                <RotateCcw className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Money Back</p>
              <p className="text-xs text-gray-600">30-day guarantee</p>
            </div>

            {/* Award */}
            <div className="text-center">
              <div className="bg-yellow-100 rounded-lg p-4 mb-2">
                <Award className="h-8 w-8 text-yellow-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Award Winner</p>
              <p className="text-xs text-gray-600">Best E-commerce 2024</p>
            </div>

            {/* Customer Rating */}
            <div className="text-center">
              <div className="bg-purple-100 rounded-lg p-4 mb-2">
                <Users className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <p className="text-sm font-semibold text-gray-900">4.8/5 Rating</p>
              <p className="text-xs text-gray-600">50K+ reviews</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join millions of satisfied customers and start shopping with confidence today!
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
              Start Shopping Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
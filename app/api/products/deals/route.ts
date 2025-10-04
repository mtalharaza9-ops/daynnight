import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

// GET /api/products/deals - Fetch deal products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // flash, daily, weekly, all
    const limit = parseInt(searchParams.get('limit') || '12');

    // Get all products first
    const result = await getProducts();
    
    if (!result.success) {
      // Return fallback data if database fails
      const fallbackProducts = [
        {
          id: 13,
          name: "Night Vision Sleep Mask",
          price: 19.99,
          originalPrice: 39.99,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 450,
          category: "Sleep",
          description: "Premium blackout sleep mask with cooling gel",
          discount: 50,
          dealType: "flash",
          dealEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
          stock: 15,
          originalStock: 50
        },
        {
          id: 14,
          name: "Morning Boost Coffee Blend",
          price: 16.99,
          originalPrice: 24.99,
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviews: 320,
          category: "Wellness",
          description: "Organic coffee blend for energy and focus",
          discount: 32,
          dealType: "daily",
          dealEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours from now
          stock: 28,
          originalStock: 100
        },
        {
          id: 15,
          name: "Smart Night Light",
          price: 34.99,
          originalPrice: 49.99,
          image: "/api/placeholder/300/300",
          rating: 4.6,
          reviews: 280,
          category: "Electronics",
          description: "Motion-activated LED night light with timer",
          discount: 30,
          dealType: "weekly",
          dealEndTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
          stock: 42,
          originalStock: 75
        },
        {
          id: 16,
          name: "Relaxation Essential Oil Set",
          price: 27.99,
          originalPrice: 44.99,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviews: 380,
          category: "Wellness",
          description: "Lavender, chamomile, and eucalyptus oils",
          discount: 38,
          dealType: "flash",
          dealEndTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
          stock: 8,
          originalStock: 30
        },
        {
          id: 17,
          name: "Memory Foam Pillow",
          price: 39.99,
          originalPrice: 59.99,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 520,
          category: "Sleep",
          description: "Contour memory foam pillow for neck support",
          discount: 33,
          dealType: "daily",
          dealEndTime: new Date(Date.now() + 20 * 60 * 60 * 1000).toISOString(), // 20 hours from now
          stock: 35,
          originalStock: 80
        },
        {
          id: 18,
          name: "Blue Light Blocking Glasses",
          price: 22.99,
          originalPrice: 34.99,
          image: "/api/placeholder/300/300",
          rating: 4.5,
          reviews: 190,
          category: "Electronics",
          description: "Reduce eye strain from digital screens",
          discount: 34,
          dealType: "weekly",
          dealEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
          stock: 55,
          originalStock: 120
        }
      ];

      let filteredProducts = [...fallbackProducts];
      
      // Filter by deal type
      if (type !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.dealType === type
        );
      }

      // Sort by discount percentage (highest first)
      filteredProducts.sort((a, b) => b.discount - a.discount);

      return NextResponse.json({
        success: true,
        data: filteredProducts.slice(0, limit),
        count: filteredProducts.length,
        fallback: true,
        filters: { type }
      });
    }

    let products = result.data || [];
    
    // Add mock deal data if not present
    products = products.map((product: any, index: number) => {
      const discountPercent = Math.floor(Math.random() * 50) + 20; // 20-70% discount
      const originalPrice = product.price ? product.price / (1 - discountPercent / 100) : 50;
      const dealTypes = ['flash', 'daily', 'weekly'];
      const dealType = dealTypes[Math.floor(Math.random() * dealTypes.length)];
      
      let dealEndTime;
      switch (dealType) {
        case 'flash':
          dealEndTime = new Date(Date.now() + Math.floor(Math.random() * 8) * 60 * 60 * 1000); // 0-8 hours
          break;
        case 'daily':
          dealEndTime = new Date(Date.now() + (Math.floor(Math.random() * 24) + 12) * 60 * 60 * 1000); // 12-36 hours
          break;
        case 'weekly':
          dealEndTime = new Date(Date.now() + (Math.floor(Math.random() * 7) + 1) * 24 * 60 * 60 * 1000); // 1-7 days
          break;
        default:
          dealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }

      const originalStock = Math.floor(Math.random() * 100) + 20;
      const stock = Math.floor(originalStock * (Math.random() * 0.7 + 0.1)); // 10-80% of original stock

      return {
        ...product,
        originalPrice: parseFloat(originalPrice.toFixed(2)),
        discount: discountPercent,
        dealType,
        dealEndTime: dealEndTime.toISOString(),
        stock,
        originalStock,
        reviews: product.reviews || Math.floor(Math.random() * 500) + 50,
        rating: product.rating || (4.0 + Math.random() * 1.0)
      };
    });

    // Filter by deal type
    if (type !== 'all') {
      products = products.filter((product: any) => product.dealType === type);
    }

    // Sort by discount percentage (highest first)
    products.sort((a: any, b: any) => b.discount - a.discount);

    return NextResponse.json({
      success: true,
      data: products.slice(0, limit),
      count: products.length,
      filters: { type }
    });
  } catch (error) {
    console.error('Deals API Error:', error);
    
    // Return fallback data on error
    const fallbackProducts = [
      {
        id: 13,
        name: "Night Vision Sleep Mask",
        price: 19.99,
        originalPrice: 39.99,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        reviews: 450,
        category: "Sleep",
        discount: 50,
        dealType: "flash",
        dealEndTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        stock: 15,
        originalStock: 50
      },
      {
        id: 14,
        name: "Morning Boost Coffee Blend",
        price: 16.99,
        originalPrice: 24.99,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 320,
        category: "Wellness",
        discount: 32,
        dealType: "daily",
        dealEndTime: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
        stock: 28,
        originalStock: 100
      }
    ];

    return NextResponse.json({
      success: true,
      data: fallbackProducts,
      count: fallbackProducts.length,
      fallback: true,
      error: 'Using fallback data'
    });
  }
}
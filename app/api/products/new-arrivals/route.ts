import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

// GET /api/products/new-arrivals - Fetch new arrival products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFilter = searchParams.get('time') || 'all';
    const category = searchParams.get('category') || 'all';
    const limit = parseInt(searchParams.get('limit') || '12');

    // Get all products first
    const result = await getProducts();
    
    if (!result.success) {
      // Return fallback data if database fails
      const fallbackProducts = [
        {
          id: 7,
          name: "Midnight Recovery Serum",
          price: 52.99,
          originalPrice: 69.99,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviews: 340,
          category: "Skincare",
          description: "Advanced night repair serum with retinol",
          isNew: true,
          addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
        },
        {
          id: 8,
          name: "Dawn Light Therapy Lamp",
          price: 79.99,
          originalPrice: 99.99,
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviews: 180,
          category: "Electronics",
          description: "Simulate natural sunrise for better mornings",
          isNew: true,
          addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
        },
        {
          id: 9,
          name: "Organic Sleep Tea Blend",
          price: 18.99,
          originalPrice: 24.99,
          image: "/api/placeholder/300/300",
          rating: 4.6,
          reviews: 95,
          category: "Wellness",
          description: "Herbal tea blend for peaceful sleep",
          isNew: true,
          addedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
        },
        {
          id: 10,
          name: "Smart Alarm Clock",
          price: 64.99,
          originalPrice: 84.99,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 220,
          category: "Electronics",
          description: "Wake up naturally with smart light and sound",
          isNew: true,
          addedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
        },
        {
          id: 11,
          name: "Bamboo Pajama Set",
          price: 42.99,
          originalPrice: 56.99,
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviews: 150,
          category: "Clothing",
          description: "Eco-friendly bamboo sleepwear for comfort",
          isNew: true,
          addedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 2 weeks ago
        },
        {
          id: 12,
          name: "Vitamin D3 Supplements",
          price: 21.99,
          originalPrice: 29.99,
          image: "/api/placeholder/300/300",
          rating: 4.5,
          reviews: 280,
          category: "Wellness",
          description: "Daily vitamin D3 for energy and immunity",
          isNew: true,
          addedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString() // 3 weeks ago
        }
      ];

      let filteredProducts = [...fallbackProducts];
      
      // Filter by time
      const now = new Date();
      switch (timeFilter) {
        case 'today':
          filteredProducts = filteredProducts.filter(product => {
            const addedDate = new Date(product.addedDate);
            return now.getTime() - addedDate.getTime() < 24 * 60 * 60 * 1000;
          });
          break;
        case 'week':
          filteredProducts = filteredProducts.filter(product => {
            const addedDate = new Date(product.addedDate);
            return now.getTime() - addedDate.getTime() < 7 * 24 * 60 * 60 * 1000;
          });
          break;
        case 'month':
          filteredProducts = filteredProducts.filter(product => {
            const addedDate = new Date(product.addedDate);
            return now.getTime() - addedDate.getTime() < 30 * 24 * 60 * 60 * 1000;
          });
          break;
      }

      // Filter by category
      if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Sort by newest first
      filteredProducts.sort((a, b) => 
        new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
      );

      return NextResponse.json({
        success: true,
        data: filteredProducts.slice(0, limit),
        count: filteredProducts.length,
        fallback: true,
        filters: { time: timeFilter, category }
      });
    }

    let products = result.data || [];
    
    // Add mock new arrival data if not present
    products = products.map((product: any, index: number) => ({
      ...product,
      isNew: true,
      addedDate: product.addedDate || new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      reviews: product.reviews || Math.floor(Math.random() * 500) + 50,
      rating: product.rating || (4.0 + Math.random() * 1.0)
    }));

    // Filter by time
    const now = new Date();
    switch (timeFilter) {
      case 'today':
        products = products.filter((product: any) => {
          const addedDate = new Date(product.addedDate);
          return now.getTime() - addedDate.getTime() < 24 * 60 * 60 * 1000;
        });
        break;
      case 'week':
        products = products.filter((product: any) => {
          const addedDate = new Date(product.addedDate);
          return now.getTime() - addedDate.getTime() < 7 * 24 * 60 * 60 * 1000;
        });
        break;
      case 'month':
        products = products.filter((product: any) => {
          const addedDate = new Date(product.addedDate);
          return now.getTime() - addedDate.getTime() < 30 * 24 * 60 * 60 * 1000;
        });
        break;
    }

    // Filter by category
    if (category !== 'all') {
      products = products.filter((product: any) => 
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by newest first
    products.sort((a: any, b: any) => 
      new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    );

    return NextResponse.json({
      success: true,
      data: products.slice(0, limit),
      count: products.length,
      filters: { time: timeFilter, category }
    });
  } catch (error) {
    console.error('New Arrivals API Error:', error);
    
    // Return fallback data on error
    const fallbackProducts = [
      {
        id: 7,
        name: "Midnight Recovery Serum",
        price: 52.99,
        originalPrice: 69.99,
        image: "/api/placeholder/300/300",
        rating: 4.9,
        reviews: 340,
        category: "Skincare",
        isNew: true,
        addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 8,
        name: "Dawn Light Therapy Lamp",
        price: 79.99,
        originalPrice: 99.99,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 180,
        category: "Electronics",
        isNew: true,
        addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
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
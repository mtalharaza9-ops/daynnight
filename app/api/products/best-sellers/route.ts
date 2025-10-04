import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

// GET /api/products/best-sellers - Fetch best-selling products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'sales';
    const limit = parseInt(searchParams.get('limit') || '12');

    // Get all products first
    const result = await getProducts();
    
    if (!result.success) {
      // Return fallback data if database fails
      const fallbackProducts = [
        {
          id: 1,
          name: "Premium Sleep Mask",
          price: 29.99,
          originalPrice: 39.99,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 1250,
          sales: 2500,
          category: "Sleep",
          description: "Ultra-soft silk sleep mask for perfect darkness"
        },
        {
          id: 2,
          name: "Morning Energy Boost",
          price: 24.99,
          originalPrice: 34.99,
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviews: 890,
          sales: 2100,
          category: "Wellness",
          description: "Natural energy supplement for morning vitality"
        },
        {
          id: 3,
          name: "Day & Night Moisturizer",
          price: 45.99,
          originalPrice: 59.99,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviews: 1580,
          sales: 1950,
          category: "Skincare",
          description: "Dual-formula moisturizer for 24-hour skin care"
        },
        {
          id: 4,
          name: "Smart Sleep Tracker",
          price: 89.99,
          originalPrice: 119.99,
          image: "/api/placeholder/300/300",
          rating: 4.6,
          reviews: 720,
          sales: 1800,
          category: "Electronics",
          description: "Advanced sleep monitoring with app integration"
        },
        {
          id: 5,
          name: "Aromatherapy Diffuser",
          price: 34.99,
          originalPrice: 49.99,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 950,
          sales: 1650,
          category: "Home",
          description: "Essential oil diffuser for relaxation and wellness"
        },
        {
          id: 6,
          name: "Blue Light Glasses",
          price: 39.99,
          originalPrice: 54.99,
          image: "/api/placeholder/300/300",
          rating: 4.5,
          reviews: 680,
          sales: 1500,
          category: "Electronics",
          description: "Protect your eyes from digital screen strain"
        }
      ];

      let sortedProducts = [...fallbackProducts];
      
      // Sort products based on the sort parameter
      switch (sort) {
        case 'sales':
          sortedProducts.sort((a, b) => b.sales - a.sales);
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'price':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          sortedProducts.sort((a, b) => b.sales - a.sales);
      }

      return NextResponse.json({
        success: true,
        data: sortedProducts.slice(0, limit),
        count: sortedProducts.length,
        fallback: true
      });
    }

    let products = result.data || [];
    
    // Add mock sales data if not present
    products = products.map((product: any, index: number) => ({
      ...product,
      sales: product.sales || Math.floor(Math.random() * 2000) + 500,
      reviews: product.reviews || Math.floor(Math.random() * 1000) + 100,
      rating: product.rating || (4.0 + Math.random() * 1.0)
    }));

    // Sort products based on the sort parameter
    switch (sort) {
      case 'sales':
        products.sort((a: any, b: any) => b.sales - a.sales);
        break;
      case 'rating':
        products.sort((a: any, b: any) => b.rating - a.rating);
        break;
      case 'price':
        products.sort((a: any, b: any) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a: any, b: any) => b.price - a.price);
        break;
      default:
        products.sort((a: any, b: any) => b.sales - a.sales);
    }

    return NextResponse.json({
      success: true,
      data: products.slice(0, limit),
      count: products.length,
      sort: sort
    });
  } catch (error) {
    console.error('Best Sellers API Error:', error);
    
    // Return fallback data on error
    const fallbackProducts = [
      {
        id: 1,
        name: "Premium Sleep Mask",
        price: 29.99,
        originalPrice: 39.99,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        reviews: 1250,
        sales: 2500,
        category: "Sleep"
      },
      {
        id: 2,
        name: "Morning Energy Boost",
        price: 24.99,
        originalPrice: 34.99,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        reviews: 890,
        sales: 2100,
        category: "Wellness"
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
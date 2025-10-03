import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase, seedDatabase, getProducts, searchProducts } from '@/lib/db';

// GET /api/products - Fetch all products or search products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    let result;
    if (query) {
      result = await searchProducts(query);
    } else {
      result = await getProducts();
    }

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch products', details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      count: result.data?.length || 0,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products - Initialize database and seed data
export async function POST(request: NextRequest) {
  try {
    // Initialize database tables
    const initResult = await initializeDatabase();
    if (!initResult.success) {
      return NextResponse.json(
        { error: 'Failed to initialize database', details: initResult.error },
        { status: 500 }
      );
    }

    // Seed database with sample data
    const seedResult = await seedDatabase();
    if (!seedResult.success) {
      return NextResponse.json(
        { error: 'Failed to seed database', details: seedResult.error },
        { status: 500 }
      );
    }

    // Fetch the seeded products to return
    const productsResult = await getProducts();
    if (!productsResult.success) {
      return NextResponse.json(
        { error: 'Database initialized but failed to fetch products', details: productsResult.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized and seeded successfully',
      data: productsResult.data,
      count: productsResult.data?.length || 0,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
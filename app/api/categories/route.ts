import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/db';

// GET /api/categories - Fetch all categories
export async function GET(request: NextRequest) {
  try {
    const result = await getCategories();

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to fetch categories', details: result.error },
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
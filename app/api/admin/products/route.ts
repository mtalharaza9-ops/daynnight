import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createProduct } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { name, description, price, category, inStock, image, rating, reviews } = await request.json();

    if (!name || !description || !price || !category || !image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createProduct({
      name,
      description,
      price,
      category,
      inStock: inStock ?? true,
      image,
      rating: rating ?? 5,
      reviews: reviews ?? 0
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Product created successfully', product: result.data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
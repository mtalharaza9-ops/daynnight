import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCartItems, addToCart, removeFromCart } from '@/lib/db';

// GET /api/cart - Get user's cart items
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await getCartItems(session.user.email);
    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const result = await addToCart(session.user.email, parseInt(productId), quantity);
    if (result.success) {
      return NextResponse.json({ message: 'Item added to cart' });
    } else {
      return NextResponse.json({ error: 'Failed to add item to cart' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, quantity } = await request.json();

    if (!productId || quantity < 1) {
      return NextResponse.json({ error: 'Invalid product ID or quantity' }, { status: 400 });
    }

    // Remove existing item and add with new quantity
    await removeFromCart(session.user.email, parseInt(productId));
    const result = await addToCart(session.user.email, parseInt(productId), quantity);
    
    if (result.success) {
      return NextResponse.json({ message: 'Cart updated' });
    } else {
      return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/cart - Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const result = await removeFromCart(session.user.email, parseInt(productId));
    if (result.success) {
      return NextResponse.json({ message: 'Item removed from cart' });
    } else {
      return NextResponse.json({ error: 'Failed to remove item from cart' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchCartItems();
  }, [session, status, router]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        setError('Failed to fetch cart items');
      }
    } catch (error) {
      setError('An error occurred while fetching cart items');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        fetchCartItems();
      } else {
        setError('Failed to update quantity');
      }
    } catch (error) {
      setError('An error occurred while updating quantity');
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        fetchCartItems();
      } else {
        setError('Failed to remove item from cart');
      }
    } catch (error) {
      setError('An error occurred while removing item');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-xl mb-4">Your cart is empty</div>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-lg font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-gray-900">
                  Total: ${getTotalPrice().toFixed(2)}
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => router.push('/')}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement checkout functionality
                      alert('Checkout functionality coming soon!');
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
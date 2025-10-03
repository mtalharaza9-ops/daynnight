'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewProduct() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    image: '',
    rating: 5,
    reviews: 0
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-2 text-gray-600">Create a new product for your store</p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.01"
                  min="0"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Beauty">Beauty</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                id="inStock"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={formData.inStock}
                onChange={handleChange}
              />
              <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                In Stock
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
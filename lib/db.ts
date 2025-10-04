import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

// Check if Postgres is properly configured
function checkPostgresConnection() {
  const postgresUrl = process.env.POSTGRES_URL;
  return postgresUrl && !postgresUrl.includes('username') && !postgresUrl.includes('password');
}

// Initialize memory data for development
async function initializeMemoryData() {
  memoryProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics',
      rating: 4.3,
      reviews: 89,
      inStock: true
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      category: 'Accessories',
      rating: 4.7,
      reviews: 156,
      inStock: true
    }
  ];

  memoryCategories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
    },
    {
      id: 2,
      name: 'Accessories',
      description: 'Essential accessories for daily use',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    }
  ];

  // Create default admin user for development
  const adminPassword = await bcrypt.hash('admin123', 10);
  memoryUsers = [
    {
      id: 1,
      email: 'admin@daynnight.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date()
    }
  ];
}

// For development, we'll use a simple in-memory fallback when Postgres is not available
let isPostgresAvailable = checkPostgresConnection();

// Simple in-memory storage for development
let memoryProducts: Product[] = [];
let memoryCategories: Category[] = [];
let memoryUsers: User[] = [];
let memoryCartItems: CartItem[] = [];

// Initialize memory data immediately if Postgres is not available
if (!isPostgresAvailable) {
  initializeMemoryData().catch(console.error);
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
}

// Initialize database tables
export async function initializeDatabase() {
  // Check if Postgres is properly configured
  if (!isPostgresAvailable) {
    console.log('Postgres not configured, using in-memory storage for development');
    // Initialize with sample data
    initializeMemoryData();
    return { success: true };
  }

  try {
    // Create products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(100),
        rating DECIMAL(2, 1) DEFAULT 0,
        reviews INTEGER DEFAULT 0,
        in_stock BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create cart_items table
    await sql`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
}

// Seed initial data
export async function seedDatabase() {
  try {
    // Insert sample categories
    const categories = [
      {
        name: 'Electronics',
        description: 'Latest gadgets and electronic devices',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      },
      {
        name: 'Clothing',
        description: 'Fashion and apparel for all occasions',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      },
      {
        name: 'Home & Garden',
        description: 'Everything for your home and garden',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      },
      {
        name: 'Sports',
        description: 'Sports equipment and fitness gear',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      },
    ];

    for (const category of categories) {
      await sql`
        INSERT INTO categories (name, description, image)
        VALUES (${category.name}, ${category.description}, ${category.image})
        ON CONFLICT (name) DO NOTHING
      `;
    }

    // Insert sample products
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: 'Electronics',
        rating: 4.5,
        reviews: 128,
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        category: 'Electronics',
        rating: 4.3,
        reviews: 89,
      },
      {
        name: 'Designer T-Shirt',
        description: 'Premium cotton t-shirt with modern design',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        category: 'Clothing',
        rating: 4.7,
        reviews: 203,
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        category: 'Sports',
        rating: 4.6,
        reviews: 156,
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with programmable settings',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        category: 'Home & Garden',
        rating: 4.4,
        reviews: 74,
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for comfortable workouts',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
        category: 'Sports',
        rating: 4.8,
        reviews: 312,
      },
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (name, description, price, image, category, rating, reviews)
        VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image}, ${product.category}, ${product.rating}, ${product.reviews})
        ON CONFLICT DO NOTHING
      `;
    }

    // Create default admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await sql`
      INSERT INTO users (email, name, password, role)
      VALUES ('admin@daynnight.com', 'Admin User', ${adminPassword}, 'admin')
      ON CONFLICT (email) DO NOTHING
    `;

    console.log('Database seeded successfully');
    return { success: true };
  } catch (error) {
    console.error('Error seeding database:', error);
    return { success: false, error };
  }
}

// Get all products
export async function getProducts() {
  if (!isPostgresAvailable) {
    return { success: true, data: memoryProducts };
  }

  try {
    const { rows } = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error };
  }
}

// Get all categories
export async function getCategories() {
  if (!isPostgresAvailable) {
    return { success: true, data: memoryCategories };
  }

  try {
    const { rows } = await sql`
      SELECT * FROM categories 
      ORDER BY name ASC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { success: false, error };
  }
}

// Get products by category
export async function getProductsByCategory(category: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM products 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return { success: false, error };
  }
}

// Search products
export async function searchProducts(query: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM products 
      WHERE name ILIKE ${`%${query}%`} 
         OR description ILIKE ${`%${query}%`}
         OR category ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error searching products:', error);
    return { success: false, error };
  }
}

// User authentication functions
export async function createUser(email: string, name: string, password: string) {
  // Check if Postgres is available
  if (!isPostgresAvailable) {
    // Use in-memory storage for development
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Check if user already exists
    const existingUser = memoryUsers.find(user => user.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    const newUser = {
      id: memoryUsers.length + 1,
      email,
      name,
      password: hashedPassword,
      role: 'user' as const,
      createdAt: new Date()
    };
    
    memoryUsers.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, data: userWithoutPassword };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await sql`
      INSERT INTO users (email, name, password, role)
      VALUES (${email}, ${name}, ${hashedPassword}, 'user')
      RETURNING id, email, name, role, created_at
    `;
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    return { success: true, data: rows[0] || null };
  } catch (error) {
    console.error('Error fetching user by email, falling back to memory:', error);
    // Fallback to in-memory storage
    const user = memoryUsers.find(u => u.email === email);
    if (user) {
      return { 
        success: true, 
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
          created_at: user.createdAt
        }
      };
    }
    return { success: true, data: null };
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

// Cart functions
export async function addToCart(userEmail: string, productId: number, quantity: number = 1) {
  try {
    const { rows } = await sql`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (
        (SELECT id FROM users WHERE email = ${userEmail}), 
        ${productId}, 
        ${quantity}
      )
      ON CONFLICT (user_id, product_id) 
      DO UPDATE SET quantity = cart_items.quantity + ${quantity}
      RETURNING *
    `;
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error };
  }
}

export async function getCartItems(userEmail: string) {
  try {
    const { rows } = await sql`
      SELECT ci.id, ci.product_id as "productId", ci.quantity, 
             json_build_object(
               'id', p.id,
               'name', p.name,
               'price', p.price,
               'image', p.image
             ) as product
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      JOIN users u ON ci.user_id = u.id
      WHERE u.email = ${userEmail}
      ORDER BY ci.created_at DESC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return { success: false, error };
  }
}

export async function removeFromCart(userEmail: string, productId: number) {
  try {
    await sql`
      DELETE FROM cart_items 
      WHERE user_id = (SELECT id FROM users WHERE email = ${userEmail}) 
      AND product_id = ${productId}
    `;
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error };
  }
}

// Admin functions
export async function getAllUsers() {
  try {
    const { rows } = await sql`
      SELECT id, email, name, role, created_at FROM users
      ORDER BY created_at DESC
    `;
    return { success: true, data: rows };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error };
  }
}

export async function createProduct(product: Omit<Product, 'id'>) {
  try {
    const { rows } = await sql`
      INSERT INTO products (name, description, price, image, category, rating, reviews)
      VALUES (${product.name}, ${product.description}, ${product.price}, ${product.image}, ${product.category}, ${product.rating}, ${product.reviews})
      RETURNING *
    `;
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error };
  }
}

export async function updateProduct(id: number, product: Partial<Product>) {
  try {
    const { rows } = await sql`
      UPDATE products 
      SET name = COALESCE(${product.name}, name),
          description = COALESCE(${product.description}, description),
          price = COALESCE(${product.price}, price),
          image = COALESCE(${product.image}, image),
          category = COALESCE(${product.category}, category),
          rating = COALESCE(${product.rating}, rating),
          reviews = COALESCE(${product.reviews}, reviews),
          in_stock = COALESCE(${product.inStock}, in_stock)
      WHERE id = ${id}
      RETURNING *
    `;
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error };
  }
}

export async function deleteProduct(id: number) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
}
"use strict";exports.id=363,exports.ids=[363],exports.modules={69363:(e,r,t)=>{t.d(r,{AW:()=>getAllUsers,CP:()=>getCategories,CX:()=>getUserByEmail,Gv:()=>verifyPassword,Ir:()=>deleteProduct,Xp:()=>getProducts,Xq:()=>addToCart,fq:()=>getCartItems,h2:()=>removeFromCart,nM:()=>updateProduct,r4:()=>createUser,ry:()=>createProduct,s3:()=>searchProducts,vQ:()=>seedDatabase,xN:()=>initializeDatabase});var a=t(7590),s=t(45764);async function initializeDatabase(){try{return await a.i6`
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
    `,await a.i6`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,await a.i6`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,await a.i6`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,await a.i6`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,console.log("Database tables initialized successfully"),{success:!0}}catch(e){return console.error("Error initializing database:",e),{success:!1,error:e}}}async function seedDatabase(){try{for(let e of[{name:"Electronics",description:"Latest gadgets and electronic devices",image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400"},{name:"Clothing",description:"Fashion and apparel for all occasions",image:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"},{name:"Home & Garden",description:"Everything for your home and garden",image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"},{name:"Sports",description:"Sports equipment and fitness gear",image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"}])await a.i6`
        INSERT INTO categories (name, description, image)
        VALUES (${e.name}, ${e.description}, ${e.image})
        ON CONFLICT (name) DO NOTHING
      `;for(let e of[{name:"Wireless Headphones",description:"High-quality wireless headphones with noise cancellation",price:199.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",category:"Electronics",rating:4.5,reviews:128},{name:"Smart Watch",description:"Feature-rich smartwatch with health monitoring",price:299.99,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",category:"Electronics",rating:4.3,reviews:89},{name:"Designer T-Shirt",description:"Premium cotton t-shirt with modern design",price:49.99,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",category:"Clothing",rating:4.7,reviews:203},{name:"Running Shoes",description:"Comfortable running shoes for all terrains",price:129.99,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",category:"Sports",rating:4.6,reviews:156},{name:"Coffee Maker",description:"Automatic coffee maker with programmable settings",price:89.99,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",category:"Home & Garden",rating:4.4,reviews:74},{name:"Yoga Mat",description:"Non-slip yoga mat for comfortable workouts",price:39.99,image:"https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",category:"Sports",rating:4.8,reviews:312}])await a.i6`
        INSERT INTO products (name, description, price, image, category, rating, reviews)
        VALUES (${e.name}, ${e.description}, ${e.price}, ${e.image}, ${e.category}, ${e.rating}, ${e.reviews})
        ON CONFLICT DO NOTHING
      `;let e=await s.ZP.hash("admin123",10);return await a.i6`
      INSERT INTO users (email, name, password, role)
      VALUES ('admin@daynnight.com', 'Admin User', ${e}, 'admin')
      ON CONFLICT (email) DO NOTHING
    `,console.log("Database seeded successfully"),{success:!0}}catch(e){return console.error("Error seeding database:",e),{success:!1,error:e}}}async function getProducts(){try{let{rows:e}=await a.i6`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `;return{success:!0,data:e}}catch(e){return console.error("Error fetching products:",e),{success:!1,error:e}}}async function getCategories(){try{let{rows:e}=await a.i6`
      SELECT * FROM categories 
      ORDER BY name ASC
    `;return{success:!0,data:e}}catch(e){return console.error("Error fetching categories:",e),{success:!1,error:e}}}async function searchProducts(e){try{let{rows:r}=await a.i6`
      SELECT * FROM products 
      WHERE name ILIKE ${`%${e}%`} 
         OR description ILIKE ${`%${e}%`}
         OR category ILIKE ${`%${e}%`}
      ORDER BY created_at DESC
    `;return{success:!0,data:r}}catch(e){return console.error("Error searching products:",e),{success:!1,error:e}}}async function createUser(e,r,t){try{let i=await s.ZP.hash(t,10),{rows:c}=await a.i6`
      INSERT INTO users (email, name, password, role)
      VALUES (${e}, ${r}, ${i}, 'user')
      RETURNING id, email, name, role, created_at
    `;return{success:!0,data:c[0]}}catch(e){return console.error("Error creating user:",e),{success:!1,error:e}}}async function getUserByEmail(e){try{let{rows:r}=await a.i6`
      SELECT * FROM users WHERE email = ${e}
    `;return{success:!0,data:r[0]||null}}catch(e){return console.error("Error fetching user by email:",e),{success:!1,error:e}}}async function verifyPassword(e,r){return s.ZP.compare(e,r)}async function addToCart(e,r,t=1){try{let{rows:s}=await a.i6`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (
        (SELECT id FROM users WHERE email = ${e}), 
        ${r}, 
        ${t}
      )
      ON CONFLICT (user_id, product_id) 
      DO UPDATE SET quantity = cart_items.quantity + ${t}
      RETURNING *
    `;return{success:!0,data:s[0]}}catch(e){return console.error("Error adding to cart:",e),{success:!1,error:e}}}async function getCartItems(e){try{let{rows:r}=await a.i6`
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
      WHERE u.email = ${e}
      ORDER BY ci.created_at DESC
    `;return{success:!0,data:r}}catch(e){return console.error("Error fetching cart items:",e),{success:!1,error:e}}}async function removeFromCart(e,r){try{return await a.i6`
      DELETE FROM cart_items 
      WHERE user_id = (SELECT id FROM users WHERE email = ${e}) 
      AND product_id = ${r}
    `,{success:!0}}catch(e){return console.error("Error removing from cart:",e),{success:!1,error:e}}}async function getAllUsers(){try{let{rows:e}=await a.i6`
      SELECT id, email, name, role, created_at FROM users
      ORDER BY created_at DESC
    `;return{success:!0,data:e}}catch(e){return console.error("Error fetching users:",e),{success:!1,error:e}}}async function createProduct(e){try{let{rows:r}=await a.i6`
      INSERT INTO products (name, description, price, image, category, rating, reviews)
      VALUES (${e.name}, ${e.description}, ${e.price}, ${e.image}, ${e.category}, ${e.rating}, ${e.reviews})
      RETURNING *
    `;return{success:!0,data:r[0]}}catch(e){return console.error("Error creating product:",e),{success:!1,error:e}}}async function updateProduct(e,r){try{let{rows:t}=await a.i6`
      UPDATE products 
      SET name = COALESCE(${r.name}, name),
          description = COALESCE(${r.description}, description),
          price = COALESCE(${r.price}, price),
          image = COALESCE(${r.image}, image),
          category = COALESCE(${r.category}, category),
          rating = COALESCE(${r.rating}, rating),
          reviews = COALESCE(${r.reviews}, reviews),
          in_stock = COALESCE(${r.inStock}, in_stock)
      WHERE id = ${e}
      RETURNING *
    `;return{success:!0,data:t[0]}}catch(e){return console.error("Error updating product:",e),{success:!1,error:e}}}async function deleteProduct(e){try{return await a.i6`DELETE FROM products WHERE id = ${e}`,{success:!0}}catch(e){return console.error("Error deleting product:",e),{success:!1,error:e}}}}};
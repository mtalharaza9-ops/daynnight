# Day & Night Inc. - E-commerce Platform

A modern e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and Vercel Postgres.

## Features

- 🎨 Modern, responsive design
- 🛒 Product catalog with categories
- ⭐ Product ratings and reviews
- 🔍 Search functionality
- 📱 Mobile-first approach
- 🚀 Serverless architecture
- 💾 Vercel Postgres database

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: Vercel Postgres (Serverless)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Getting Started

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Vercel Postgres credentials.

3. **Initialize the database:**
   ```bash
   curl -X POST http://localhost:3000/api/products
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Deployment on Vercel

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

## Database Setup

The app uses Vercel Postgres (free tier). After deployment:

1. Create a Postgres database in Vercel dashboard
2. Copy the connection strings to your environment variables
3. Initialize the database by calling the `/api/products` POST endpoint

## Project Structure

```
├── app/
│   ├── api/products/          # API routes
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
├── lib/                    # Database utilities
└── public/                 # Static assets
```

## Features Implemented

- ✅ Header with navigation and search
- ✅ Hero banner with rotating slides
- ✅ Featured categories section
- ✅ Best sellers product grid
- ✅ Footer with links and newsletter
- ✅ Responsive design
- ✅ Database integration
- ✅ API endpoints

## Contact Information

- **Phone**: (516) 968-0205
- **Email**: support@daynightsupplies.com
- **Address**: Long Island, NY 11580

## Next Steps

- Add user authentication
- Implement shopping cart
- Add product detail pages
- Integrate payment processing
- Add admin dashboard
- Implement order management
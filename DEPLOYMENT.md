# Deployment Guide for Day & Night E-commerce

This guide will help you deploy the Day & Night e-commerce platform to Vercel with serverless PostgreSQL.

## Prerequisites

1. A Vercel account
2. A GitHub repository with your code
3. Access to Vercel's PostgreSQL service

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Create a new project or select your existing project
3. Navigate to the "Storage" tab
4. Click "Create Database" and select "Postgres"
5. Follow the setup wizard to create your database

### Option B: External PostgreSQL Provider

You can also use services like:
- Neon (neon.tech)
- Supabase
- Railway
- PlanetScale (MySQL alternative)

## Step 2: Environment Variables

Set up the following environment variables in your Vercel project:

### Required Variables

```bash
# Database (from Vercel Postgres or your provider)
POSTGRES_URL="postgres://username:password@hostname:port/database"
POSTGRES_PRISMA_URL="postgres://username:password@hostname:port/database?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://username:password@hostname:port/database"
POSTGRES_USER="username"
POSTGRES_HOST="hostname"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"
```

### Setting Environment Variables in Vercel

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable with its corresponding value
4. Make sure to set them for all environments (Production, Preview, Development)

## Step 3: Database Initialization

After deployment, you need to initialize your database:

1. Your app will automatically create tables on first API call
2. The default admin user will be created with:
   - Email: admin@daynnight.com
   - Password: admin123
   - **Important**: Change this password immediately after first login

## Step 4: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically deploy on every push to main branch

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Step 5: Post-Deployment Setup

1. Visit your deployed application
2. Test the database connection by visiting `/api/products`
3. Sign up for a new account or use the admin credentials
4. Access the admin panel at `/admin` with admin credentials
5. Add your products and categories

## Features Included

### User Authentication
- User registration and login
- Admin role management
- Protected routes with middleware

### Admin Panel
- Product management (CRUD operations)
- User management
- Dashboard with statistics

### E-commerce Features
- Product catalog
- Category browsing
- Search functionality
- Responsive design

## Security Notes

1. **Change default admin password** immediately after deployment
2. Use a strong `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
3. Enable HTTPS (Vercel provides this automatically)
4. Regularly update dependencies

## Troubleshooting

### Database Connection Issues
- Verify all environment variables are set correctly
- Check database URL format
- Ensure database is accessible from Vercel's servers

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your domain
- Check `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

### Build Errors
- Check TypeScript errors in the build logs
- Verify all dependencies are in package.json
- Check for missing environment variables

## Monitoring and Maintenance

1. Monitor your application through Vercel's dashboard
2. Set up error tracking (consider Sentry integration)
3. Regularly backup your database
4. Monitor database usage and upgrade plan if needed

## Support

For issues related to:
- Vercel deployment: Check Vercel documentation
- Database issues: Check your database provider's documentation
- Application bugs: Review the application logs in Vercel dashboard
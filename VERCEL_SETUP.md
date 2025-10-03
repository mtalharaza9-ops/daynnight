# Vercel Deployment Setup Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mtalharaza9-ops/daynnight)

### Option 2: Manual Setup

## 📋 Prerequisites
- Vercel account
- GitHub repository connected
- PostgreSQL database (Vercel Postgres or external)

## 🔧 Environment Variables Setup

In your Vercel dashboard, add these environment variables:

### Database Configuration
```
POSTGRES_URL=postgres://username:password@hostname:port/database
POSTGRES_PRISMA_URL=postgres://username:password@hostname:port/database?pgbouncer=true&connect_timeout=15
POSTGRES_URL_NON_POOLING=postgres://username:password@hostname:port/database
POSTGRES_USER=your_username
POSTGRES_HOST=your_hostname
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=your_database_name
```

### Authentication Configuration
```
NEXTAUTH_SECRET=your-super-secret-key-here-minimum-32-characters
NEXTAUTH_URL=https://your-app-name.vercel.app
```

## 🗄️ Database Setup Options

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Storage tab
3. Create a new Postgres database
4. Copy the connection strings to your environment variables

### Option B: External Database
Use any PostgreSQL provider (Supabase, Railway, PlanetScale, etc.)

## 🔄 Deployment Steps

1. **Connect Repository**
   ```bash
   # If not already connected, link your repo
   vercel --prod
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all the variables listed above

3. **Deploy**
   - Push to main branch triggers automatic deployment
   - Or manually deploy: `vercel --prod`

## 🛠️ Build Configuration

The `vercel.json` file is already configured with:
- ✅ Next.js framework detection
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`
- ✅ API function timeout: 30 seconds
- ✅ Environment variable references
- ✅ Auto-deployment from main branch

## 🔍 Post-Deployment Checklist

1. **Verify Environment Variables**
   - Check Vercel dashboard for all required env vars
   - Ensure NEXTAUTH_URL matches your domain

2. **Test Authentication**
   - Visit `/auth/signin`
   - Try registering a new user
   - Test login functionality

3. **Test Database Connection**
   - Check if products load on homepage
   - Try creating a new product (admin panel)

4. **Admin Access**
   - Register first user
   - Manually set `role = 'admin'` in database
   - Access `/admin` panel

## 🚨 Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify database connection strings

### Authentication Issues
- Verify NEXTAUTH_SECRET is set (32+ characters)
- Check NEXTAUTH_URL matches your domain
- Ensure it starts with https:// in production

### Database Connection Errors
- Test connection strings locally first
- Check database firewall settings
- Verify SSL requirements

## 📊 Monitoring

- **Build Logs**: Vercel Dashboard → Deployments
- **Function Logs**: Vercel Dashboard → Functions
- **Analytics**: Vercel Dashboard → Analytics

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

## 🎯 Production Optimization

1. **Environment Variables**
   - Use Vercel's environment variable encryption
   - Set different values for preview/production

2. **Database**
   - Enable connection pooling
   - Set up read replicas if needed

3. **Monitoring**
   - Set up Vercel Analytics
   - Configure error tracking

Your Day & Night e-commerce platform is now ready for production! 🌟
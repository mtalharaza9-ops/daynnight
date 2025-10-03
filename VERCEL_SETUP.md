# Vercel Deployment Setup Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Automated Setup (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Automatically set up environment variables
npm run setup-vercel

# Deploy
vercel --prod
```

### Option 2: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mtalharaza9-ops/daynnight)

### Option 3: Manual Setup

## 📋 Prerequisites
- Vercel account
- GitHub repository connected
- PostgreSQL database (Vercel Postgres or external)
- `.env.local` file with your environment variables

## 🔧 Automated Environment Variables Setup

We've created an automated script that reads your `.env.local` file and sets up all environment variables in Vercel automatically!

### Steps:
1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```

4. **Run the automated setup**:
   ```bash
   npm run setup-vercel
   ```

The script will:
- ✅ Read your `.env.local` file
- ✅ Generate `NEXTAUTH_SECRET` if missing
- ✅ Auto-detect `NEXTAUTH_URL` from your Vercel project
- ✅ Set all environment variables for Production, Preview, and Development
- ✅ Provide a summary of what was configured

## 🔧 Manual Environment Variables Setup

**IMPORTANT**: Set these environment variables directly in your Vercel dashboard, NOT as secrets.

In your Vercel dashboard → Project → Settings → Environment Variables, add:

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

## ⚠️ Important Notes

1. **Environment Variables vs Secrets**: 
   - Use regular environment variables, NOT Vercel secrets (@secret_name)
   - Set values directly in the Vercel dashboard
   - Make sure to set for all environments (Production, Preview, Development)

2. **NEXTAUTH_SECRET Generation**:
   ```bash
   # Generate a secure secret
   openssl rand -base64 32
   ```

## 🗄️ Database Setup Options

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Storage tab
3. Create a new Postgres database
4. Copy the connection strings to your `.env.local` file
5. Run `npm run setup-vercel` to automatically configure Vercel

### Option B: External Database
Use any PostgreSQL provider (Supabase, Railway, PlanetScale, etc.)

## 🔄 Deployment Steps

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub: `mtalharaza9-ops/daynnight`

2. **Set Environment Variables**
   - **Automated**: Run `npm run setup-vercel`
   - **Manual**: Add variables in Project Settings
   - Set for Production, Preview, and Development environments

3. **Deploy**
   - Click "Deploy" 
   - Vercel will automatically build and deploy
   - Future pushes to main branch trigger auto-deployment

## 🛠️ Build Configuration

The `vercel.json` file is configured with:
- ✅ Next.js framework detection
- ✅ Build command: `npm run build`
- ✅ Output directory: `.next`
- ✅ API function timeout: 30 seconds
- ✅ Auto-deployment from main branch
- ✅ No secret references (uses direct env vars)

## 🔍 Post-Deployment Checklist

1. **Verify Environment Variables**
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure all required variables are set
   - Verify NEXTAUTH_URL matches your Vercel domain

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

### Environment Variable Errors
- **"Secret does not exist"**: Use direct values, not @secret_name format
- **Missing variables**: Ensure all variables are set in Vercel dashboard
- **Wrong environment**: Set variables for Production, Preview, and Development

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify database connection strings

### Authentication Issues
- Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
- Check NEXTAUTH_URL matches your domain exactly
- Ensure it starts with https:// in production

### Database Connection Errors
- Test connection strings locally first
- Check database firewall settings
- Verify SSL requirements

### Script Issues
- **Vercel CLI not found**: Install with `npm i -g vercel`
- **Not logged in**: Run `vercel login`
- **Project not linked**: Run `vercel link`
- **Missing .env.local**: Create the file with your environment variables

## 📊 Monitoring

- **Build Logs**: Vercel Dashboard → Deployments
- **Function Logs**: Vercel Dashboard → Functions
- **Analytics**: Vercel Dashboard → Analytics

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎯 Production Optimization

1. **Environment Variables**
   - Set different values for preview/production environments
   - Use Vercel's built-in environment variable management

2. **Database**
   - Enable connection pooling
   - Set up read replicas if needed

3. **Monitoring**
   - Set up Vercel Analytics
   - Configure error tracking

Your Day & Night e-commerce platform is now ready for production! 🌟
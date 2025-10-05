import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    console.log('🔒 Middleware protecting:', req.nextUrl.pathname);
    console.log('👤 User role:', req.nextauth.token?.role);
    
    // Additional middleware logic can go here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Protect admin routes
        if (pathname.startsWith('/admin')) {
          const isAdmin = token?.role === 'admin';
          console.log(`🔐 Admin route access: ${pathname}, isAdmin: ${isAdmin}`);
          return isAdmin;
        }
        
        // Protect user routes (profile, cart, etc.)
        if (pathname.startsWith('/profile') || 
            pathname.startsWith('/cart') ||
            pathname.startsWith('/orders')) {
          const isAuthenticated = !!token;
          console.log(`🔐 User route access: ${pathname}, authenticated: ${isAuthenticated}`);
          return isAuthenticated;
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*', 
    '/profile/:path*', 
    '/cart/:path*',
    '/orders/:path*'
  ]
};
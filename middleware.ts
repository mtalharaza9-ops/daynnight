import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect admin routes
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }
        // Protect user routes
        if (req.nextUrl.pathname.startsWith('/profile') || 
            req.nextUrl.pathname.startsWith('/cart')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*', '/cart/:path*']
};
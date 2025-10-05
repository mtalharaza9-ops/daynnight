import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const userResult = await getUserByEmail(credentials.email);
        if (!userResult.success || !userResult.data) {
          return null;
        }

        const user = userResult.data;
        const isValidPassword = await verifyPassword(credentials.password, user.password);
        
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 NextAuth redirect callback:', { url, baseUrl });
      
      // Handle callback URLs properly
      if (url.startsWith("/")) {
        const fullUrl = `${baseUrl}${url}`;
        console.log('📍 Relative URL redirect:', fullUrl);
        return fullUrl;
      }
      
      // If it's a callback URL, extract the actual destination
      if (url.includes('callbackUrl=')) {
        const urlObj = new URL(url);
        const callbackUrl = urlObj.searchParams.get('callbackUrl');
        if (callbackUrl) {
          const decodedCallback = decodeURIComponent(callbackUrl);
          console.log('📍 Decoded callback URL:', decodedCallback);
          
          if (decodedCallback.startsWith(baseUrl)) {
            return decodedCallback;
          }
        }
      }
      
      // Allow same origin URLs
      if (new URL(url).origin === baseUrl) {
        console.log('✅ Same origin URL allowed:', url);
        return url;
      }
      
      console.log('🏠 Default redirect to base URL');
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
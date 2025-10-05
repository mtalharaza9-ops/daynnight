import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, verifyPassword } from './db';

console.log('🔧 Loading NextAuth configuration...');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('🔍 NextAuth authorize called with:', { 
          email: credentials?.email,
          hasPassword: !!credentials?.password,
          req: !!req
        });
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials');
          throw new Error('Missing credentials');
        }

        try {
          console.log('🔍 Looking up user by email:', credentials.email);
          const userResult = await getUserByEmail(credentials.email);
          console.log('🔍 User lookup result:', userResult);
          
          if (!userResult.success || !userResult.data) {
            console.log('❌ User not found');
            throw new Error('Invalid credentials');
          }

          const user = userResult.data;
          console.log('✅ Found user:', { id: user.id, email: user.email, role: user.role });
          
          console.log('🔍 Verifying password...');
          const isValidPassword = await verifyPassword(credentials.password, user.password);
          console.log('🔍 Password validation result:', isValidPassword);
          
          if (!isValidPassword) {
            console.log('❌ Invalid password');
            throw new Error('Invalid credentials');
          }

          const authUser = {
            id: user.id.toString(),
            email: user.email,
            name: user.name || user.email,
            role: user.role,
          };
          
          console.log('✅ Returning authenticated user:', authUser);
          return authUser;
        } catch (error) {
          console.error('💥 Error in authorize function:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
      
      // Default to base URL
      console.log('🏠 Defaulting to base URL:', baseUrl);
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
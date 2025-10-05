'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔄 Starting sign-in process...');
      console.log('📍 Callback URL:', callbackUrl);
      console.log('📧 Email:', email);
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('✅ SignIn result:', result);

      if (result?.error) {
        console.log('❌ SignIn error:', result.error);
        setError('Invalid email or password');
        setLoading(false);
        return;
      } 

      if (result?.ok) {
        console.log('🎉 SignIn successful! Checking session...');
        
        // Wait for session to be established
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const session = await getSession();
        console.log('👤 Session after login:', session);
        
        if (!session) {
          console.log('⚠️ No session found after login');
          setError('Session could not be established. Please try again.');
          setLoading(false);
          return;
        }
        
        if (session?.user?.role === 'admin') {
          console.log('👑 Admin user detected! Role:', session.user.role);
          const redirectUrl = callbackUrl.startsWith('/admin') ? callbackUrl : '/admin';
          console.log('🚀 Redirecting to:', redirectUrl);
          
          // Force a hard redirect
          window.location.replace(redirectUrl);
        } else {
          console.log('👤 Regular user detected, role:', session?.user?.role);
          if (callbackUrl.startsWith('/admin')) {
            console.log('🚫 Preventing admin access, redirecting to home');
            window.location.replace('/');
          } else {
            console.log('🏠 Redirecting to callback URL:', callbackUrl);
            window.location.replace(callbackUrl);
          }
        }
      } else {
        console.log('⚠️ Unexpected result:', result);
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('💥 SignIn error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Day & Night Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
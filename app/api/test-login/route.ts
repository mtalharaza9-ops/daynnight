import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('🔍 Testing login for:', email);
    
    // Get user from database
    const userResult = await getUserByEmail(email);
    console.log('User lookup result:', userResult);
    
    if (!userResult.success || !userResult.data) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        email: email
      });
    }
    
    const user = userResult.data;
    console.log('Found user:', { id: user.id, email: user.email, role: user.role });
    
    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    console.log('Password valid:', isValidPassword);
    
    return NextResponse.json({
      success: isValidPassword,
      message: isValidPassword ? 'Login successful' : 'Invalid password',
      user: isValidPassword ? {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      } : null
    });
    
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
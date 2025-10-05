import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Delete all existing admin users from Postgres
    await sql`DELETE FROM users WHERE role = 'admin'`;

    // Create new admin user
    const adminPassword = await bcrypt.hash('admin@100', 10);
    await sql`
      INSERT INTO users (email, name, password, role)
      VALUES ('admin@admin.com', 'Admin User', ${adminPassword}, 'admin')
    `;

    return NextResponse.json({
      message: 'Admin users reset successfully',
      newAdmin: {
        email: 'admin@admin.com',
        name: 'Admin User'
      }
    });
  } catch (error) {
    console.error('Error resetting admin users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
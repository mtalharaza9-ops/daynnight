'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function TestAdmin() {
  const { data: session, status } = useSession();
  const [dbTest, setDbTest] = useState<any>(null);

  useEffect(() => {
    // Test database connection
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        console.log('Database test result:', data);
        setDbTest(data);
      })
      .catch(err => {
        console.error('Database test error:', err);
        setDbTest({ error: err.message });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>User:</strong> {session?.user?.email || 'Not logged in'}</p>
            <p><strong>Role:</strong> {session?.user?.role || 'No role'}</p>
            <p><strong>User ID:</strong> {session?.user?.id || 'No ID'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Connection Test</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(dbTest, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
          <div className="space-y-2">
            <p><strong>NextAuth URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}</p>
            <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
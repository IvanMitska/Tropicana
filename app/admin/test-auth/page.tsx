'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function TestAuth() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Starting login test...');
      
      const loginResponse = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@admin.com',
          password: 'rXguQLQz12345'
        }),
      });

      console.log('Login response status:', loginResponse.status);
      const loginData = await loginResponse.json();
      console.log('Login response data:', loginData);
      
      if (loginResponse.ok) {
        // Проверим все cookies
        console.log('All cookies after login:', document.cookie);
        
        // Подождем немного
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Проверим auth/me
        const authResponse = await fetch('/api/admin/auth/me');
        console.log('Auth check status:', authResponse.status);
        const authData = await authResponse.json();
        console.log('Auth check data:', authData);
        
        setResult(`
LOGIN SUCCESS:
Status: ${loginResponse.status}
Data: ${JSON.stringify(loginData, null, 2)}

COOKIES:
${document.cookie}

AUTH CHECK:
Status: ${authResponse.status}
Data: ${JSON.stringify(authData, null, 2)}
        `);
      } else {
        setResult(`LOGIN FAILED: ${loginResponse.status} - ${JSON.stringify(loginData)}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setResult(`ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Auth Test</h1>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded mb-4"
        >
          {loading ? 'Testing...' : 'Test Login'}
        </button>
        
        {result && (
          <div className="bg-white p-4 rounded border">
            <h2 className="font-bold mb-2">Result:</h2>
            <pre className="text-sm overflow-x-auto">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
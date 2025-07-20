'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function DirectLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@admin.com',
          password: 'rXguQLQz12345'
        }),
      });

      if (response.ok) {
        setMessage('Login successful! Redirecting...');
        // Прямой редирект без проверок
        window.location.href = '/admin/working-dashboard';
      } else {
        const error = await response.json();
        setMessage(`Login failed: ${error.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Direct Admin Login</h1>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">Email: admin@admin.com</p>
          <p className="text-gray-600 mb-4">Password: rXguQLQz12345</p>
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
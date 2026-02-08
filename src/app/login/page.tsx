
'use client';

import { authenticate } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Mission Control</h1>
            <p className="text-gray-400">Please sign in to continue</p>
        </div>
        <form action={dispatch} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="username">
              Username
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              id="username"
              type="text"
              name="username"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              id="password"
              type="password"
              name="password"
              placeholder="••••••"
              required
              minLength={6}
            />
          </div>
          <LoginButton />
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button
      className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      aria-disabled={pending}
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}

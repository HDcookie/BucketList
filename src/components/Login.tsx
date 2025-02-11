import React from 'react';
import { User } from '../types';
import { UserCircle2 } from 'lucide-react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';

interface LoginProps {
  onLogin: (user: User) => void;
}

export function Login({ onLogin }: LoginProps) {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user: User = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName: result.user.displayName || 'Anonymous',
        lists: []
      };
      onLogin(user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex flex-col items-center mb-6">
          <UserCircle2 className="w-16 h-16 text-purple-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Welcome to BucketList</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
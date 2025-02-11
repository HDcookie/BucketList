import React, { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { User } from './types';
import { saveUser, getUser } from './utils/storage';
import { auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const savedUser = await getUser(firebaseUser.uid);
        if (savedUser) {
          setUser(savedUser);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (newUser: User) => {
    const existingUser = await getUser(newUser.uid);
    const finalUser = existingUser || newUser;
    setUser(finalUser);
    await saveUser(finalUser);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    setUser(updatedUser);
    await saveUser(updatedUser);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return user ? (
    <Dashboard user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
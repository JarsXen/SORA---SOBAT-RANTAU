import React, { useState, useEffect } from 'react';
import { Mahasiswa } from './types';
import { storageService } from './services/storageService';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = storageService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (newUser: Mahasiswa) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Onboarding onComplete={handleLogin} />
      )}
    </>
  );
}

export default App;
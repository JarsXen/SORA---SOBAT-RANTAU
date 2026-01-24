import React, { useState, useEffect } from 'react';
import { Mahasiswa } from './types';
import { storageService } from './services/storageService';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MaintenancePage from './components/MaintenancePage';

// UBAH KE "true" JIKA INGIN MENGAKTIFKAN MODE MAINTENANCE
const IS_MAINTENANCE = true;

function App() {
  const [user, setUser] = useState<Mahasiswa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const storedUser = await storageService.getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Failed to restore session", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const handleLogin = (newUser: Mahasiswa) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  // Logic Maintenance Mode
  if (IS_MAINTENANCE) {
    return <MaintenancePage />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

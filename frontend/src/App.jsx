import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants.js';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const manifest = new Manifest({ 
    baseURL: config.BACKEND_URL,
    appId: config.APP_ID
  });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('No active user session.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };
    
    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setRestaurants([]);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    try {
      const response = await manifest.from('Restaurant').find({ 
        include: ['owner'],
        sort: { createdAt: 'desc' }
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      // Refetch restaurants to include the new one with owner info
      loadRestaurants();
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
          <span className={`h-3 w-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm text-gray-700">{backendConnected ? 'API Connected' : 'API Disconnected'}</span>
      </div>

      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage 
          user={user} 
          restaurants={restaurants}
          onLogout={handleLogout} 
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
        />
      )}
    </div>
  );
}

export default App;

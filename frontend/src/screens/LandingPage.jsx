import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('diner@demo.com');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">FoodApp</h1>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Admin Panel
          </a>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Discover & Share Amazing Food
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-gray-600">
            The ultimate platform for food lovers and chefs. Browse restaurants, discover new dishes, and share your own culinary creations.
          </p>
          <div className="mt-10 max-w-md mx-auto">
            <form onSubmit={handleDemoLogin} className="p-2 border rounded-lg bg-gray-50 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="diner@demo.com"
                  readOnly
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
                >
                  Try Demo
                </button>
              </div>
            </form>
            <p className="mt-2 text-xs text-gray-500">Use <code className="font-mono">diner@demo.com</code> or <code className="font-mono">chef@demo.com</code> with password <code className="font-mono">password</code>.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

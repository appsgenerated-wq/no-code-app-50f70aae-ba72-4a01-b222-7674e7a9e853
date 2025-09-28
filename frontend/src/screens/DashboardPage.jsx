import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, restaurants, onLogout, onLoadRestaurants, onCreateRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({ name: '', cuisine: '', description: '' });

  useEffect(() => {
    if (user) {
      onLoadRestaurants();
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRestaurant(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateRestaurant = async (event) => {
    event.preventDefault();
    if (!newRestaurant.name || !newRestaurant.cuisine) {
      alert('Please fill in restaurant name and cuisine.');
      return;
    }
    await onCreateRestaurant(newRestaurant);
    setNewRestaurant({ name: '', cuisine: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-600 capitalize">Your Role: {user.role}</p>
          </div>
          <div className="flex items-center space-x-4">
             <a 
              href={`${config.BACKEND_URL}/admin`} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Admin
            </a>
            <button 
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {user.role === 'chef' && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Your Restaurant</h2>
            <form onSubmit={handleCreateRestaurant} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input
                  type="text"
                  name="name"
                  placeholder="Restaurant Name"
                  value={newRestaurant.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="cuisine"
                  placeholder="Cuisine (e.g., Italian)"
                  value={newRestaurant.cuisine}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <textarea
                name="description"
                placeholder="A short description of your restaurant..."
                value={newRestaurant.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="text-right">
                <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Create Restaurant
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Discover Restaurants</h2>
            {restaurants.length === 0 ? (
              <p className="text-gray-500 bg-white p-6 rounded-lg shadow-md">No restaurants found. Be the first to add one!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    <div className="p-5">
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{restaurant.cuisine}</p>
                      <h3 className="text-xl font-bold text-gray-900 mt-1 truncate">{restaurant.name}</h3>
                      <p className="text-gray-600 mt-2 text-sm h-10 overflow-hidden">{restaurant.description || 'No description available.'}</p>
                       <p className="text-xs text-gray-500 mt-4">Owner: {restaurant.owner?.name || 'Unknown'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

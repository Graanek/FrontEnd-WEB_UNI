import React from 'react';
import { useAuthStore } from '../store/authStore';

function Profile() {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        {user ? (
          <div>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-600">Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
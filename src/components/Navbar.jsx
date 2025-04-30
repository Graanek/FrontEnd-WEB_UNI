import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BookReviews</span>
          </Link>

          <div className="flex space-x-4">
            <Link to="/books" className="text-gray-700 hover:text-blue-600">Books</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            
            {user ? (
              <>
                <Link to="/reviews" className="text-gray-700 hover:text-blue-600">My Reviews</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
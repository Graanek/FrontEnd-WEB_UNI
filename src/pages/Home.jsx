import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to BookReviews
        </h1>
        <p className="text-xl text-gray-600">
          Discover, review, and share your favorite books with our community
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          to="/books"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Browse Books</h2>
          <p className="text-gray-600">
            Explore our collection of books and read reviews from other readers
          </p>
        </Link>

        <Link
          to="/register"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
          <p className="text-gray-600">
            Create an account to start sharing your own book reviews
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
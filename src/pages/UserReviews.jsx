import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, Clock } from 'lucide-react';
import { getUserReviews } from '../services/reviewsService';
import { useAuthStore } from '../store/authStore';

function UserReviews() {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) {
        console.log('No user found, skipping review fetch');
        return;
      }
      
      console.log('Fetching reviews for user:', user);
      
      try {
        const data = await getUserReviews(user.id);
        console.log('Received reviews data:', data);
        
        if (data && data.reviews) {
          setReviews(data.reviews);
        } else {
          console.warn('No reviews found in response:', data);
          setReviews([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch your reviews');
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  console.log('Current state:', { user, reviews, loading, error });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Please log in to view your reviews</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Reviews</h1>
      
      {reviews.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600">You haven't written any reviews yet</p>
          <Link to="/books" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.review_id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                {review.book ? (
                  <Link 
                    to={`/books/${review.book.book_id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">{review.book.title}</h2>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-xl font-semibold">Unknown Book</h2>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{review.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-4">{review.content}</p>
              
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserReviews;
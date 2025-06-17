import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, BookOpen, Clock, Edit, Trash2 } from 'lucide-react';
import { getMyReviews, updateReview, deleteReview } from '../services/reviewsService'; 
import { useAuthStore } from '../store/authStore';

function UserReviews() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) {
        console.log('No user found, skipping review fetch');
        setLoading(false);
        return;
      }
      
      try {
        const data = await getMyReviews();
        console.log('Received reviews data:', data);
        
        setReviews(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        
        if (err.message.includes('Authentication required')) {
          setError('Please login to view your reviews');
          navigate('/login');
        } else {
          setError('Failed to fetch your reviews');
        }
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user, navigate]);

  const handleEditClick = (review) => {
    setEditingReview(review.review_id);
    setEditForm({
      title: review.title,
      content: review.content,
      rating: review.rating
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedReview = await updateReview(editingReview, editForm);
      
      setReviews(prev => prev.map(review => 
        review.review_id === editingReview 
          ? { ...review, ...updatedReview }
          : review
      ));
      
      setEditingReview(null);
    } catch (err) {
      console.error('Error updating review:', err);
      setError('Failed to update review');
    }
  };

  const handleDeleteClick = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await deleteReview(reviewId);
      
      setReviews(prev => prev.filter(review => review.review_id !== reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
    }
  };

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
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Loading your reviews...</p>
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
            Browse Books to Review
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.review_id} className="bg-white p-6 rounded-lg shadow">
              {editingReview === review.review_id ? (
                // Edit form
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= editForm.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Review
                    </label>
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingReview(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                // Display review
                <>
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
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(review)}
                          className="p-2 text-gray-500 hover:text-blue-600"
                          title="Edit review"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(review.review_id)}
                          className="p-2 text-gray-500 hover:text-red-600"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
                      Created: {new Date(review.created_at).toLocaleDateString()}
                      {review.updated_at && review.updated_at !== review.created_at && (
                        <span className="ml-2">
                          • Updated: {new Date(review.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserReviews;
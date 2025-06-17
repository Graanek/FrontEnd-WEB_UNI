import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, User, ArrowLeft } from 'lucide-react';
import ReviewModal from '../components/ReviewModal';
import { getBook } from '../services/booksService';
import { createReview } from '../services/reviewsService';
import { useAuthStore } from '../store/authStore';

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        setBook(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleReviewSubmit = async (review) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setReviewError(null);
      
      const newReview = await createReview(id, review);
      
      const updatedBook = await getBook(id);
      setBook(updatedBook.data);
      
      setIsModalOpen(false);
    } catch (err) {
      if (err.message.includes('Authentication required')) {
        setReviewError('Please login to add a review');
        navigate('/login');
      } else if (err.message.includes('already reviewed')) {
        setReviewError('You have already reviewed this book');
      } else {
        setReviewError(err.response?.data?.detail || err.message || 'Failed to submit review');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center p-4">{error}</div>
        <Link to="/books" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Books
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-4">Book not found</div>
        <Link to="/books" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Books
        </Link>
      </div>
    );
  }

  const userHasReviewed = user && book.reviews?.some(
    review => review.user?.user_id === user.user_id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/books" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Books
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={book.cover_url}
              alt={book.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-1" />
                <span>{new Date(book.published_year).getFullYear()}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500">Genre: {book.genre?.genre || 'Unknown'}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{book.description}</p>

            {user ? (
              userHasReviewed ? (
                <div className="text-gray-500">You have already reviewed this book</div>
              ) : (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Review
                </button>
              )
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
              >
                Login to Add Review
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviewError && (
            <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">{reviewError}</div>
          )}
          {book.reviews && book.reviews.length > 0 ? (
            <div className="space-y-4">
              {book.reviews.map((review) => (
                <div key={review.review_id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <User className="w-6 h-6 text-gray-500 mr-2" />
                      <span className="font-semibold">
                        {review.user?.username || 'Anonymous User'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{review.title}</h3>
                  <p className="text-gray-700">{review.content}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setReviewError(null);
        }}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}

export default BookDetails;
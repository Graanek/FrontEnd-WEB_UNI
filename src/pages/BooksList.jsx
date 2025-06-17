import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/booksService';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        
        setBooks(data.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setBooks([]);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Books</h1>
        <Link
          to="/books/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add New Book
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div key={book.book_id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {book.cover_url ? (
                <img 
                  src={book.cover_url} 
                  alt={book.title} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500"
                style={{ display: book.cover_url ? 'none' : 'flex' }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-sm">No Image</div>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                <p className="text-gray-700 mb-4">{book.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Published: {new Date(book.published_year).getFullYear()}
                </p>
                <div className="flex justify-end">
                  <Link
                    to={`/books/${book.book_id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No books available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { getGenres, createBook } from '../services/booksService'; 

const STATIC_BOOK_COVER = '/static/book.jpg';

function AddEditBook() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover_url: '',
    published_year: '',
    genre_id: '',
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres();
        setGenres(genresData.data);
      } catch (err) {
        setError('Failed to load genres');
        console.error('Error fetching genres:', err);
      }
    };
    
    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        cover_url: STATIC_BOOK_COVER,
        published_year: new Date(formData.published_year).toISOString(),
        genre_id: Number(formData.genre_id),
      };
      
      await createBook(payload); 
      navigate('/books');
    } catch (err) {
      if (err.message.includes('Authentication required')) {
        setError('Please login to continue');
        navigate('/login');
      } else {
        setError(err.response?.data?.detail || err.message || 'Failed to save book. Please try again.');
      }
      console.error('Error saving book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Add New Book
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <div className="relative">
                <Book className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Book title"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                name="genre_id"
                value={formData.genre_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre.genre_id} value={genre.genre_id}>
                    {genre.genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year
              </label>
              <input
                type="date"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="url"
                  name="cover_url"
                  value={formData.cover_url}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/book-cover.jpg"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Book description"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditBook;
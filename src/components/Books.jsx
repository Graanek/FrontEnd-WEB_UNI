import { useEffect, useState } from 'react';
import { getBooks } from '../services/booksService';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Books Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book.book_id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={book.cover_url} 
                            alt={book.title} 
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                            <p className="text-gray-600 mb-2">by {book.author}</p>
                            <p className="text-gray-700">{book.description}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Published: {new Date(book.published_year).getFullYear()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books; 
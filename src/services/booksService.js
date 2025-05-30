import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}; 

export const getBook = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching book:', error);
        throw error;
    }
}; 

export const createBook = async (bookData) => {
    try {
        const response = await axios.post(`${API_URL}/books/create`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${API_URL}/books/genres`);
        return response.data;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
}; 
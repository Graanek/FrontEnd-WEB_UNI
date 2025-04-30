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
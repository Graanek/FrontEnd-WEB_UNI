import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const createReview = async (reviewData) => {
    try {
        const response = await axios.post(`${API_URL}/reviews/create`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};
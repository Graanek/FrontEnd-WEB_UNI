import axios from 'axios';
import api from './api';

const API_URL = 'http://127.0.0.1:8000';

export const createReview = async (bookId, userId, reviewData) => {
    try {
        const response = await axios.post(
            `${API_URL}/reviews/create?user_id=${userId}&book_id=${bookId}`,
            reviewData
        );
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const getUserReviews = async (userId) => {
    console.log('Making request to fetch reviews for user:', userId);
    try {
        const response = await api.get(`/users/${userId}/reviews`);
        console.log('Response status:', response.status);
        
        if (!response.data) {
            console.error('No data in response');
            throw new Error('No data received from server');
        }
        
        console.log('Received data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getUserReviews:', error);
        throw error;
    }
};
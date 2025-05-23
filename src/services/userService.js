import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getUserStats = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user stats:', error);
        throw error;
    }
};

export const updateUserProfile = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}; 
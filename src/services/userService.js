import api from './api';

export const getUsers = async (skip = 0, limit = 100) => {
    const response = await api.get(`/users/?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getUser = async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const getUserStats = async (userId) => {
    const response = await api.get(`/users/${userId}/stats`);
    return response.data;
};


export const getCurrentUser = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

export const updateUserProfile = async (userId, userData) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
};

export const updateMyProfile = async (userData) => {
    const currentUser = await getCurrentUser();
    const response = await api.put(`/users/${currentUser.user_id}`, userData);
    return response.data;
};


export const login = async (email, password) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post('/users/create', userData);
    return response.data;
};
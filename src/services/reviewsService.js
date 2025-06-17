import api from './api';

export const getReview = async (reviewId) => {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
};

export const getBookReviews = async (bookId, skip = 0, limit = 100) => {
    const response = await api.get(`/reviews/book/${bookId}?skip=${skip}&limit=${limit}`);
    return response.data;
};

export const getUserReviews = async (userId) => {
    const response = await api.get(`/users/${userId}/reviews`);
    return response.data;
};


export const createReview = async (bookId, reviewData) => {
    const response = await api.post(`/reviews/create?book_id=${bookId}`, reviewData);
    return response.data;
};

export const updateReview = async (reviewId, reviewData) => {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
};

export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};

export const getMyReviews = async (skip = 0, limit = 100) => {
    const response = await api.get(`/reviews/user/my-reviews?skip=${skip}&limit=${limit}`);
    return response.data;
};
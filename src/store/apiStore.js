import { create } from 'zustand';
import api from '../services/api';

const useApiStore = create((set) => ({
  loading: false,
  error: null,
  data: null,
  books: [],

  // Generic function to make API calls
  makeRequest: async (method, url, data = null) => {
    set({ loading: true, error: null });
    try {
      const response = await api[method](url, data);
      set({ data: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'An error occurred',
        loading: false 
      });
      throw error;
    }
  },

  // Book-related functions
  fetchBooks: async () => {
    const books = await useApiStore.getState().makeRequest('get', '/books');
    set({ books });
    return books;
  },

  fetchBookById: async (id) => {
    return await useApiStore.getState().makeRequest('get', `/books/${id}`);
  },

  createBook: async (bookData) => {
    return await useApiStore.getState().makeRequest('post', '/books', bookData);
  },

  updateBook: async (id, bookData) => {
    return await useApiStore.getState().makeRequest('put', `/books/${id}`, bookData);
  },

  deleteBook: async (id) => {
    return await useApiStore.getState().makeRequest('delete', `/books/${id}`);
  },

  // Authentication functions
  login: async (credentials) => {
    const response = await useApiStore.getState().makeRequest('post', '/auth/login', credentials);
    localStorage.setItem('token', response.token);
    return response;
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ data: null });
  },

  // Add more specific API calls as needed
}));

export default useApiStore; 
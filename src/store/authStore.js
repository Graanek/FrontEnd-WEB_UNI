import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => {
        console.log('Setting user:', user); // Debug log
        set({ user });
      },
      setToken: (token) => {
        console.log('Setting token:', token); // Debug log
        set({ token });
      },
      logout: () => {
        console.log('Logging out'); // Debug log
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);
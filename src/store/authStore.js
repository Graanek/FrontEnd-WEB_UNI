import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setUser: (user) => {
        console.log('Setting user:', user);
        set({ user });
      },
      
      setToken: (token) => {
        console.log('Setting token:', token);
        if (token) {
          localStorage.setItem('access_token', token);
        } else {
          localStorage.removeItem('access_token');
        }
        set({ token });
      },
      
      login: (loginResponse) => {
        console.log('Login response:', loginResponse);
        const { access_token, user_id, username, email } = loginResponse;
        
        localStorage.setItem('access_token', access_token);
        set({ 
          token: access_token,
          user: { user_id, username, email }
        });
      },
      
      logout: () => {
        console.log('Logging out');
        localStorage.removeItem('access_token');
        set({ user: null, token: null });
      },

      initializeAuth: () => {
        const storedToken = localStorage.getItem('access_token');
        const storeToken = get().token;
        
        if (storedToken !== storeToken) {
          console.log('Synchronizing token from localStorage');
          set({ token: storedToken });
        }
      },
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,

      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
    }
  )
);

if (typeof window !== 'undefined') {
  useAuthStore.getState().initializeAuth();
}
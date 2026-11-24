import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import request from '../api/createRequest';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const data = await request('/auth/signin', { body: credentials });
          const { user, token } = data;
          set({ user, token, loading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      signup: async (payload) => {
        set({ loading: true, error: null });
        try {
          const data = await request('/auth/signup', { body: payload });
          const { user, token } = data;
          set({ user, token, loading: false });
          return { success: true };
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, error: err.message };
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: 'cafe-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

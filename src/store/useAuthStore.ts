import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authService, AUTH_TOKEN_KEY } from '../services/auth.service';
import { setAuthToken } from '../services/api';
import type { ILoginPayload, IUser } from '../types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: ILoginPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const initialToken =
  typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

if (initialToken) {
  setAuthToken(initialToken);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: initialToken,
      isAuthenticated: Boolean(initialToken),
      isLoading: false,
      error: null,

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const loginData = await authService.login(payload);
          setAuthToken(loginData.token);
          localStorage.setItem(AUTH_TOKEN_KEY, loginData.token);
          set({
            user: loginData.user,
            token: loginData.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Login failed';
          set({ error: message, isLoading: false, isAuthenticated: false });
          throw error;
        }
      },

      logout: () => {
        setAuthToken(null);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

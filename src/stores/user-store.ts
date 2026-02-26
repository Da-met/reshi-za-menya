// src/stores/user-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  username?: string;  // Добавим username
  avatar?: string;
}

interface UserState {
  user: User | null;
  accessToken: string | null;  // ← Добавляем!
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;  // ← Меняем!
  logout: () => void;
  setAccessToken: (token: string | null) => void;  // ← Добавляем!
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,  // ← Добавляем!
      isAuthenticated: false,
      
      // Теперь login принимает и пользователя, и токен
      login: (user, accessToken) => set({ 
        user, 
        accessToken, 
        isAuthenticated: true 
      }),
      
      // Очищаем всё
      logout: () => set({ 
        user: null, 
        accessToken: null, 
        isAuthenticated: false 
      }),
      
      // Для обновления токена
      setAccessToken: (accessToken) => set({ accessToken }),
    }),
    {
      name: 'user-storage',
      // Сохраняем только user, НЕ accessToken!
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
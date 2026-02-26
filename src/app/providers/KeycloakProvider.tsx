'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface KeycloakUser {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface KeycloakContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: KeycloakUser | null;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

const KeycloakContext = createContext<KeycloakContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: () => {},
  getToken: async () => null,
});

export const useKeycloak = () => useContext(KeycloakContext);

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<KeycloakUser | null>(null);

  // 🔥 Оборачиваем refreshToken в useCallback
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('keycloak-refresh-token');
    if (!refreshToken) return;

    try {
      const response = await fetch('http://192.168.3.6:8080/realms/prompts/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: 'react-client',
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('keycloak-token', data.access_token);
        if (data.refresh_token) {
          localStorage.setItem('keycloak-refresh-token', data.refresh_token);
        }
      } else {
        logout();
      }
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
    }
  }, []); // Пустой массив зависимостей, так как функция не зависит от пропсов или state

  // 🔥 Добавляем refreshToken в зависимости useEffect
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('keycloak-user');
        const savedToken = localStorage.getItem('keycloak-token');
        
        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
          
          // Проверяем не истек ли токен
          const tokenData = JSON.parse(atob(savedToken.split('.')[1]));
          const exp = tokenData.exp * 1000;
          
          if (Date.now() >= exp) {
            // Токен истек, пробуем обновить
            refreshToken(); // ✅ Теперь ESLint видит зависимость
          }
        }
      } catch (e) {
        console.error('Ошибка загрузки пользователя:', e);
        localStorage.removeItem('keycloak-user');
        localStorage.removeItem('keycloak-token');
        localStorage.removeItem('keycloak-refresh-token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [refreshToken]); // ✅ Добавляем refreshToken в зависимости

  const logout = () => {
    localStorage.removeItem('keycloak-user');
    localStorage.removeItem('keycloak-token');
    localStorage.removeItem('keycloak-refresh-token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  const getToken = async (): Promise<string | null> => {
    let token = localStorage.getItem('keycloak-token');
    if (!token) return null;

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const exp = tokenData.exp * 1000;
      
      if (Date.now() >= exp) {
        await refreshToken(); // ✅ Используем useCallback версию
        token = localStorage.getItem('keycloak-token');
      }
    } catch (e) {
      console.error('Ошибка проверки токена:', e);
    }

    return token;
  };

  return (
    <KeycloakContext.Provider value={{
      isAuthenticated,
      isLoading,
      user,
      logout,
      getToken,
    }}>
      {children}
    </KeycloakContext.Provider>
  );
}
// src/lib/api-client.ts
import { useUserStore } from '@/stores/user-store';

// Создаем тип для данных, которые можно отправлять
type RequestData = Record<string, unknown> | FormData | null;

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;  // Для запросов без авторизации
}

/**
 * API клиент с автоматическим обновлением токена
 */
export async function apiClient(endpoint: string, options: FetchOptions = {}) {
  const { skipAuth = false, ...fetchOptions } = options;
  
  // 1. Если не нужно авторизации - просто отправляем запрос
  if (skipAuth) {
    return fetch(endpoint, fetchOptions);
  }

  // 2. Берем токен из store (используем const, т.к. не переназначаем)
  const accessToken = useUserStore.getState().accessToken;

  // 3. Пробуем выполнить запрос с текущим токеном
  let response = await fetch(endpoint, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...fetchOptions.headers,
    },
  });

  // 4. Если токен истек (401) - пробуем обновить
  if (response.status === 401 && accessToken) {
    console.log('🔄 Токен истек, пробуем обновить...');
    
    try {
      // 4.1 Вызываем наш API для обновления токена
      const refreshResponse = await fetch('/api/refresh', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (refreshResponse.ok) {
        // 4.2 Получаем новый токен
        const { access_token } = await refreshResponse.json();
        
        // 4.3 Сохраняем новый токен в store
        useUserStore.getState().setAccessToken(access_token);
        
        console.log('✅ Токен обновлен, повторяем запрос');
        
        // 4.4 Повторяем исходный запрос с новым токеном
        response = await fetch(endpoint, {
          ...fetchOptions,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
            ...fetchOptions.headers,
          },
        });
      } else {
        // 4.5 Не удалось обновить - разлогиниваем
        console.log('❌ Не удалось обновить токен, разлогиниваем');
        useUserStore.getState().logout();
        
        // Перенаправляем на логин
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Сессия истекла');
      }
    } catch (refreshError) {
      console.error('Ошибка при обновлении токена:', refreshError);
      throw refreshError;
    }
  }

  return response;
}

/**
 * Удобные обертки для разных типов запросов
 */
export const api = {
  get: (endpoint: string, options?: FetchOptions) => 
    apiClient(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: RequestData, options?: FetchOptions) => 
    apiClient(endpoint, { 
      ...options, 
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: (endpoint: string, data?: RequestData, options?: FetchOptions) => 
    apiClient(endpoint, { 
      ...options, 
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: (endpoint: string, options?: FetchOptions) => 
    apiClient(endpoint, { ...options, method: 'DELETE' }),
};

// Интерфейс для возвращаемого значения useApi
interface UseApiReturn {
  api: typeof api;
  isAuthenticated: boolean;
}

// Для использования в React компонентах
export function useApi(): UseApiReturn {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  
  return {
    api,
    isAuthenticated,
  };
}
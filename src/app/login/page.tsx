'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useThemeStore } from '@/stores/theme-store';
import { useUserStore } from '@/stores/user-store'; // Добавляем!

export default function LoginPage() {
  const { theme } = useThemeStore();
  const router = useRouter();
  const login_store = useUserStore((state) => state.login); // Добавляем!
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('registered') === 'true') {
      setSuccessMessage('Регистрация успешна! Теперь вы можете войти.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка входа');
      }

      const data = await response.json();
      
      // Сохраняем в store
      login_store(data.user, data.access_token);
      
      // 🔥 ВАЖНО: даем время сохраниться в localStorage
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Теперь редиректим
      router.push('/');
      
      // И обновляем серверные компоненты
      router.refresh();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-card rounded-xl shadow-lg">
        
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className={`
            w-16 h-16 rounded-full 
            flex items-center justify-center
            text-2xl font-bold mx-auto mb-4
            ${theme === 'light' ? 'bg-[#f4d8e6] text-[#557f59]' : ''}
            ${theme === 'night' ? 'bg-[#083353] text-[#d36960]' : ''}
            ${theme === 'sky' ? 'bg-[#6e93e4] text-[#f7f2ee]' : ''}
          `}>
            РЗМ
          </div>
          <h2 className="text-3xl font-bold">Вход в аккаунт</h2>
        </div>

        {/* Сообщение об успехе */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {/* Форма входа */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email или имя пользователя
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="your@email.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Нет аккаунта? </span>
            <Link href="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </div>
        </form>

        {/* 👇 ЗДЕСЬ вставляем кнопку Telegram */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">
              Или войти через
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            // Важно! Открываем в текущей вкладке, а не в новой
            window.location.href = 
              'http://192.168.3.6:8080/realms/prompts/login-actions/authenticate?execution=telegram-login';
          }}
          className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <span className="mr-2">📱</span>
          Войти через Telegram
        </button>

        <button
          onClick={() => window.location.href = 'http://192.168.3.6:8080/realms/prompts/broker/yandex/login'}
          className="w-full flex items-center justify-center py-2 px-4 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <span className="mr-2">Я</span>
          Яндекс
        </button>

        {/* 👇 ПОСЛЕ кнопки Telegram идет ссылка на регистрацию */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Нет аккаунта? </span>
          <Link href="/register" className="text-primary hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useThemeStore } from '@/stores/theme-store';
import { useUserStore } from '@/stores/user-store';

export default function RegisterPage() {
  const { theme } = useThemeStore();
  const router = useRouter();
  const login_store = useUserStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Регистрируем пользователя
      console.log('📝 Регистрация...');
      const registerResponse = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.error || 'Ошибка регистрации');
      }

      console.log('✅ Регистрация успешна');

      // 2. СРАЗУ логинимся (используем те же данные)
      console.log('🔑 Автоматический вход...');
      const loginResponse = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!loginResponse.ok) {
        // Если вход не удался - отправляем на страницу логина
        router.push('/login?registered=true');
        return;
      }

      const loginData = await loginResponse.json();
      
      // 3. Сохраняем в store
      login_store(loginData.user, loginData.access_token);
      
      // 4. Даем время сохраниться
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 5. На главную!
      router.push('/');
      router.refresh();

    } catch (err: unknown) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ошибка регистрации');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
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
          <h2 className="text-3xl font-bold">Регистрация</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Имя пользователя <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="johndoe (только латиница)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-background"
                placeholder="Иван"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Фамилия</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-background"
                placeholder="Петров"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Пароль <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Подтвердите пароль <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-background"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Уже есть аккаунт? </span>
            <Link href="/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
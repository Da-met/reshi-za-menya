// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useThemeStore } from '@/stores/theme-store';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'next/navigation';

export function Header() {
  const { theme } = useThemeStore();
  const router = useRouter();
  
  // Подписываемся на изменения в store
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const logout = useUserStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      // 1. Удаляем cookie
      await fetch('/api/logout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      // 2. Очищаем store (Zustand)
      logout();
      
      // 3. Удаляем ВСЕ токены и данные пользователя
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('token');        // ← добавили!
      localStorage.removeItem('user-storage');
      
      console.log('✅ Все токены удалены');
      
      // 4. Перенаправляем
      router.push('/login');
      router.refresh();

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="border-b border-border shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`
              w-8 h-8 rounded-full 
              flex items-center justify-center
              text-sm md:text-base font-bold
              ${theme === 'light' ? 'bg-[#f4d8e6] text-[#557f59]' : ''}
              ${theme === 'night' ? 'bg-[#083353] text-[#d36960]' : ''}
              ${theme === 'sky' ? 'bg-[#6e93e4] text-[#f7f2ee]' : ''}
            `}>
              РЗМ
            </div>
            <span className="hidden sm:inline text-base md:text-lg lg:text-xl font-bold text-card-foreground">
              Реши за меня
            </span>
          </Link>

          {/* Блок пользователя */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-6">
                <Link 
                  href="/profile"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Профиль
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-card-foreground hover:text-primary transition-colors font-medium"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import Link from 'next/link';
import { useThemeStore } from '@/stores/theme-store';
import { useUserStore } from '@/stores/user-store';

export function Header() {
  const { theme } = useThemeStore();
  const { user, isAuthenticated, logout } = useUserStore();
//   const { logout } = useUserStore();
//   const isAuthenticated = true; // Временная заглушка
//   const user = { id: '1', email: 'test@test.com', name: 'Тестовый пользователь' };

  return (
    <header className="
      bg-card 
      border-b border-border 
      shadow-sm
      sticky top-0 
      z-40
      backdrop-blur-sm bg-card/95
    ">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Логотип и навигация */}
          <div className="flex items-center space-x-8">
            
            {/* Логотип */}
            <Link 
              href="/" 
              className="
                flex items-center space-x-2 
                text-lg md:text-xl lg:text-2xl font-bold 
                text-card-foreground
                hover:text-primary 
                transition-colors
              "
            >
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
              <span className="hidden sm:inline text-base md:text-lg lg:text-xl">Реши за меня</span>
            </Link>
          </div>

          {/* Блок пользователя */}
          <div className="flex items-center space-x-4">
            
            {isAuthenticated && user ? (
              // Авторизованный пользователь
              <div className="flex items-center space-x-6">
                {/* <span className="text-card-foreground hidden sm:block">
                  Привет, {user.name}!
                </span> */}

                <Link 
                  href="/profile"
                  className="
                    bg-primary 
                    text-primary-foreground 
                    px-4 py-2 
                    rounded-lg 
                    hover:bg-primary/90 
                    transition-colors
                    font-medium
                    text-sm md:text-base lg:text-lg
                  "
                >
                  Профиль
                </Link>
                <button 
                  onClick={logout}
                  className="text-sm md:text-base lg:text-lg text-card-foreground hover:text-primary transition-colors font-medium"
                >
                  Выйти
                </button>
              </div>
            ) : (
              // Неавторизованный пользователь
              <div className="flex items-center space-x-6">
                <button 
                    onClick={() => useUserStore.getState().login({
                        id: '1', 
                        email: 'test@test.com', 
                        name: 'Тестовый пользователь'
                    })}
                    className="
                        text-card-foreground 
                        hover:text-primary 
                        transition-colors 
                        font-medium
                        text-sm md:text-base lg:text-lg
                    ">
                    Тест: Войти
                </button>
                {/* <Link 
                  href="/login"
                  className="
                    text-card-foreground 
                    hover:text-primary 
                    transition-colors
                    font-medium
                    text-sm md:text-base lg:text-lg
                  "
                >
                  Войти
                </Link> */}
                <Link 
                  href="/register"
                  className="
                    bg-primary 
                    text-primary-foreground 
                    px-4 py-2 
                    rounded-lg 
                    hover:bg-primary/90 
                    transition-colors
                    font-medium
                    text-sm md:text-base lg:text-lg
                  "
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
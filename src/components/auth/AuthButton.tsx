'use client';

import { useKeycloak } from '@/app/providers/KeycloakProvider';

export function AuthButton() {
  const { isAuthenticated, isLoading, user, login, logout } = useKeycloak();

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600 dark:text-gray-400">Загрузка...</span>
      </div>
    );
  }

  // Пользователь не авторизован - показываем кнопку входа
  if (!isAuthenticated) {
    return (
      <button
        onClick={login}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        Войти
      </button>
    );
  }

  // Пользователь авторизован - показываем меню
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
          {user?.name?.[0] || user?.username?.[0] || 'U'}
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {user?.name || user?.username || 'Пользователь'}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Выпадающее меню */}
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-1">
          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Мой профиль
          </a>
          <a href="/my-recipes" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Мои рецепты
          </a>
          <a href="/my-gifts" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
            Мои подарки
          </a>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
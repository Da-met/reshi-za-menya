// src/config/banners.ts

export type ModuleType = 'gifts' | 'skincare' | 'recipes' | 'movies' | 'books';

export interface BannerConfig {
  id: string;                     // Уникальный ID для A/B тестов
  title: string;
  description: string;
  icon?: string;                  // Название иконки или emoji
  gradient: string;
  route: string;
  module: ModuleType;
  priority?: number;              // Приоритет (выше = показывается первым)
  isActive?: boolean;             // Активен ли баннер
  startDate?: string;             // Дата начала показа (YYYY-MM-DD)
  endDate?: string;               // Дата окончания показа (YYYY-MM-DD)
  variant?: 'A' | 'B' | 'C';      // Для A/B тестов
}

// Базовые баннеры по умолчанию
// export const defaultBanners: BannerConfig[] = [
//   // Для модуля Gift
//   {
//     id: 'gifts-default-1',
//     title: '🎁 Найди идеальный подарок',
//     description: 'ИИ подберет подарок под любой случай',
//     icon: 'Gift',
//     gradient: 'from-purple-500/90 to-pink-500/90',
//     route: '/gifts',
//     module: 'gifts',
//     priority: 1,
//     isActive: true
//   },
//   {
//     id: 'gifts-new-year',
//     title: '🎄 Новогодние подарки 2025',
//     description: 'Идеи подарков к праздникам',
//     icon: 'Sparkles',
//     gradient: 'from-red-500/90 to-green-500/90',
//     route: '/gifts/collections/new-year',
//     module: 'gifts',
//     priority: 10, // Высокий приоритет на праздники
//     isActive: true,
//     startDate: '2024-12-01',
//     endDate: '2025-01-15'
//   },
  
//   // Для модуля Skincare
//   {
//     id: 'skincare-default-1',
//     title: '💆 Персональный подбор ухода',
//     description: 'Средства по типу кожи и потребностям',
//     icon: 'Droplets',
//     gradient: 'from-teal-500/90 to-emerald-500/90',
//     route: '/skincare',
//     module: 'skincare',
//     priority: 1,
//     isActive: true
//   },
//   {
//     id: 'skincare-winter',
//     title: '❄️ Зимний уход за кожей',
//     description: 'Защита от холода и сухости',
//     icon: 'Droplets',
//     gradient: 'from-blue-400/90 to-cyan-500/90',
//     route: '/skincare/collections/winter',
//     module: 'skincare',
//     priority: 5,
//     isActive: true,
//     startDate: '2024-11-01',
//     endDate: '2025-02-28'
//   },
  
//   // A/B тест вариант для Gift
//   {
//     id: 'gifts-ab-test-a',
//     title: '🎁 Бесплатный подбор подарков',
//     description: 'Попробуйте наш ИИ-помощник',
//     icon: 'Gift',
//     gradient: 'from-blue-500/90 to-purple-500/90',
//     route: '/gifts',
//     module: 'gifts',
//     priority: 2,
//     isActive: true,
//     variant: 'A'
//   },
//   {
//     id: 'gifts-ab-test-b',
//     title: '✨ Найди подарок за 1 минуту',
//     description: 'Просто ответьте на 3 вопроса',
//     icon: 'Sparkles',
//     gradient: 'from-orange-500/90 to-yellow-500/90',
//     route: '/gifts',
//     module: 'gifts',
//     priority: 2,
//     isActive: true,
//     variant: 'B'
//   }
// ];

// Вспомогательные функции

// Проверяет, активен ли баннер по датам
export function isBannerActive(banner: BannerConfig): boolean {
  if (!banner.isActive) return false;
  
  const now = new Date();
  
  // Проверка startDate
  if (banner.startDate) {
    const start = new Date(banner.startDate);
    if (now < start) return false;
  }
  
  // Проверка endDate
  if (banner.endDate) {
    const end = new Date(banner.endDate);
    if (now > end) return false;
  }
  
  return true;
}

// Получает все активные баннеры для модуля
// export function getActiveBanners(module: ModuleType): BannerConfig[] {
//   return defaultBanners
//     .filter(banner => banner.module === module && isBannerActive(banner))
//     .sort((a, b) => (b.priority || 0) - (a.priority || 0)); // Сортируем по приоритету
// }

// Получает один баннер для модуля (самый приоритетный)
// export function getPrimaryBanner(module: ModuleType): BannerConfig | null {
//   const activeBanners = getActiveBanners(module);
//   return activeBanners.length > 0 ? activeBanners[0] : null;
// }

// // Функция для A/B тестирования (простая)
// export function getVariantBanner(module: ModuleType, userId?: string): BannerConfig | null {
//   const activeBanners = getActiveBanners(module);
//   const variantBanners = activeBanners.filter(b => b.variant);
  
//   if (variantBanners.length === 0) {
//     // Если нет вариантов, возвращаем обычный баннер
//     return getPrimaryBanner(module);
//   }
  
//   // Простой алгоритм выбора варианта
//   // Можно улучшить: по userId, сессии, или random
//   const variantIndex = userId 
//     ? parseInt(userId, 16) % variantBanners.length // По userId
//     : Math.floor(Math.random() * variantBanners.length); // Случайно
  
//   return variantBanners[variantIndex];
// }

// Утилита для преобразования icon name в React компонент
export function getIconComponent(iconName?: string): React.ReactNode {
  if (!iconName) return null;
  
  // Можно добавить маппинг имен иконок на компоненты
  // Пока возвращаем просто текст или эмодзи из title
  return null; // Будем обрабатывать в компоненте
}

// Утилита для администратора (в будущем)
export function updateBanner(bannerId: string, updates: Partial<BannerConfig>): void {
  console.log(`Обновление баннера ${bannerId}:`, updates);
  // Здесь будет логика обновления в базе данных
}

export function addBanner(banner: Omit<BannerConfig, 'id'>): void {
  console.log('Добавление нового баннера:', banner);
  // Здесь будет логика добавления в базу данных
}
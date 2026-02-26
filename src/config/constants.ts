/**
 * Глобальные константы для ВСЕГО приложения
 */

// Конфигурация приложения
export const APP_CONFIG = {
  NAME: 'Реши за меня',
  DESCRIPTION: 'AI-помощник для решения бытовых задач',
  VERSION: '1.0.0',
  MODULES: ['cooking', 'gifts', 'movies', 'books', 'skincare', 'analysis'] as const,
} as const;

// Конфигурация API
export const API_CONFIG = {
  TIMEOUT: 30000,
  MAX_RETRIES: 3,
  CACHE_TTL: 10 * 60 * 1000,
} as const;

// Конфигурация монетизации
export const MONETIZATION_CONFIG = {
  CURRENCY_NAME: 'Идеи',
  IDEAS_PER_GENERATION: 1,
  FREE_TIER_LIMIT: 5,
  PRO_TIER_PRICE: 299,
} as const;

// Конфигурация тем
export const THEME_CONFIG = {
  DEFAULT_THEME: 'light',
  THEMES: ['light', 'night', 'sky'] as const,
  STORAGE_KEY: 'reshizamena-theme',
} as const;

// Конфигурация навигации
export const NAVIGATION_CONFIG = {
  MAIN_MODULES: [
    { id: 'cooking', label: 'Что приготовить', icon: '🍳' },
    { id: 'gifts', label: 'Что подарить', icon: '🎁' },
    { id: 'movies', label: 'Что посмотреть', icon: '🎬' },
    { id: 'books', label: 'Что почитать', icon: '📚' },
    { id: 'skincare', label: 'Уход за кожей', icon: '💆' },
    { id: 'analysis', label: 'Анализ состава', icon: '🔬' },
  ] as const,
} as const;
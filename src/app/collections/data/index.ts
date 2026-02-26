// src/app/collections/data/index.ts
import { Collection } from '@/types/collections';
import { giftCollections } from './gifts';
import { foodCollections } from './food';
import { movieCollections } from './movies';
import { bookCollections } from './books';
import { skincareCollections } from './skincare';

// Все коллекции для главной страницы
export const allCollections: Collection[] = [
  ...giftCollections,
  ...foodCollections,
  ...movieCollections,
  ...bookCollections,
  ...skincareCollections
];

// Для получения конкретной коллекции
export function getCollectionById(id: string) {
  return allCollections.find(c => c.id === id);
}

// Для получения коллекций по модулю
export function getCollectionsByModule(module: string) {
  return allCollections.filter(c => c.module === module);
}

// Для категорий на главной
export const categories = [
  { id: 'all', label: 'Все подборки' },
  { id: 'gifts', label: 'Подарки' },
  { id: 'food', label: 'Рецепты' },
  { id: 'movies', label: 'Фильмы' },
  { id: 'books', label: 'Книги' },
  { id: 'skincare', label: 'Уход' }
];

// Для обратной совместимости с существующей страницей
export const allCollectionsSummary = allCollections.map(c => ({
  id: c.id,
  module: c.module,
  title: c.title,
  description: c.description,
  image: c.image,
  itemsCount: c.items.length,
  category: c.category || c.module
}));
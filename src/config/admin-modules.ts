// src/config/admin-modules.ts

import { AdminModule } from '@/types/prompt';

export const adminModules: readonly AdminModule[] = [
  // СУЩЕСТВУЮЩИЕ КАТЕГОРИИ
  {
    id: 'gifts',
    name: '🎁 Что подарить',
    category: 'Gifts', // = 1 в enum
    prompts: [
      {
        key: 'smart_gift_recommendation',
        name: 'Умный подбор подарков',
        description: 'Подбирает подарки на основе получателя и повода',
        variables: ['recipient_type', 'gift_occasion', 'budget']
      }
    ]
  },
  {
    id: 'films',
    name: '🎬 Что посмотреть',
    category: 'Films', // = 2 в enum
    prompts: [
      {
        key: 'movies_recommendation',
        name: 'Подбор фильмов',
        description: 'Рекомендует фильмы по контексту и настроению',
        variables: ['context', 'mood']
      }
    ]
  },
  {
    id: 'dishes',
    name: '🍲 Что приготовить (по названию)',
    category: 'Dishes', // = 3 в enum
    prompts: [
      {
        key: 'dishes_by_name',
        name: 'Рецепты по названию',
        description: 'Находит рецепты по названию блюда',
        variables: ['dish_name', 'cuisine_type']
      }
    ]
  },
  {
    id: 'dishes-by-ingredients',
    name: '🍳 Что приготовить (по ингредиентам)',
    category: 'DishesByIngredients', // = 4 в enum
    prompts: [
      {
        key: 'dishes_by_ingredients',
        name: 'Рецепты по ингредиентам',
        description: 'Находит рецепты на основе доступных ингредиентов',
        variables: ['available_ingredients', 'dietary_restrictions']
      }
    ]
  },
  {
    id: 'books',
    name: '📚 Что почитать',
    category: 'Books', // = 5 в enum
    prompts: [
      {
        key: 'books_recommendation',
        name: 'Подбор книг',
        description: 'Рекомендует книги по настроению и жанрам',
        variables: ['readingMood', 'preferredGenres']
      }
    ]
  },
  // НОВЫЕ КАТЕГОРИИ ДЛЯ УХОДОВЫХ СРЕДСТВ
  {
    id: 'skincare-recommendation',
    name: '💆 Подбор уходовых средств',
    category: 'SkincareRecommendation', // = 6 в enum
    prompts: [
      {
        key: 'skincare_recommendation',
        name: 'Подбор уходовой рутины',
        description: 'Подбирает уходовые средства по типу кожи и проблемам',
        variables: ['skin_type', 'skin_concerns', 'budget_range']
      }
    ]
  },
  {
    id: 'skincare-analysis',
    name: '🔬 Анализ состава уходовых средств',
    category: 'SkincareAnalysis', // = 7 в enum
    prompts: [
      {
        key: 'skincare_analysis',
        name: 'Анализ состава косметики',
        description: 'Анализирует состав косметических средств и дает рекомендации',
        variables: ['ingredient_list', 'skin_type']
      }
    ]
  }
] as const;
import { AdminModule } from '@/types/prompt';

export const adminModules: readonly AdminModule[] = [
  {
    id: '1',
    name: 'Что подарить',
    category: 'Gifts',
    prompts: [
      {
        key: 'smart_gift_recommendation', // МЕНЯЕМ на точное совпадение с API!
        name: 'Умная рекомендация',
        description: 'smart_gift_recommendation',
        variables: ['recipient_type', 'gift_occasion', 'budget']
      }
    ]
  },
  {
    id: '2',
    name: 'Что посмотреть', 
    category: 'Films',
    prompts: [
      {
        key: 'movies_recommendation',
        name: 'Рекомендация фильмов',
        description: 'movies_recommendation', 
        variables: ['context', 'mood', 'genres']
      }
    ]
  },
  {
    id: '3',
    name: 'Что приготовить (по названию)',
    category: 'Dishes', 
    prompts: [
      {
        key: 'dishes_by_name',
        name: 'По названию блюда',
        description: 'dishes_by_name', 
        variables: ['dish_name', 'diet', 'cooking_time', 'cuisine']
      }
    ]
  },
  {
    id: '4',
    name: 'Что приготовить (по ингредиентам)',
    category: 'DishesByIngredients',
    prompts: [
      {
        key: 'dishes_by_ingredients', 
        name: 'По ингредиентам',
        description: 'dishes_by_ingredients',
        variables: ['ingredients', 'diet', 'cooking_time', 'cuisine']
      }
    ]
  },
  {
    id: '5',
    name: 'Что почитать',
    category: 'Books',
    prompts: [
      {
        key: 'books_recommendation',
        name: 'Рекомендация книг',
        description: 'books_recommendation',
        variables: ['genre', 'mood', 'reading_time']
      }
    ]
  }
] as const;
import { AdminModule } from '@/types/prompt';

export const adminModules: AdminModule[] = [
    {
        id: 'cooking',
        name: '🍳 Что приготовить',
        prompts: [
          {
            key: 'by_products',
            name: 'По продуктам',
            description: 'Генерация рецептов по списку продуктов пользователя',
            variables: [
              'products', 'excludeIngredients', 'dishType', 'cookingTime', 
              'cuisine', 'diet', 'allergens', 'occasion', 'difficulty', 'cookingMethod'
            ]
          },
          {
            key: 'by_dish_name', 
            name: 'По названию блюда',
            description: 'Генерация рецепта по названию блюда с адаптацией',
            variables: [
              'dishName', 'excludeIngredients', 'dishType', 'cookingTime',
              'cuisine', 'diet', 'allergens', 'occasion', 'difficulty', 'cookingMethod'
            ]
          }
        ]
    },
    {
    id: 'gifts',
    name: '🎁 Что подарить',
    prompts: [
      {
        key: 'by_interests',
        name: 'По интересам',
        description: 'Генерация подарков на основе интересов и характеристик',
        variables: ['category', 'profession', 'interests', 'personality', 'budget', 'occasion', 'giftTypes', 'age', 'gender', 'excludeTitles']
      }
    ]
  },
  {
    id: 'movies',
    name: '🎬 Что посмотреть',
    prompts: [
      {
        key: 'by_mood',
        name: 'По настроению',
        description: 'Генерация фильмов по настроению и предпочтениям',
        variables: ['mood', 'genre', 'duration', 'year', 'excludeTitles']
      }
    ]
  },
  {
    id: 'books',
    name: '📚 Что почитать', 
    prompts: [
      {
        key: 'by_preferences',
        name: 'По предпочтениям',
        description: 'Генерация книг по жанрам и интересам',
        variables: ['genre', 'mood', 'length', 'year', 'excludeTitles']
      }
    ]
  }
];
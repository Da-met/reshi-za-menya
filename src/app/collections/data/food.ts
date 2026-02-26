// src/app/collections/data/food.ts
import { Collection } from '@/types/collections';
import type { FoodResponse } from '@/types/food';

const newYearRecipes: FoodResponse['recipe'][] = [
  {
    id: 'f1',
    title: 'Салат "Оливье" с лососем',
    description: 'Классический новогодний салат в новой интерпретации — с малосольным лососем вместо колбасы',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    ingredients: {
      available: [
        { name: 'Картофель', quantity: '4 шт' },
        { name: 'Морковь', quantity: '2 шт' },
        { name: 'Яйца', quantity: '4 шт' }
      ],
      toBuy: [
        { name: 'Лосось слабосоленый', quantity: '300 г' },
        { name: 'Зеленый горошек', quantity: '1 банка' },
        { name: 'Майонез', quantity: '200 г' }
      ]
    },
    steps: [
      'Отварите картофель, морковь и яйца до готовности',
      'Нарежьте все ингредиенты кубиками',
      'Добавьте горошек и нарезанный лосось',
      'Заправьте майонезом и перемешайте',
      'Украсьте зеленью перед подачей'
    ],
    cookingTime: '60 минут',
    difficulty: 'Легко',
    cuisine: 'Русская',
    dishType: 'Салат',
    servings: '6 порций',
    tips: ['Лосось можно заменить форелью', 'Для пикантности добавьте каперсы']
  },
  {
    id: 'f2',
    title: 'Утка с яблоками и апельсинами',
    description: 'Сочная утка с фруктами — главное блюдо новогоднего стола',
    imageUrl: 'https://images.unsplash.com/photo-1590975227459-7fa8e1623029?w=600&h=400&fit=crop',
    ingredients: {
      available: [
        { name: 'Утка', quantity: '2-2.5 кг' },
        { name: 'Яблоки', quantity: '3 шт' },
        { name: 'Апельсины', quantity: '2 шт' }
      ],
      toBuy: [
        { name: 'Мед', quantity: '2 ст.л' },
        { name: 'Горчица', quantity: '1 ст.л' },
        { name: 'Розмарин', quantity: '1 пучок' }
      ]
    },
    steps: [
      'Замаринуйте утку в медово-горчичной смеси',
      'Нафаршируйте утку дольками яблок и апельсинов',
      'Запекайте при 180°C 2 часа',
      'Каждые 30 минут поливайте соком'
    ],
    cookingTime: '2.5 часа',
    difficulty: 'Средне',
    cuisine: 'Европейская',
    dishType: 'Горячее',
    servings: '6-8 порций',
    nutritionInfo: {
      calories: '350 ккал'
    }
  }
];

// Добавим другие коллекции
const quickRecipes: FoodResponse['recipe'][] = [
  {
    id: 'f3',
    title: 'Паста карбонара за 15 минут',
    description: 'Классическая итальянская паста для быстрого ужина',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop',
    ingredients: {
      available: [],
      toBuy: [
        { name: 'Спагетти', quantity: '300 г' },
        { name: 'Бекон', quantity: '150 г' },
        { name: 'Яйца', quantity: '3 шт' },
        { name: 'Пармезан', quantity: '100 г' }
      ]
    },
    steps: [
      'Обжарьте бекон до хруста',
      'Отварите пасту',
      'Смешайте яйца с тертым сыром',
      'Соедините всё и прогрейте'
    ],
    cookingTime: '15 минут',
    difficulty: 'Легко',
    cuisine: 'Итальянская',
    dishType: 'Паста',
    servings: '3 порции'
  }
];

export const foodCollections: Collection[] = [
  {
    id: '3',
    module: 'food',
    title: 'Новогодние рецепты',
    description: 'Блюда для праздничного стола - от закусок до десертов',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    category: 'food',
    items: newYearRecipes.map(recipe => ({ module: 'food', data: recipe }))
  },
  {
    id: '4',
    module: 'food',
    title: 'Быстрые рецепты',
    description: 'Вкусные блюда на скорую руку для занятых дней',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    category: 'food',
    items: quickRecipes.map(recipe => ({ module: 'food', data: recipe }))
  }
];
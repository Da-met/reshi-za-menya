// src/app/books/sitemap.ts

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reshizamena.ru';

  // Основные категории для книг
  const bookCategories = [
    'fiction',
    'nonfiction',
    'fantasy',
    'science',
    'history',
    'biography',
    'classic',
    'detective',
    'romance',
    'adventure'
  ];

  const moodCategories = [
    'relax',
    'inspire',
    'think',
    'entertain',
    'learn',
    'emotions',
    'escape'
  ];

  return [
    // Главная страница книг
    {
      url: `${baseUrl}/books`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    // Страница сохраненных книг
    {
      url: `${baseUrl}/books?view=saved`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Страницы по жанрам
    ...bookCategories.map((genre) => ({
      url: `${baseUrl}/books/${genre}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Страницы по настроению
    ...moodCategories.map((mood) => ({
      url: `${baseUrl}/books/${mood}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
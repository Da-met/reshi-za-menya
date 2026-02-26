import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reshizamena.ru';
  
  // Основные жанры и категории для фильмов
  const movieCategories = [
    'comedy',
    'drama', 
    'action',
    'thriller',
    'horror',
    'romance',
    'fantasy',
    'sci-fi',
    'family',
    'cartoon',
    'anime',
    'documentary'
  ];

  const moodCategories = [
    'funny',
    'thrilling', 
    'thoughtful',
    'romantic',
    'inspiring'
  ];

  const contextCategories = [
    'family',
    'friends',
    'solo', 
    'romance',
    'party'
  ];

  return [
    // Главная страница фильмов
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    // Страница сохраненных фильмов
    {
      url: `${baseUrl}/movies?saved`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Страницы по жанрам
    ...movieCategories.map((genre) => ({
      url: `${baseUrl}/movies/${genre}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Страницы по настроению
    ...moodCategories.map((mood) => ({
      url: `${baseUrl}/movies/${mood}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    // Страницы по контексту просмотра
    ...contextCategories.map((context) => ({
      url: `${baseUrl}/movies/${context}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
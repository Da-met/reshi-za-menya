// src/lib/image-fallback.ts
/**
 * Простая утилита для fallback изображений
 * Используем Lorem Picsum - самый надежный сервис
 */

export function getProductImage(): string {
  // Lorem Picsum всегда работает
  // Добавляем случайный ID для разных изображений
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/400/300?random=${randomId}`;
}

// Или если хотим определенные категории
export function getSkincareImage(category?: string): string {
  const categories: Record<string, number> = {
    'serum': 1,
    'cleanser': 2,
    'moisturizer': 3,
    'sunscreen': 4,
    'default': 5
  };
  
  const imageId = categories[category || 'default'] || 1;
  return `https://picsum.photos/400/300?image=${imageId}`;
}

// Простой fallback SVG (работает всегда)
export const SIMPLE_FALLBACK_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f0f0f0'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' text-anchor='middle' fill='%23666'%3EУходовое средство%3C/text%3E%3C/svg%3E`;
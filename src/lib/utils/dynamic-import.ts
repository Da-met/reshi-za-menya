/**
 * Утилиты для оптимизированной динамической загрузки компонентов
 */

import { ComponentType, lazy } from 'react';

// Интерфейс для компонентов с предзагрузкой
interface PreloadableComponent {
  preload: () => Promise<void>;
}

/**
 * Создает лениво загружаемый компонент с предзагрузкой
 */
export function lazyWithPreload<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  name?: string
): T & PreloadableComponent {
  const LazyComponent = lazy(factory) as unknown as T & PreloadableComponent;
  
  let preloaded = false;
  let preloadPromise: Promise<void> | null = null;

  const preload = () => {
    if (!preloaded && !preloadPromise) {
      preloadPromise = factory().then(() => {
        preloaded = true;
        preloadPromise = null;
        if (name) {
          console.log(`✅ Предзагружен компонент: ${name}`);
        }
      });
    }
    return preloadPromise || Promise.resolve();
  };

  LazyComponent.preload = preload;
  
  return LazyComponent;
}
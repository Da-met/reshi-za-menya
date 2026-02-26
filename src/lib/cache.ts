/**
 * Улучшенная система кэширования с TTL и LRU поддержкой
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
  accessCount: number;
  lastAccessed: number;
}

class EnhancedMemoryCache {
  private cache = new Map<string, CacheItem<unknown>>();
  private maxSize = 100;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Автоматическая очистка каждые 5 минут
    this.startCleanup();
  }

  /**
   * Сохраняет данные в кэш
   */
  set<T>(key: string, data: T, expiresIn: number = 5 * 60 * 1000): void {
    // LRU: удаляем наименее используемый элемент если кэш полон
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiresIn,
      accessCount: 0,
      lastAccessed: Date.now(),
    });
  }

  /**
   * Получает данные из кэша
   */
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Проверяем, не истек ли срок действия
    if (Date.now() - item.timestamp > item.expiresIn) {
      this.cache.delete(key);
      return null;
    }

    // Обновляем статистику использования
    item.accessCount++;
    item.lastAccessed = Date.now();

    return item.data as T;
  }

  /**
   * Удаляет данные из кэш
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Удаляет наименее используемый элемент (LRU)
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let minAccessTime = Date.now();
    let minAccessCount = Infinity;

    this.cache.forEach((item, key) => {
      // Приоритет: сначала по количеству обращений, затем по времени
      if (item.accessCount < minAccessCount || 
          (item.accessCount === minAccessCount && item.lastAccessed < minAccessTime)) {
        lruKey = key;
        minAccessCount = item.accessCount;
        minAccessTime = item.lastAccessed;
      }
    });

    if (lruKey) {
      this.cache.delete(lruKey);
    }
  }

  /**
   * Очищает просроченные записи
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.cache.forEach((item, key) => {
      if (now - item.timestamp > item.expiresIn) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Запускает периодическую очистку
   */
  private startCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // Каждые 5 минут
  }

  /**
   * Останавливает очистку
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Полностью очищает кэш
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Возвращает статистику кэша
   */
  stats(): { size: number; hitRate?: number } {
    return {
      size: this.cache.size,
    };
  }
}

// Создаем экземпляры кэша для разных целей
export const skincareCache = new EnhancedMemoryCache();
export const giftsCache = new EnhancedMemoryCache();     // ← НОВЫЙ!
export const recipesCache = new EnhancedMemoryCache();   // ← Для будущего модуля "Что приготовить"
export const moviesCache = new EnhancedMemoryCache();    // ← Для будущего модуля "Что посмотреть"
export const booksCache = new EnhancedMemoryCache();     // ← Для будущего модуля "Что почитать"
export const analyzerCache = new EnhancedMemoryCache();
export const searchCache = new EnhancedMemoryCache();
export const imageCache = new EnhancedMemoryCache();
export const foodCache = new EnhancedMemoryCache();


/**
 * Получает кэш для конкретного модуля
 */
export function getCacheForModule(moduleName: string): EnhancedMemoryCache {
  switch (moduleName) {
    case 'skincare': return skincareCache;
    case 'gifts': return giftsCache;
    case 'recipes': return recipesCache;
    case 'movies': return moviesCache;
    case 'books': return booksCache;
    case 'analyzer': return analyzerCache;
    case 'search': return searchCache;
    case 'images': return imageCache;
    default: return skincareCache; // fallback
  }
}

/**
 * Генерирует ключ кэша для SkincareRequest
 */
export function generateCacheKey(request: Record<string, unknown>): string {
  // Определяем тип запроса
  if (request._type === 'analyzer' || request.productName) {
    return generateAnalyzerCacheKey(request);
  }
  
  // По умолчанию для skincare
  const normalizedRequest = {
    skin_type: request.skin_type,
    concerns: Array.isArray(request.concerns) 
      ? [...request.concerns].sort().join(',')
      : '',
    desired_product_type: request.desired_product_type,
    budget: request.budget,
    age_group: request.age_group,
    spf_needed: request.spf_needed,
    brand_preference: Array.isArray(request.brand_preference) 
      ? [...request.brand_preference].sort().join(',')
      : '',
  };

  const jsonString = JSON.stringify(normalizedRequest);
  return `skincare_${simpleHash(jsonString)}`;
}

/**
 * Генерирует ключ кэша для анализатора
 */
export function generateAnalyzerCacheKey(request: Record<string, unknown>): string {
  const productName = request.productName as string || '';
  const skinType = request.skinType as string || '';
  const concerns = Array.isArray(request.skinConcerns) 
    ? [...request.skinConcerns].sort().join(',') 
    : '';
  
  // Нормализуем название продукта (убираем лишние пробелы, приводим к нижнему регистру)
  const normalizedProductName = productName.trim().toLowerCase().replace(/\s+/g, ' ');
  
  const keyString = `${normalizedProductName}|${skinType}|${concerns}`;
  return `analyzer_${simpleHash(keyString)}`;
}

/**
 * Простая хэш-функция для строк
 */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Кэширует результат функции с автоматическим обновлением
 */
export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  expiresIn: number = 10 * 60 * 1000,
  cacheInstance: EnhancedMemoryCache = skincareCache
): Promise<T> {
  // Пытаемся получить из кэша
  const cached = cacheInstance.get<T>(key);
  if (cached) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Cache hit: ${key.substring(0, 50)}...`);
    }
    return cached;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`🔄 Cache miss: ${key.substring(0, 50)}...`);
  }
  
  // Выполняем функцию и кэшируем результат
  try {
    const result = await fn();
    cacheInstance.set(key, result, expiresIn);
    return result;
  } catch (error) {
    console.error('Cache function error:', error);
    throw error;
  }
}

/**
 * Очищает все кэши
 */
export function clearAllCaches(): void {
  skincareCache.clear();
  searchCache.clear();
  imageCache.clear();
}

/**
 * DEV утилита: логирует статистику кэша
 */
export function logCacheStats(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Cache Statistics:', {
      skincare: skincareCache.stats(),
      analyzer: analyzerCache.stats(), // ← ДОБАВИТЬ
      search: searchCache.stats(),
      image: imageCache.stats(),
    });
  }
}
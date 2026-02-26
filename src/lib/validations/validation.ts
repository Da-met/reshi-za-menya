/**
 * Утилиты для валидации данных
 */

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Валидирует данные SkincareRequest
 */
export const validateSkincareRequest = (data: unknown): boolean => {
  if (!isObject(data)) return false;
  
  // Проверка skin_type
  if (data.skin_type && !isString(data.skin_type)) return false;
  
  // Проверка concerns
  if (data.concerns) {
    if (!isArray(data.concerns)) return false;
    if (!data.concerns.every(isString)) return false;
  }
  
  // Проверка других полей
  const allowedFields = [
    'skin_type', 'concerns', 'desired_product_type', 
    'budget', 'brand_preference', 'exclude_ingredients',
    'spf_needed', 'age_group', 'exclude_titles'
  ];
  
  return Object.keys(data).every(key => allowedFields.includes(key));
};
// src/hooks/food/useFoodForm.ts

'use client';

import { useState, useCallback, useMemo } from 'react';
import { FoodRequest } from '@/types/food';

const initialRequest: FoodRequest = {
  mode: 'products',
  products: [],
  excludeIngredients: [],
  filters: {}
};

export const useFoodForm = (initialRequestOverride?: Partial<FoodRequest>) => {
  // Инициализация с дефолтными значениями
  const [request, setRequest] = useState<FoodRequest>(() => ({
    ...initialRequest,
    ...initialRequestOverride
  }));

  // Оптимизированный updateRequest с глубоким сравнением
  const updateRequest = useCallback((updates: Partial<FoodRequest>) => {
    setRequest(prev => {
      // Проверяем, действительно ли есть изменения
      let hasChanges = false;

      for (const key in updates) {
        const typedKey = key as keyof FoodRequest;
        const newValue = updates[typedKey];
        const oldValue = prev[typedKey];

        // Сравниваем массивы
        if (Array.isArray(newValue) && Array.isArray(oldValue)) {
          if (newValue.length !== oldValue.length ||
              !newValue.every((val, idx) => val === oldValue[idx])) {
            hasChanges = true;
            break;
          }
        } 
        // Сравниваем объекты filters
        else if (typedKey === 'filters' && newValue && oldValue) {
          const newFilters = newValue as typeof prev.filters;
          const oldFilters = oldValue as typeof prev.filters;
          
          // Сравниваем все поля filters
          if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
            hasChanges = true;
            break;
          }
        }
        // Сравниваем примитивы
        else if (newValue !== oldValue) {
          hasChanges = true;
          break;
        }
      }

      return hasChanges ? { ...prev, ...updates } : prev;
    });
  }, []);

  // Сброс формы к начальному состоянию
  const resetRequest = useCallback(() => {
    setRequest(initialRequest);
  }, []);

  // Сброс только фильтров (полезно при смене режима)
  const resetFilters = useCallback(() => {
    setRequest(prev => ({
      ...prev,
      filters: {}
    }));
  }, []);

  // Очистка продуктов (при смене режима)
  const clearProducts = useCallback(() => {
    setRequest(prev => ({
      ...prev,
      products: []
    }));
  }, []);

  // Очистка названия блюда (при смене режима)
  const clearDishName = useCallback(() => {
    setRequest(prev => ({
      ...prev,
      dishName: undefined
    }));
  }, []);

  // Валидация формы
  const isValid = useMemo(() => {
    if (request.mode === 'products') {
      return !!request.products?.length;
    } else {
      return !!request.dishName?.trim();
    }
  }, [request.mode, request.products, request.dishName]);

  // Подсчет выбранных параметров
  const selectedCount = useMemo(() => {
    let count = 0;

    // Продукты
    if (request.mode === 'products' && request.products?.length) {
      count += request.products.length;
    }

    // Название блюда
    if (request.mode === 'dish' && request.dishName) {
      count += 1;
    }

    // Исключенные ингредиенты
    if (request.excludeIngredients?.length) {
      count += request.excludeIngredients.length;
    }

    // Фильтры
    const filters = request.filters;
    if (filters.dishType) count++;
    if (filters.cookingTime) count++;
    if (filters.cuisine) count++;
    if (filters.diet) count++;
    if (filters.allergens?.length) count += filters.allergens.length;
    if (filters.occasion) count++;
    if (filters.difficulty) count++;
    if (filters.cookingMethod) count++;

    return count;
  }, [request]);

  return {
    request,
    updateRequest,
    resetRequest,
    resetFilters,
    clearProducts,
    clearDishName,
    isValid,
    selectedCount
  };
};
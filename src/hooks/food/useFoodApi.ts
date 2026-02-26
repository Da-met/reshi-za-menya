// src/hooks/food/useFoodApi.ts

'use client';

import { useState, useCallback } from 'react';
import { FoodRequest, FoodResponse } from '@/types/food';
import { AppError, withTimeout, retryWithBackoff, createFoodError } from '@/lib/error-handling';
import { withCache, generateCacheKey, foodCache } from '@/lib/cache';

interface UseFoodApiProps {
  onSuccess?: (response: FoodResponse) => void;
  onError?: (error: AppError) => void;
  timeoutMs?: number;
  maxRetries?: number;
  enableCache?: boolean;
  cacheTTL?: number;
}

export function useFoodApi({
  onSuccess,
  onError,
  timeoutMs = 30000,
  maxRetries = 2,
  enableCache = true,
  cacheTTL = 3600000,
}: UseFoodApiProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generateRecipe = useCallback(async (
    request: FoodRequest,
    excludeTitle?: string
  ): Promise<FoodResponse> => {
    if (isLoading) {
      throw createFoodError(new Error('Операция уже выполняется'), 'generateRecipe');
    }

    setIsLoading(true);
    setError(null);

    try {
      const templateName = request.mode === 'products' 
        ? "dishes_by_ingredients" 
        : "dishes_by_name";
      
      const category = request.mode === 'products' 
        ? "DishesByIngredients" 
        : "Dishes";

      const operation = async (): Promise<FoodResponse> => {
        const parameters: Record<string, string | undefined> = {};

        if (request.mode === 'products' && request.products?.length) {
          parameters.ingredients = request.products.join(', ');
          if (request.filters.cookingTime) parameters.request_cooking_time = request.filters.cookingTime;
          if (request.filters.cuisine) parameters.request_cuisine = request.filters.cuisine;
          if (request.filters.dishType) parameters.request_dish_type = request.filters.dishType;
          if (request.filters.difficulty) parameters.request_difficulty = request.filters.difficulty;
        }

        // Количество порций
        if (request.filters.requestServings) {
          parameters.servings = request.filters.requestServings;
        }
        
        // Цель питания
        if (request.filters.healthGoal) {
          parameters.health_goal = request.filters.healthGoal;
        }
        
        // Калорийность
        if (request.filters.calorieRange) {
          parameters.calorie_range = request.filters.calorieRange;
        }
        
        // Исключения по составу
        if (request.filters.excludeComposition?.length) {
          parameters.exclude_composition = request.filters.excludeComposition.join(', ');
        }

        // Параметры для режима "по названию блюда"
        if (request.mode === 'dish' && request.dishName) {
          parameters.dish_name = request.dishName;
        }

        if (request.mode === 'dish' && request.dishName) {
          parameters.dish_name = request.dishName;
        }

        if (request.excludeIngredients?.length) {
          parameters.exclude_ingredients = request.excludeIngredients.join(', ');
        }
        if (request.filters.diet) parameters.diet = request.filters.diet;
        if (request.filters.occasion) parameters.occasion = request.filters.occasion;
        if (request.filters.cookingMethod) parameters.cooking_method = request.filters.cookingMethod;

        if (excludeTitle) {
          parameters.exclude_titles = excludeTitle;
        }

        const response = await fetch('/api/prompt-templates/generate-structured', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            templateName,
            category,
            parameters
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.ErrorMessage || `HTTP ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse.jsonStructuredResponse) {
          throw new Error('Некорректный ответ от сервера');
        }

        const rawData = apiResponse.jsonStructuredResponse;

        const recipeData: FoodResponse = {
          generationId: apiResponse.generationId || Date.now().toString(),
          recipe: {
            id: `recipe-${Date.now()}`,
            title: rawData.title || 'Рецепт',
            description: rawData.description || '',
            imageUrl: rawData.imageUrl,
            // 👇 ЛОГИКА ДЛЯ ИНГРЕДИЕНТОВ
            ingredients: {
              // В режиме "products" - available из API, в режиме "dish" - пусто
              available: request.mode === 'products' 
                ? (Array.isArray(rawData.ingredients_available) ? rawData.ingredients_available : [])
                : [],
              
              // В режиме "products" - toBuy из API
              // В режиме "dish" - все ингредиенты (available + toBuy) попадают в toBuy
              toBuy: request.mode === 'products'
                ? (Array.isArray(rawData.ingredients_to_buy) ? rawData.ingredients_to_buy : [])
                : [
                    ...(Array.isArray(rawData.ingredients_available) ? rawData.ingredients_available : []),
                    ...(Array.isArray(rawData.ingredients_to_buy) ? rawData.ingredients_to_buy : [])
                  ]
            },
            steps: Array.isArray(rawData.steps) ? rawData.steps : [],
            cookingTime: rawData.cooking_time || 'Не указано',
            difficulty: rawData.difficulty || 'Средне',
            nutritionInfo: rawData.nutrition_info ? {
              calories: rawData.nutrition_info.calories,
              protein: rawData.nutrition_info.protein,
              carbs: rawData.nutrition_info.carbs,
              fats: rawData.nutrition_info.fats
            } : undefined,
            tips: Array.isArray(rawData.tips) ? rawData.tips : [],
            cuisine: rawData.cuisine,
            dishType: rawData.dish_type,
            servings: rawData.servings,
            whyPerfect: rawData.why_perfect
          }
        };

        return recipeData;
      };

      let result: FoodResponse;

      if (enableCache && !excludeTitle) {
        const cacheKey = generateCacheKey({ 
          ...request, 
          _type: 'food',
          mode: request.mode 
        });
        
        result = await withCache(
          cacheKey,
          () => withTimeout(retryWithBackoff(operation, maxRetries), timeoutMs),
          cacheTTL,
          foodCache
        );
      } else {
        result = await withTimeout(
          retryWithBackoff(operation, maxRetries),
          timeoutMs
        );
      }

      onSuccess?.(result);
      return result;

    } catch (err) {
      const foodError = err instanceof AppError
        ? err
        : createFoodError(err, 'generateRecipe');
      
      setError(foodError);
      onError?.(foodError);
      throw foodError;
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, onSuccess, onError, timeoutMs, maxRetries, enableCache, cacheTTL]);

  return {
    generateRecipe,
    isLoading,
    error,
    clearError
  };
}
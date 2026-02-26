// src/components/food/FoodRequestDetails.tsx
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { FoodRequest } from '@/types/food';
import { FoodOptionTag } from './FoodOptionTag';
import {
  dishTypeLabels,
  cuisineLabels,
  DIFFICULTY_LEVELS,
  COOKING_TIMES,
  DIETS,
  OCCASIONS,
  COOKING_METHODS
} from '@/constants/food.constants';

interface FoodRequestDetailsProps {
  request: FoodRequest;
  savedAt?: Date;
  className?: string;
}

function FoodRequestDetailsComponent({ request, savedAt, className = '' }: FoodRequestDetailsProps) {
  // Функция для получения лейбла фильтра
  const getFilterLabel = (type: string, value: string): string => {
    switch (type) {
      case 'dishType':
        return dishTypeLabels[value] || value;
      case 'cuisine':
        return cuisineLabels[value] || value;
      case 'difficulty':
        return DIFFICULTY_LEVELS.find(d => d.id === value)?.label || value;
      case 'cookingTime':
        return COOKING_TIMES.find(t => t.id === value)?.label || value;
      case 'diet':
        return DIETS.find(d => d.id === value)?.label || value;
      case 'occasion':
        return OCCASIONS.find(o => o.id === value)?.label || value;
      case 'cookingMethod':
        return COOKING_METHODS.find(m => m.id === value)?.label || value;
      default:
        return value;
    }
  };

  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-lg md:text-xl text-foreground mb-4">Детали запроса</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {/* Режим ввода */}
        <FoodOptionTag
          type="mode"
          label={request.mode === 'products' ? 'По продуктам' : 'По названию'}
        />

        {/* Продукты */}
        {request.mode === 'products' && request.products?.map(product => (
          <FoodOptionTag
            key={product}
            type="product"
            label={product}
          />
        ))}

        {/* Название блюда */}
        {request.mode === 'dish' && request.dishName && (
          <FoodOptionTag
            type="dish"
            label={request.dishName}
          />
        )}

        {/* Исключенные ингредиенты */}
        {request.excludeIngredients?.map(ingredient => (
          <FoodOptionTag
            key={ingredient}
            type="exclude"
            label={ingredient}
          />
        ))}

        {/* Фильтры */}
        {request.filters.dishType && (
          <FoodOptionTag
            type="dishType"
            label={getFilterLabel('dishType', request.filters.dishType)}
          />
        )}

        {request.filters.cookingTime && (
          <FoodOptionTag
            type="cookingTime"
            label={getFilterLabel('cookingTime', request.filters.cookingTime)}
          />
        )}

        {request.filters.cuisine && (
          <FoodOptionTag
            type="cuisine"
            label={getFilterLabel('cuisine', request.filters.cuisine)}
          />
        )}

        {request.filters.diet && (
          <FoodOptionTag
            type="diet"
            label={getFilterLabel('diet', request.filters.diet)}
          />
        )}

        {request.filters.occasion && (
          <FoodOptionTag
            type="occasion"
            label={getFilterLabel('occasion', request.filters.occasion)}
          />
        )}

        {request.filters.difficulty && (
          <FoodOptionTag
            type="difficulty"
            label={getFilterLabel('difficulty', request.filters.difficulty)}
          />
        )}

        {request.filters.cookingMethod && (
          <FoodOptionTag
            type="cookingMethod"
            label={getFilterLabel('cookingMethod', request.filters.cookingMethod)}
          />
        )}
      </div>

      {/* Дата сохранения - как в skincare */}
      {savedAt && (
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground pt-4 border-t border-border">
          <Clock size={12} />
          <span>Сохранено {savedAt.toLocaleDateString('ru-RU')}</span>
        </div>
      )}
    </div>
  );
}

export const FoodRequestDetails = React.memo(FoodRequestDetailsComponent);
FoodRequestDetails.displayName = 'FoodRequestDetails';
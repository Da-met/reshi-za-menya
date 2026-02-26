'use client';

import React from 'react';
import { FoodRequest } from '@/types/food';
import { FoodOptionTag } from './FoodOptionTag';
import {
  dishTypeLabels,
  cuisineLabels,
  DIFFICULTY_LEVELS,
  COOKING_TIMES,
  DIETS,
  OCCASIONS,
  COOKING_METHODS,
  ALLERGENS,
  HEALTH_GOALS,
  CALORIE_RANGES,
  EXCLUDE_COMPOSITION
} from '@/constants/food.constants';

interface SelectedOptionsProps {
  request: FoodRequest;
}

function SelectedOptionsComponent({ request }: SelectedOptionsProps) {
  const hasSelections =
    (request.mode === 'products' && request.products?.length) ||
    (request.mode === 'dish' && request.dishName?.trim()) ||
    request.excludeIngredients?.length ||
    Object.values(request.filters).some(value =>
      Array.isArray(value) ? value.length > 0 : !!value
    );

  if (!hasSelections) {
    return null;
  }

  // Считаем общее количество выбранных параметров
  const totalSelections =
    (request.mode === 'products' ? request.products?.length || 0 : 0) +
    (request.mode === 'dish' && request.dishName ? 1 : 0) +
    (request.excludeIngredients?.length || 0) +
    Object.values(request.filters).filter(value =>
      Array.isArray(value) ? value.length > 0 : !!value
    ).length;

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
      // 👇 ДОБАВЛЯЕМ НОВЫЕ
      case 'servings':
        return `${value} порций`;
      case 'healthGoal':
        return HEALTH_GOALS.find(g => g.id === value)?.label || value;
      case 'calorieRange':
        return CALORIE_RANGES.find(c => c.id === value)?.label || value;
      default:
        return value;
    }
  };

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>

      <div className="flex flex-wrap gap-1 md:gap-2">
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

        {request.filters.allergens?.map(allergen => (
          <FoodOptionTag
            key={allergen}
            type="allergen"
            label={ALLERGENS.find(a => a.id === allergen)?.label || allergen}
          />
        ))}

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

        {/* Новые фильтры */}
      {request.filters.requestServings && (
        <FoodOptionTag
          type="requestServings"
          label={`${request.filters.requestServings} порций`}
        />
      )}

      {request.filters.healthGoal && (
        <FoodOptionTag
          type="healthGoal"
          label={getFilterLabel('healthGoal', request.filters.healthGoal)}
        />
      )}

      {request.filters.calorieRange && (
        <FoodOptionTag
          type="calorieRange"
          label={getFilterLabel('calorieRange', request.filters.calorieRange)}
        />
      )}

      {request.filters.excludeComposition?.map(item => (
        <FoodOptionTag
          key={item}
          type="excludeComposition"
          label={EXCLUDE_COMPOSITION.find(e => e.id === item)?.label || item}
        />
      ))}
      </div>



      {/* Счетчик выбранных параметров */}
      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
        <p className="text-xs md:text-sm text-muted-foreground">
          Выбрано параметров: {totalSelections}
        </p>
      </div>
    </div>
  );
}

export const SelectedOptions = React.memo(SelectedOptionsComponent);
SelectedOptions.displayName = 'SelectedOptions';
'use client';

import React from 'react';
import { useState } from 'react';
import { FoodRequest } from '@/types/food';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import {
  DISH_TYPES,
  COOKING_TIMES,
  CUISINES,
  SERVINGS,
  HEALTH_GOALS,
  CALORIE_RANGES,
  EXCLUDE_COMPOSITION,
  DIETS,
  ALLERGENS,
  OCCASIONS,
  DIFFICULTY_LEVELS,
  COOKING_METHODS
} from '@/constants/food.constants';

interface FiltersSectionProps {
  request: FoodRequest;
  onChange: (updates: Partial<FoodRequest>) => void;
}

function FiltersSectionComponent({ request, onChange }: FiltersSectionProps) {
  const [showAdditional, setShowAdditional] = useState(false);

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    onChange({
      filters: {
        ...request.filters,
        [filterType]: value
      }
    });
  };

  const handleArrayFilterChange = (filterType: string, itemId: string) => {
    const currentArray = request.filters[filterType as keyof typeof request.filters] as string[] || [];
    const newArray = currentArray.includes(itemId)
      ? currentArray.filter(item => item !== itemId)
      : [...currentArray, itemId];
    
    handleFilterChange(filterType, newArray);
  };

  const renderFilterGroup = (
    title: string,
    filters: readonly { id: string; label: string; }[],
    filterType: string,
    isMultiple = false
  ) => (
    <div className="mb-6">
      <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filters.map(filter => {
          const isSelected = isMultiple
            ? (request.filters[filterType as keyof typeof request.filters] as string[] || []).includes(filter.id)
            : request.filters[filterType as keyof typeof request.filters] === filter.id;

          return (
            <button
              key={filter.id}
              onClick={() => 
                isMultiple 
                  ? handleArrayFilterChange(filterType, filter.id)
                  : handleFilterChange(filterType, isSelected ? '' : filter.id)
              }
              className={`
                p-2 md:p-3 
                rounded-lg 
                border-2 
                text-xs md:text-sm 
                font-medium 
                transition-all 
                text-center
                ${isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                  : 'bg-card border-border text-foreground hover:border-primary hover:shadow-sm'
                }
              `}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Уточните параметры рецепта
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Выберите подходящие фильтры для более точного подбора
        </p>

        {/* 👇 ФИЛЬТРЫ, ДОСТУПНЫЕ В ЛЮБОМ РЕЖИМЕ */}
        {renderFilterGroup('Количество порций', SERVINGS, 'requestServings')}
        {renderFilterGroup('Цель питания', HEALTH_GOALS, 'healthGoal')}
        {renderFilterGroup('Диета', DIETS, 'diet')}
        {renderFilterGroup('Исключить по составу', EXCLUDE_COMPOSITION, 'excludeComposition', true)}

        {/* 👇 ФИЛЬТРЫ, ДОСТУПНЫЕ ТОЛЬКО В РЕЖИМЕ "ПО ПРОДУКТАМ" */}
        {request.mode === 'products' && (
          <>
            {renderFilterGroup('Тип блюда', DISH_TYPES, 'dishType')}
            {renderFilterGroup('Время приготовления', COOKING_TIMES, 'cookingTime')}
            {renderFilterGroup('Кухня мира', CUISINES, 'cuisine')}
            {renderFilterGroup('Калорийность', CALORIE_RANGES, 'calorieRange')}
            {renderFilterGroup('Сложность', DIFFICULTY_LEVELS, 'difficulty')}
            {renderFilterGroup('Способ приготовления', COOKING_METHODS, 'cookingMethod')}
            {renderFilterGroup('Повод', OCCASIONS, 'occasion')}
          </>
        )}

        {/* Дополнительные фильтры (аллергены) - доступны всегда */}
        <div className="border-t border-border pt-8 mt-8">
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="flex items-center justify-between w-full p-5 bg-primary/5 hover:bg-primary/10 rounded-xl border border-primary/20 transition-all group mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Filter size={18} className="text-primary" />
              </div>
              <div className="text-left">
                <span className="text-lg font-medium text-foreground">Аллергены</span>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Исключить продукты, вызывающие аллергию
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/50 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-primary">
                {showAdditional ? 'скрыть' : 'показать'}
              </span>
              {showAdditional ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-primary" />}
            </div>
          </button>

          {showAdditional && (
            <div className="space-y-6 animate-in fade-in duration-300 pt-2">
              {renderFilterGroup('Аллергены', ALLERGENS, 'allergens', true)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const FiltersSection = React.memo(FiltersSectionComponent);
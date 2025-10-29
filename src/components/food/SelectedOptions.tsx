'use client';

import { FoodRequest } from '@/types/food';
import { Utensils, Search, X, Clock, Globe, Heart, Zap, Calendar, ChefHat } from 'lucide-react';

interface SelectedOptionsProps {
  request: FoodRequest;
}

const dishTypeLabels: Record<string, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед', 
  dinner: 'Ужин',
  dessert: 'Десерт',
  snack: 'Перекус'
};

const cuisineLabels: Record<string, string> = {
  russian: 'Русская',
  italian: 'Итальянская', 
  asian: 'Азиатская',
  georgian: 'Грузинская',
  mexican: 'Мексиканская'
};

export function SelectedOptions({ request }: SelectedOptionsProps) {
  const hasSelections = 
    (request.mode === 'products' && request.products && request.products.length > 0) ||
    (request.mode === 'dish' && request.dishName && request.dishName.trim().length > 0) ||
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

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Режим ввода */}
        <span className="bg-section-development/20 text-section-development px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium flex items-center space-x-1 flex-shrink-0">
          {request.mode === 'products' ? <Utensils size={12} /> : <Search size={12} />}
          <span>{request.mode === 'products' ? 'По продуктам' : 'По названию'}</span>
        </span>
        
        {/* Продукты */}
        {request.mode === 'products' && request.products?.map(product => (
          <span key={product} className="bg-green-100 text-green-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <span className="first-letter:uppercase">{product}</span>
          </span>
        ))}
        
        {/* Блюдо (БЕЗ КАВЫЧЕК) */}
        {request.mode === 'dish' && request.dishName && request.dishName.trim() && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <span className="first-letter:uppercase">{request.dishName}</span>
          </span>
        )}
        
        {/* Исключенные ингредиенты */}
        {request.excludeIngredients?.map(ingredient => (
          <span key={ingredient} className="bg-red-100 text-red-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <X size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="first-letter:uppercase">{ingredient}</span>
          </span>
        ))}
        
        {/* ФИЛЬТРЫ */}
        
        {/* Тип блюда */}
        {request.filters.dishType && (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Utensils size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{dishTypeLabels[request.filters.dishType]}</span>
          </span>
        )}
        
        {/* Время приготовления */}
        {request.filters.cookingTime && (
          <span className="bg-orange-100 text-orange-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Clock size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{request.filters.cookingTime}</span>
          </span>
        )}
        
        {/* Кухня */}
        {request.filters.cuisine && (
          <span className="bg-cyan-100 text-cyan-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Globe size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{cuisineLabels[request.filters.cuisine]}</span>
          </span>
        )}
        
        {/* Диета */}
        {request.filters.diet && (
          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Heart size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{request.filters.diet}</span>
          </span>
        )}
        
        {/* Сложность */}
        {request.filters.difficulty && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Zap size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{request.filters.difficulty}</span>
          </span>
        )}
        
        {/* Повод */}
        {request.filters.occasion && (
          <span className="bg-pink-100 text-pink-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{request.filters.occasion}</span>
          </span>
        )}
        
        {/* Способ приготовления */}
        {request.filters.cookingMethod && (
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <ChefHat size={10} className="md:size-[14px] flex-shrink-0" />
            <span>{request.filters.cookingMethod}</span>
          </span>
        )}
        
        {/* Аллергены */}
        {request.filters.allergens?.map(allergen => (
          <span key={allergen} className="bg-rose-100 text-rose-800 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center space-x-1 flex-shrink-0">
            <X size={10} className="md:size-[14px] flex-shrink-0" />
            <span>Без {allergen}</span>
          </span>
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
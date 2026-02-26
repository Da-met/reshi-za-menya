'use client';

import React from 'react';
import { 
  Utensils, Search, X, Clock, Globe, Heart, Zap, Calendar, ChefHat,
  AlertCircle, Users, Target, Gauge, Salad // 👈 добавил новые иконки
} from 'lucide-react';

interface FoodOptionTagProps {
  label: string;
  type: 'mode' | 'product' | 'dish' | 'exclude' | 'dishType' | 'cookingTime' | 
        'cuisine' | 'diet' | 'allergen' | 'occasion' | 'difficulty' | 'cookingMethod' | 
        'requestServings' | 'healthGoal' | 'calorieRange' | 'excludeComposition'; // 👈 добавил новые
  onRemove?: () => void;
  showRemove?: boolean;
}

const typeConfig = {
  mode: { icon: Utensils, bgColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  product: { icon: Utensils, bgColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  dish: { icon: Search, bgColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  exclude: { icon: X, bgColor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  dishType: { icon: Utensils, bgColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
  cookingTime: { icon: Clock, bgColor: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
  cuisine: { icon: Globe, bgColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' },
  diet: { icon: Heart, bgColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
  allergen: { icon: AlertCircle, bgColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' },
  occasion: { icon: Calendar, bgColor: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
  difficulty: { icon: Zap, bgColor: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  cookingMethod: { icon: ChefHat, bgColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
  requestServings: { icon: Users, bgColor: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
  // 👇 НОВЫЕ ТИПЫ
  healthGoal: { icon: Target, bgColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
  calorieRange: { icon: Gauge, bgColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
  excludeComposition: { icon: Salad, bgColor: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200' },
};

export function FoodOptionTagComponent({ 
  label, 
  type, 
  onRemove, 
  showRemove = false 
}: FoodOptionTagProps) {
  const { icon: Icon, bgColor } = typeConfig[type];

  return (
    <span className={`
      ${bgColor}
      px-3 py-1
      rounded-full
      text-xs md:text-sm
      font-medium
      flex items-center space-x-1.5
      flex-shrink-0
      transition-all duration-200
    `}>
      <Icon size={12} className="flex-shrink-0" />
      <span className="first-letter:uppercase">{label}</span>
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
          aria-label="Удалить"
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

export const FoodOptionTag = React.memo(FoodOptionTagComponent);
FoodOptionTag.displayName = 'FoodOptionTag';
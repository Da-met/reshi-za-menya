'use client';

import { SkincareRequest } from '@/types/skincare';
import { Droplets, AlertCircle, Filter, DollarSign, Cake, Sun, Tag } from 'lucide-react';

interface SelectedOptionsProps {
  request: SkincareRequest;
}

const skinTypeLabels: Record<string, string> = {
  'normal': 'Нормальная',
  'dry': 'Сухая',
  'oily': 'Жирная',
  'combination': 'Комбинированная',
  'sensitive': 'Чувствительная',
  'mature': 'Зрелая',
  'acne-prone': 'Склонная к акне',
  'dehydrated': 'Обезвоженная'
};

const productTypeLabels: Record<string, string> = {
  'cleanser': 'Очищение',
  'toner': 'Тоник',
  'serum': 'Сыворотка',
  'moisturizer': 'Увлажнение',
  'eye-cream': 'Для глаз',
  'sunscreen': 'Солнцезащита',
  'mask': 'Маски',
  'exfoliator': 'Пилинг',
  'treatment': 'Лечение',
  'oil': 'Масло',
  'mist': 'Спрей',
  'set': 'Набор'
};

const concernLabels: Record<string, string> = {
  'acne': 'Акне',
  'dryness': 'Сухость',
  'oiliness': 'Жирность',
  'pigmentation': 'Пигментация',
  'wrinkles': 'Морщины',
  'redness': 'Покраснения',
  'pores': 'Поры',
  'dullness': 'Тусклость',
  'sensitivity': 'Чувствительность',
  'hydration': 'Обезвоженность',
  'dark-circles': 'Темные круги',
  'scarring': 'Постакне'
};

const ageGroupLabels: Record<string, string> = {
  'teen': 'Подросток',
  'young': '20-30 лет',
  'mature': '30-45 лет',
  '40plus': '40+',
  '50plus': '50+'
};

export function SelectedOptions({ request }: SelectedOptionsProps) {
  // Считаем общее количество выбранных параметров
  const totalSelections = 
    (request.skin_type ? 1 : 0) +
    (request.concerns?.length || 0) +
    (request.product_type ? 1 : 0) +
    (request.budget ? 1 : 0) +
    (request.age_group ? 1 : 0) +
    (request.spf_needed !== undefined ? 1 : 0) +
    (request.brand_preference?.length || 0);

  if (totalSelections === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {/* Тип кожи */}
        {request.skin_type && (
          <span className="
          bg-blue-50 text-blue-600
          dark:bg-blue-900/20 dark:text-blue-300
            px-3 py-1 md:px-3 md:py-1.5
            rounded-full
            text-sm
            font-medium
            flex items-center space-x-1.5
            flex-shrink-0
          ">
            <Droplets size={14} className="flex-shrink-0" />
            <span>{skinTypeLabels[request.skin_type] || request.skin_type}</span>
          </span>
        )}

        {/* Проблемы кожи */}
        {request.concerns?.map((concern) => (
          <span
            key={concern}
            className="
              bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200
              px-3 py-1 md:px-3 md:py-1.5
              rounded-full
              text-sm
              font-medium
              flex items-center space-x-1.5
              flex-shrink-0
            "
          >
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{concernLabels[concern] || concern}</span>
          </span>
        ))}

        {/* Тип продукта */}
        {request.product_type && (
          <span className="
            bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200
            px-3 py-1 md:px-3 md:py-1.5
            rounded-full
            text-sm
            font-medium
            flex items-center space-x-1.5
            flex-shrink-0
          ">
            <Filter size={14} className="flex-shrink-0" />
            <span>{productTypeLabels[request.product_type] || request.product_type}</span>
          </span>
        )}

        {/* Бюджет */}
        {request.budget && (
          <span className="
            bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200
            px-3 py-1 md:px-3 md:py-1.5
            rounded-full
            text-sm
            font-medium
            flex items-center space-x-1.5
            flex-shrink-0
          ">
            <DollarSign size={14} className="flex-shrink-0" />
            <span>{request.budget}</span>
          </span>
        )}

        {/* Возрастная группа */}
        {request.age_group && (
          <span className="
            bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200
            px-3 py-1 md:px-3 md:py-1.5
            rounded-full
            text-sm
            font-medium
            flex items-center space-x-1.5
            flex-shrink-0
          ">
            <Cake size={14} className="flex-shrink-0" />
            <span>{ageGroupLabels[request.age_group] || request.age_group}</span>
          </span>
        )}

        {/* SPF */}
        {request.spf_needed !== undefined && (
          <span className="
            bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200
            px-3 py-1 md:px-3 md:py-1.5
            rounded-full
            text-sm
            font-medium
            flex items-center space-x-1.5
            flex-shrink-0
          ">
            <Sun size={14} className="flex-shrink-0" />
            <span>{request.spf_needed ? 'Нужен SPF' : 'Без SPF'}</span>
          </span>
        )}

        {/* Предпочитаемые бренды */}
        {request.brand_preference?.map((brand) => (
          <span
            key={brand}
            className="
              bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200
              px-3 py-1 md:px-3 md:py-1.5
              rounded-full
              text-sm
              font-medium
              flex items-center space-x-1.5
              flex-shrink-0
            "
          >
            <Tag size={14} className="flex-shrink-0" />
            <span>{brand}</span>
          </span>
        ))}
      </div>
      
      <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-border">
        <p className="text-xs md:text-sm text-muted-foreground">
          Выбрано параметров: <span className="font-semibold">{totalSelections}</span>
        </p>
      </div>
    </div>
  );
}
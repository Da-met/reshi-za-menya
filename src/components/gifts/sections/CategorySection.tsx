// src/components/gifts/sections/CategorySection.tsx
'use client';

import React from 'react';
import { GiftRequest } from '@/types/gifts';
import { RECIPIENT_CATEGORIES } from '@/constants/gifts.constants';

interface CategorySectionProps {
  request: GiftRequest;
  onChange: (updates: Partial<GiftRequest>) => void;
}

function CategorySectionComponent({ request, onChange }: CategorySectionProps) {
  const handleCategorySelect = (categoryId: string) => {
    const category = RECIPIENT_CATEGORIES.find(c => c.id === categoryId);
    
    if (category) {
      onChange({
        recipient_type: categoryId,
        ...category.auto
      });
    }
  };

  // Находим выбранную категорию
  const selectedCategory = RECIPIENT_CATEGORIES.find(c => c.id === request.recipient_type);
  
  // Получаем текст с информацией о поле
  const getGenderText = () => {
    if (!selectedCategory) return '';
    if ('gender' in selectedCategory.auto && selectedCategory.auto.gender) {
      return `Пол: ${request.gender === 'female' ? 'женский' : 'мужской'}, `;
    }
    return '';
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Кому ищем подарок?
      </h3>
      
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите категорию — мы автоматически подставим пол и возраст
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {RECIPIENT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`
              p-3 md:p-4 rounded-xl border-2 transition-all duration-200
              flex flex-col items-center justify-center space-y-1 md:space-y-2
              ${request.recipient_type === category.id
                ? 'bg-primary border-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              }
            `}
          >
            <span className="text-xl md:text-2xl">{category.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">
              {category.label}
            </span>
          </button>
        ))}
      </div>
      
      {request.recipient_type && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Автоматически установлено: {getGenderText()}Возраст: {request.age === 'child' ? 'ребенок' : 'взрослый'}
          </p>
        </div>
      )}
    </div>
  );
}

export const CategorySection = React.memo(CategorySectionComponent);
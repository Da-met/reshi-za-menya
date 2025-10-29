'use client';

import { GiftRequest } from '@/types/gifts';
import { User, Briefcase, Heart, Smile, DollarSign, Calendar, Package, Star } from 'lucide-react';
import React from 'react';

interface SelectedOptionsProps {
  request: GiftRequest;
}

const categoryLabels: Record<string, string> = {
  mother: 'Маме',
  father: 'Папе', 
  girlfriend: 'Девушке',
  boyfriend: 'Парню',
  friend: 'Другу',
  friend_female: 'Подруге', 
  child: 'Ребёнку',
  colleague: 'Коллеге'
};

// Функция для получения иконки по типу подарка
const getGiftTypeIcon = (type: string) => {
  switch (type) {
    case 'Вещь': return <Package size={12} className="flex-shrink-0" />;
    case 'Впечатление': return <Star size={12} className="flex-shrink-0" />;
    case 'Сделай сам': return <Briefcase size={12} className="flex-shrink-0" />;
    default: return <Package size={12} className="flex-shrink-0" />;
  }
};

export function SelectedOptions({ request }: SelectedOptionsProps) {
  const hasSelections = 
    request.recipient_type || 
    request.profession?.length || 
    request.interests_hobbies?.length || 
    request.temperament?.length ||
    request.budget ||
    request.gift_occasion ||
    request.gift_format?.length;

  if (!hasSelections) {
    return null;
  }

  // Считаем общее количество выбранных параметров
  const totalSelections = 
    (request.recipient_type ? 1 : 0) +
    (request.profession?.length || 0) +
    (request.interests_hobbies?.length || 0) +
    (request.temperament?.length || 0) +
    (request.budget ? 1 : 0) +
    (request.gift_occasion ? 1 : 0) +
    (request.gift_format?.length || 0);

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      {/* Контейнер для выбранных опций */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Категория */}
        {request.recipient_type && (
          <span className="
            bg-section-development/20 text-section-development 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            font-medium 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <User size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{categoryLabels[request.recipient_type]}</span>
          </span>
        )}
        
        {/* Профессии */}
        {request.profession?.map(prof => (
          <span key={prof} className="
            bg-blue-100 text-blue-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Briefcase size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{prof}</span>
          </span>
        ))}
        
        {/* Интересы */}
        {request.interests_hobbies?.map(interest => (
          <span key={interest} className="
            bg-green-100 text-green-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Heart size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{interest}</span>
          </span>
        ))}
        
        {/* Характер */}
        {request.temperament?.map(temperament => (
          <span key={temperament} className="
            bg-purple-100 text-purple-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Smile size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{temperament}</span>
          </span>
        ))}
        
        {/* Бюджет */}
        {request.budget && (
          <span className="
            bg-yellow-100 text-yellow-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <DollarSign size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{request.budget}</span>
          </span>
        )}
        
        {/* Повод */}
        {request.gift_occasion && (
          <span className="
            bg-pink-100 text-pink-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{request.gift_occasion}</span>
          </span>
        )}
        
        {/* Типы подарков */}
        {request.gift_format?.map(format => (
          <span key={format} className="
            bg-indigo-100 text-indigo-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            {getGiftTypeIcon(format)}
            <span className="truncate">{format}</span>
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
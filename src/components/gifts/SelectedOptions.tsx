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
    request.category || 
    request.profession?.length || 
    request.interests?.length || 
    request.personality?.length ||
    request.budget ||
    request.occasion ||
    request.giftTypes?.length;

  if (!hasSelections) {
    return null;
  }

  // Считаем общее количество выбранных параметров
  const totalSelections = 
    (request.category ? 1 : 0) +
    (request.profession?.length || 0) +
    (request.interests?.length || 0) +
    (request.personality?.length || 0) +
    (request.budget ? 1 : 0) +
    (request.occasion ? 1 : 0) +
    (request.giftTypes?.length || 0);

  return (
    <div className="bg-card rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border-l-4 border-primary">
      <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-foreground">
        Вы выбрали:
      </h3>
      
      {/* Контейнер для выбранных опций */}
      <div className="flex flex-wrap gap-1 md:gap-2">
        {/* Категория */}
        {request.category && (
          <span className="
            bg-primary/20 text-primary 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            font-medium 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <User size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{categoryLabels[request.category]}</span>
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
        {request.interests?.map(interest => (
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
        {request.personality?.map(personality => (
          <span key={personality} className="
            bg-purple-100 text-purple-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Smile size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{personality}</span>
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
        {request.occasion && (
          <span className="
            bg-pink-100 text-pink-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            <Calendar size={10} className="md:size-[14px] flex-shrink-0" />
            <span className="truncate">{request.occasion}</span>
          </span>
        )}
        
        {/* Типы подарков */}
        {request.giftTypes?.map(type => (
          <span key={type} className="
            bg-indigo-100 text-indigo-800 
            px-2 py-1 md:px-3 md:py-1 
            rounded-full 
            text-xs md:text-sm 
            flex items-center space-x-1
            flex-shrink-0
          ">
            {getGiftTypeIcon(type)}
            <span className="truncate">{type}</span>
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
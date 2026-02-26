// src/components/gifts/GiftRequestDetails.tsx
'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { OptionTag } from './OptionTag';
import type { GiftRequest } from '@/types/gifts';


// Вспомогательные функции
const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    mother: 'Маме', father: 'Папе', girlfriend: 'Девушке',
    boyfriend: 'Парню', friend: 'Другу', friend_female: 'Подруге',
    child: 'Ребёнку', colleague: 'Коллеге'
  };
  return labels[category] || category;
};

const getAgeLabel = (age: string): string => {
  const labels: Record<string, string> = {
    child: 'Ребёнок', teen: 'Подросток', adult: 'Взрослый'
  };
  return labels[age] || age;
};

interface GiftRequestDetailsProps {
  request: GiftRequest;
  createdAt?: Date;
  title?: string;
  className?: string;
}

export function GiftRequestDetailsComponent({
  request,
  createdAt,
  title = 'Детали запроса',
  className = '',
}: GiftRequestDetailsProps) {
  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <h2 className="text-xl text-foreground mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {request.recipient_type && (
          <OptionTag
            type="category"
            label={getCategoryLabel(request.recipient_type)}
            value={request.recipient_type}
          />
        )}
        
        {request.gift_occasion && (
          <OptionTag
            type="occasion"
            label={request.gift_occasion}
            value={request.gift_occasion}
          />
        )}
        
        {request.profession?.map(prof => (
          <OptionTag key={prof} type="profession" label={prof} value={prof} />
        ))}
        
        {request.interests_hobbies?.map(interest => (
          <OptionTag key={interest} type="interest" label={interest} value={interest} />
        ))}
        
        {request.budget && (
          <OptionTag type="budget" label={request.budget} value={request.budget} />
        )}
        
        {request.age && (
          <OptionTag type="age" label={getAgeLabel(request.age)} value={request.age} />
        )}
        
        {request.gender && request.gender !== 'any' && (
          <OptionTag
            type="personality"
            label={request.gender === 'male' ? 'Мужской' : 'Женский'}
            value={request.gender}
          />
        )}
      </div>
      
      {createdAt && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
          <Clock size={14} />
          <span>Сохранено {createdAt.toLocaleDateString('ru-RU')}</span>
        </div>
      )}
    </div>
  );
}

export const GiftRequestDetails = React.memo(GiftRequestDetailsComponent);
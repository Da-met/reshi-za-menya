// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\gifts\SavedGifts.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Clock, MoreVertical } from 'lucide-react';
import { SavedGift } from '@/types/gifts';
import { OptionTag } from '@/components/gifts';
import { SafeContent } from '../ui/safe/SafeContent';
import { EmptyState } from '../ui/shared/EmptyState';
import { PromotionalBanner } from '@/components/ui/shared';
import { GIFT_BANNER } from '@/constants/gifts.constants';


// Вспомогательные функции
const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    mother: 'Маме',
    father: 'Папе',
    girlfriend: 'Девушке',
    boyfriend: 'Парню',
    friend: 'Другу',
    friend_female: 'Подруге',
    child: 'Ребёнку',
    colleague: 'Коллеге'
  };
  return labels[category] || category;
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'thing': return 'Вещь';
    case 'experience': return 'Впечатление';
    case 'handmade': return 'Хендмейд';
    default: return type;
  }
};

// Временные данные
const mockSavedGifts: SavedGift[] = [
  {
    id: '1',
    giftData: {
      id: 'gift-1',
      title: 'Умные часы с функцией отслеживания сна',
      description: 'Современные умные часы с расширенными функциями здоровья и фитнес-трекингом',
      type: 'thing',
      price: '10000-15000 ₽',
      examples: ['Xiaomi Smart Band 8', 'Samsung Galaxy Watch', 'Apple Watch SE'],
      reasoning: 'Подходит для человека, который следит за здоровьем и активным образом жизни'
    },
    requestData: {
      recipient_type: 'mother',
      gift_occasion: 'День рождения',
      interests_hobbies: ['спорт', 'технологии'],
      budget: '10000-15000',
      age: 'adult'
    },
    createdAt: new Date('2024-01-15'),
    userComment: 'Идеально для мамы - она давно хотела умные часы'
  },
  {
    id: '2',
    giftData: {
      id: 'gift-2',
      title: 'Мастер-класс по гончарному делу',
      description: 'Творческий мастер-класс по созданию керамических изделий своими руками',
      type: 'experience',
      price: '3000-5000 ₽',
      examples: ['Гончарная студия "Глина"', 'Мастер-класс "Искусство керамики"'],
      reasoning: 'Идеально для творческого человека, который любит ручную работу'
    },
    requestData: {
      recipient_type: 'girlfriend',
      gift_occasion: '8 марта',
      interests_hobbies: ['творчество', 'рукоделие'],
      budget: '3000-5000',
      age: 'adult'
    },
    createdAt: new Date('2024-01-10')
  }
];

function SavedGifts() {
  const router = useRouter();
  const [savedGifts, setSavedGifts] = useState<SavedGift[]>(mockSavedGifts);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteGift = (giftId: string) => {
    console.log('Удаление подарка:', giftId);
    setSavedGifts(prev => prev.filter(gift => gift.id !== giftId));
    setActiveDropdown(null);
  };

  const handleOpenGift = (giftId: string) => {
    router.push(`/gifts/saved/${giftId}`);
  };

  const toggleDropdown = (giftId: string) => {
    setActiveDropdown(activeDropdown === giftId ? null : giftId);
  };

  if (savedGifts.length === 0) {
    return (
      <div className="space-y-6">
        <PromotionalBanner
          title={GIFT_BANNER.title}
          description={GIFT_BANNER.description}
          route={GIFT_BANNER.route}
          emoji={GIFT_BANNER.emoji}
        />
        <EmptyState
          icon="🎁"
          title="Нет сохраненных подарков"
          description="Сохраняйте понравившиеся идеи подарков, чтобы вернуться к ним позже"
          variant="compact"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={GIFT_BANNER.title}
        description={GIFT_BANNER.description}
        route={GIFT_BANNER.route}
        emoji={GIFT_BANNER.emoji}
      />
      
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-muted-foreground">
            {savedGifts.length} сохранен{savedGifts.length === 1 ? 'ый' : 'ых'} подар{savedGifts.length === 1 ? 'ок' : 'ка'}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {savedGifts.map((savedGift) => {
          const isDropdownOpen = activeDropdown === savedGift.id;
          
          return (
            <div
              key={savedGift.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenGift(savedGift.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {savedGift.giftData.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl font-bold text-primary">
                        {savedGift.giftData.price || savedGift.giftData.price_range}
                      </span>
                      
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        {getTypeLabel(savedGift.giftData.type)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Выпадающее меню */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(savedGift.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGift(savedGift.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Описание */}
                <SafeContent
                  content={savedGift.giftData.description}
                  type="paragraphs"
                  className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2"
                  maxLength={150}
                />
                
                {/* Теги параметров */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {savedGift.requestData.recipient_type && (
                    <OptionTag
                      type="category"
                      label={getCategoryLabel(savedGift.requestData.recipient_type)}
                      value={savedGift.requestData.recipient_type}
                    />
                  )}
                  
                  {savedGift.requestData.gift_occasion && (
                    <OptionTag
                      type="occasion"
                      label={savedGift.requestData.gift_occasion}
                      value={savedGift.requestData.gift_occasion}
                    />
                  )}
                  
                  {savedGift.requestData.interests_hobbies?.slice(0, 2).map(interest => (
                    <OptionTag
                      key={interest}
                      type="interest"
                      label={interest}
                      value={interest}
                    />
                  ))}
                </div>
                
                {/* Комментарий */}
                {savedGift.userComment && (
                  <div className="mb-4 p-3 bg-accent/20 border border-accent/30 rounded-lg">
                    <SafeContent
                      content={savedGift.userComment}
                      type="paragraphs"
                      className="text-sm text-foreground break-words"
                    />
                  </div>
                )}
                
                {/* Футер с датой */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {savedGift.createdAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SavedGifts);
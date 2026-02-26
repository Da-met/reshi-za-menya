// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\gifts\SavedGiftCard.tsx

'use client';
import React from 'react';
import { Clock } from 'lucide-react';
import type { SavedGift } from '@/types/gifts';
import { OptionTag } from './OptionTag';
import { SafeContent } from '../ui/safe/SafeContent';
import { CommentSection } from '../ui/shared/CommentSection'; // 👈 импортируем общий компонент

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

interface SavedGiftCardProps {
  gift: SavedGift;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
  showMenu?: boolean;
}

export function SavedGiftCard({ gift, onClick }: SavedGiftCardProps) {
  const displayPrice = gift.giftData.price || gift.giftData.price_range;

  return (
    <div
      className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
      onClick={() => onClick?.(gift.id)}
    >
      <div className="p-6">
        {/* Заголовок и цена */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
              {gift.giftData.title}
            </h3>
            
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xl font-bold text-primary">
                {displayPrice}
              </span>
              
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                {gift.giftData.brand || getTypeLabel(gift.giftData.type)}
              </span>
              
              {gift.giftData.category && (
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {gift.giftData.category}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Описание */}
        <SafeContent
          content={gift.giftData.description}
          type="paragraphs"
          className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2"
          maxLength={150}
        />

        {/* Теги параметров */}
        <div className="flex flex-wrap gap-2 mb-4">
          {gift.requestData.recipient_type && (
            <OptionTag
              type="category"
              label={getCategoryLabel(gift.requestData.recipient_type)}
              value={gift.requestData.recipient_type}
            />
          )}
          
          {gift.requestData.gift_occasion && (
            <OptionTag
              type="occasion"
              label={gift.requestData.gift_occasion}
              value={gift.requestData.gift_occasion}
            />
          )}
          
          {gift.requestData.interests_hobbies?.slice(0, 2).map(interest => (
            <OptionTag
              key={interest}
              type="interest"
              label={interest}
              value={interest}
            />
          ))}
        </div>

        {/* 👇 ИСПОЛЬЗУЕМ ОБЩИЙ КОМПОНЕНТ COMMENT SECTION */}
        {gift.userComment && (
          <div className="mb-4">
            <CommentSection
              comment={gift.userComment}
              onSave={() => {}} // В карточке не нужно редактирование
              onDelete={() => {}} // В карточке не нужно удаление
              readOnly={true}    // 👈 Добавим этот пропс в CommentSection
              compact={true}     // 👈 Добавим этот пропс для компактного вида
            />
          </div>
        )}

        {/* Футер с датой */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock size={12} />
            <span>Сохранено {gift.createdAt.toLocaleDateString('ru-RU')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizedSavedGiftCard = React.memo(SavedGiftCard);
// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\gifts\GiftProductCard.tsx

'use client';
import { ShoppingCart, ExternalLink, Package, Ticket, Hammer } from 'lucide-react';
import type { GiftResponse } from '@/types/gifts';
import { SafeLink } from '../ui/safe/SafeLink';
import { InfoSection } from '../ui/shared/InfoSection';
import { SafeContent } from '../ui/safe/SafeContent';
import { TagList } from '../ui/shared/TagList';
import { FeatureList } from '../ui/shared/FeatureList';

import React from 'react';
import { SafeImage } from '../ui/safe/SafeImage';

type Gift = GiftResponse['gift'];

interface GiftProductCardProps {
  gift: Gift;
  showPurchaseButtons?: boolean;
  className?: string;
}

// Вспомогательные функции
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'thing': return <Package size={16} className="flex-shrink-0" />;
    case 'experience': return <Ticket size={16} className="flex-shrink-0" />;
    case 'handmade': return <Hammer size={16} className="flex-shrink-0" />;
    default: return <Package size={16} className="flex-shrink-0" />;
  }
};

const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'thing': return 'Вещь';
    case 'experience': return 'Впечатление';
    case 'handmade': return 'Хендмейд';
    default: return type;
  }
};

function GiftProductCardComponent({
  gift,
  showPurchaseButtons = true,
  className = ''
}: GiftProductCardProps) {
  const displayPrice = gift.price || gift.price_range;

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Верхняя часть с изображением и основной информацией */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
        {/* 👇 ЛЕВАЯ КОЛОНКА - ВСЕГДА РАСТЯГИВАЕТСЯ */}
        <div className="w-full h-full rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
          {gift.image ? (
            // Если есть изображение - показываем его
              <div className="w-full h-full rounded-xl overflow-hidden bg-muted/20 flex items-center justify-center">
                <SafeImage 
                  src={gift.image} 
                  alt={gift.title}
                  maxHeight="400px"
                />
            </div>
          ) : (
            // Если нет изображения - плейсхолдер на всю высоту
            <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-600">🎁</span>
                </div>
                <p className="text-sm text-gray-500">{gift.brand || gift.title || 'Нет изображения'}</p>
              </div>
            </div>
          )}
        </div>

        {/* ПРАВАЯ КОЛОНКА - ОПРЕДЕЛЯЕТ ВЫСОТУ */}
        <div className="space-y-6">
          {/* Заголовок и категория */}
          <div className="space-y-2">
            {gift.brand && (
              <h2 className="text-2xl md:text-3xl font-bold text-section-development">
                {gift.brand}
              </h2>
            )}
            
            <div className="h-px w-16 bg-border my-2" />
            
            <h3 className="text-xl md:text-2xl text-foreground mb-4">
              {gift.title}
            </h3>
            
            {/* Тип подарка */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium">
                {getTypeIcon(gift.type)}
                {getTypeLabel(gift.type)}
              </div>
              
              {gift.category && (
                <span className="inline-flex items-center px-3 py-1 text-xs md:text-sm text-muted-foreground bg-muted rounded-full">
                  {gift.category}
                </span>
              )}
            </div>
          </div>

          {/* Цена и кнопки покупки */}
          {showPurchaseButtons && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary">
                  {displayPrice}
                </span>
              </div>
              
              {/* Кнопки покупки */}
              {gift.purchaseLink && (
                <SafeLink
                  href={gift.purchaseLink}
                  external
                  className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg"
                >
                  <ShoppingCart size={20} />
                  <span>Купить на маркетплейсе</span>
                  <ExternalLink size={16} />
                </SafeLink>
              )}
            </div>
          )}
        </div>
      </div>




      {/* ОПИСАНИЕ */}
      {gift.description && (
        <InfoSection title="Описание">
          <SafeContent
            content={gift.description}
            type="paragraphs"
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
          />
        </InfoSection>
      )}

      {/* ОСОБЕННОСТИ */}
      {gift.features && gift.features.length > 0 && (
        <FeatureList
          items={gift.features}
          title="Особенности"
          variant="check"
        />
      )}

      {/* ПОЧЕМУ ХОРОШИЙ ПОДАРОК */}
      {(gift.reasons && gift.reasons.length > 0) && (
        <FeatureList
          items={gift.reasons}
          title="Почему это хороший подарок"
          variant="sparkle"
        />
      )}

      {/* ПОЧЕМУ ПОДХОДИТ ИМЕННО ВАМ */}
      {gift.reasoning && (
        <InfoSection title="Почему подходит именно вам" variant="accent">
          <SafeContent
            content={gift.reasoning}
            type="paragraphs"
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
          />
        </InfoSection>
      )}

      {/* ТЕГИ */}
      {gift.tags && gift.tags.length > 0 && (
        <TagList
          tags={gift.tags}
          title={undefined}
          variant="default"
          withContainer={true}
        />
      )}
    </div>
  );
}

export const GiftProductCard = React.memo(GiftProductCardComponent);
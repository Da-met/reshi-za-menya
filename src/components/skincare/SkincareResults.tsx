'use client';

import React from 'react';
import { SkincareResponse } from '@/types/skincare';
import { useState, useCallback } from 'react';
import { Sparkles, Heart, Share2, RotateCw,
  Check } from '@/lib/icons';
import { SkincareProductCard } from './SkincareProductCard';
import { EmptyState } from '../ui/shared/EmptyState';



interface SkincareResultProps {
  response: SkincareResponse;
  onGenerateAnother?: (excludeTitle?: string) => void;
}

export function SkincareResultComponent({ response, onGenerateAnother }: SkincareResultProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    setSaved(true);
    console.log('Средство сохранено');
  }, []);

  if (!response.products || response.products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Не найдено подходящих средств"
        description="Попробуйте изменить параметры поиска"
        actionLabel="Изменить параметры"
        onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        variant="compact"
        className="my-8"
      />
    );
  }


  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Заголовок результатов (оставляем как есть) */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ ПОДОБРАЛИ СРЕДСТВО!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
      </div>

      {/* Список продуктов - ИСПОЛЬЗУЕМ НОВЫЙ КОМПОНЕНТ */}
      <div className="space-y-6">
        {response.products.map((product) => (
          <SkincareProductCard
            key={product.id}
            product={product}
            showPurchaseButtons={true}
            // showRating={true}
          />
        ))}
      </div>

      {/* Кнопки действий (оставляем как есть) */}
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col xs:flex-row gap-3 flex-1">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors flex-1 min-w-0 ${
                saved
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {saved ? <Check size={16} className="flex-shrink-0" /> : <Heart size={16} className="flex-shrink-0" />}
              <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                {saved ? 'Сохранено!' : 'Сохранить себе'}
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
              <Share2 size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
            </button>
          </div>
          <button
            onClick={() => {
              const productName = response.products[0]?.name;
              console.log('🔄 Другой вариант для:', productName); // ← ДОБАВЬ
              if (productName) {
                onGenerateAnother?.(productName);
              }
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
          >
            <RotateCw size={16} className="flex-shrink-0" />
            <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const SkincareResult = React.memo(SkincareResultComponent);
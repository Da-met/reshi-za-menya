'use client';

import { GiftResponse } from '@/types/gifts';
import { useState } from 'react';
import { Package, Ticket, Hammer, RotateCw, Check, Sparkles, ShoppingCart, Heart, Share2, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

interface GiftResultProps {
  gift: GiftResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function GiftResult({ gift, onSave, onGenerateAnother }: GiftResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'thing': return <Package size={18} className="flex-shrink-0" />;
      case 'experience': return <Ticket size={18} className="flex-shrink-0" />;
      case 'handmade': return <Hammer size={18} className="flex-shrink-0" />;
      default: return <Package size={18} className="flex-shrink-0" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'thing': return 'Вещь';
      case 'experience': return 'Впечатление';
      case 'handmade': return 'Хендмейд';
      default: return type;
    }
  };

  // Используем новые поля или старые для совместимости
  const displayPrice = gift.gift.price || gift.gift.price_range;
  const displayFeatures = gift.gift.features || gift.gift.examples || [];

  // Fallback для изображения
  const imageSrc = imageError || !gift.gift.image 
    ? `/images/fallbacks/${gift.gift.category || 'default'}.jpg`
    : gift.gift.image;

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Блок "МЫ НАШЛИ ИДЕАЛЬНЫЙ ПОДАРОК" */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ НАШЛИ ИДЕАЛЬНЫЙ ПОДАРОК!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы предлагаем для вашего случая
        </p>
      </div>

      {/* Карточка товара */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
        {/* Верхняя часть с изображением и основной информацией */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
          {/* Изображение */}
          <div className="rounded-xl overflow-hidden bg-muted/20">
            <Image
              src={imageSrc}
              width={0}
              height={0}
              alt={gift.gift.title}
              className="w-full h-64 md:h-80 object-cover"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Информация */}
          <div className="space-y-6">
            {/* Заголовок и категория */}
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {getTypeIcon(gift.gift.type)}
                  {getTypeLabel(gift.gift.type)}
                </span>
                {gift.gift.brand && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {gift.gift.brand}
                  </span>
                )}
                {gift.gift.category && (
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {gift.gift.category}
                  </span>
                )}
              </div>
              
              <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4">
                {gift.gift.title}
              </h2>
            </div>

            {/* Цена и кнопка купить */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-3xl font-bold text-primary">{displayPrice}</span>
              </div>

              {/* Кнопка купить */}
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg">
                <ShoppingCart size={20} />
                <span>Купить на маркетплейсе</span>
              </button>
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="border-t border-border p-6 md:p-8">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl text-foreground">Описание</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {gift.gift.description}
            </p>
          </div>
        </div>

        {/* Особенности и причины */}
        <div className="border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Особенности */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
              <div className="space-y-3">
                {displayFeatures.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Почему хороший подарок */}
            {gift.gift.reasons && gift.gift.reasons.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-foreground">Почему это хороший подарок</h3>
                <div className="space-y-3">
                  {gift.gift.reasons.map((reason: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <Star size={16} className="text-yellow-500 flex-shrink-0" />
                      <span className="text-sm md:text-base text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Почему подходит по критериям */}
        {gift.gift.reasoning && (
          <div className="border-t border-border p-6 md:p-8 bg-primary/5">
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl text-foreground flex items-center gap-2">
                <Sparkles size={18} className="text-primary" />
                Почему подходит именно вам
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {gift.gift.reasoning}
              </p>
            </div>
          </div>
        )}

        {/* Теги */}
        {gift.gift.tags && gift.gift.tags.length > 0 && (
          <div className="border-t border-border p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {gift.gift.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 border text-primary text-xs md:text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Кнопки действий внизу */}
        <div className="border-t border-border p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Кнопки сохранить и поделиться */}
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
                  {saved ? 'Сохранено!' : 'Сохранить подарок'}
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                <Share2 size={16} className="flex-shrink-0" />
                <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
              </button>
            </div>

            {/* Кнопка другой вариант */}
            <button
              onClick={onGenerateAnother}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
            >
              <RotateCw size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
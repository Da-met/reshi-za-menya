'use client';

import { GiftResponse } from '@/types/gifts';
import { useState } from 'react';
import { Package, Ticket, Hammer, Save, RotateCw, Check, Sparkles } from 'lucide-react';

interface GiftResultProps {
  gift: GiftResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function GiftResult({ gift, onSave, onGenerateAnother }: GiftResultProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'thing': return <Package size={18} className="md:size-5 flex-shrink-0" />;
      case 'experience': return <Ticket size={18} className="md:size-5 flex-shrink-0" />;
      case 'handmade': return <Hammer size={18} className="md:size-5 flex-shrink-0" />;
      default: return <Package size={18} className="md:size-5 flex-shrink-0" />;
    }
  };

  return (
    <div className="
      bg-gradient-to-br from-primary/10 to-secondary/10
      rounded-xl md:rounded-2xl 
      shadow-2xl
      p-4 md:p-6 
      mb-6 md:mb-8 
      border-2 border-primary/30
      mt-6 md:mt-8
      relative
      overflow-hidden
    ">
      {/* Декоративные элементы используя наши цвета */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/10 rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        {/* Заголовок результата */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles size={20} className="text-primary" />
            <h2 className="text-lg md:text-xl lg:text-2xl font-accent font-bold text-foreground">
              Мы нашли идеальный подарок!
            </h2>
            <Sparkles size={20} className="text-secondary" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Вот что мы предлагаем для вашего случая
          </p>
        </div>

        {/* Карточка подарка */}
        <div className="
          bg-card
          rounded-lg md:rounded-xl 
          p-4 md:p-6 
          mb-4 md:mb-6 
          border-2 border-primary/20
          shadow-lg
          relative
          overflow-hidden
        ">
          {/* Акцентная полоска используя primary цвет */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          {/* Заголовок подарка и тип */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 md:mb-4 gap-2">
            <div className="flex items-start space-x-2">
              {getTypeIcon(gift.gift.type)}
              <div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-card-foreground mb-1">
                  {gift.gift.title}
                </h3>
                <span className="inline-block bg-primary text-primary-foreground px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium shadow-md">
                  {gift.gift.price_range}
                </span>
              </div>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground capitalize self-start sm:self-center bg-muted px-2 py-1 rounded-lg">
              {gift.gift.type === 'thing' ? '🎁 Вещь' : 
               gift.gift.type === 'experience' ? '🎭 Впечатление' : '🛠️ Сделай сам'}
            </span>
          </div>

          {/* Описание */}
          <p className="text-sm md:text-base text-card-foreground mb-3 md:mb-4 leading-relaxed">
            {gift.gift.description}
          </p>

          {/* Примеры товаров */}
          <div className="mb-3 md:mb-4">
            <h4 className="font-semibold text-card-foreground mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Конкретные примеры:</span>
            </h4>
            <ul className="list-none space-y-1 md:space-y-1.5 text-card-foreground">
              {gift.gift.examples.map((example, index) => (
                <li key={index} className="text-xs md:text-sm flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{example}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Обоснование */}
          <div className="
            bg-accent
            rounded-lg 
            p-3 md:p-4 
            border border-border
          ">
            <h4 className="font-semibold text-accent-foreground mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <span>Почему этот подарок подходит:</span>
            </h4>
            <p className="text-xs md:text-sm text-accent-foreground leading-relaxed">
              {gift.gift.reasoning}
            </p>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`
              px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 
              rounded-lg md:rounded-xl 
              font-semibold 
              transition-all 
              flex items-center justify-center space-x-2
              text-xs md:text-sm lg:text-base
              flex-1 sm:flex-none
              shadow-lg
              ${saved
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105'
              }
            `}
          >
            {saved ? <Check size={14} className="md:size-4" /> : <Save size={14} className="md:size-4" />}
            <span className="truncate">{saved ? 'Сохранено!' : 'Сохранить подарок'}</span>
          </button>

          <button
            onClick={onGenerateAnother}
            className="
              px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 
              rounded-lg md:rounded-xl 
              font-semibold 
              bg-secondary 
              hover:bg-secondary/90 
              text-secondary-foreground
              transition-all 
              shadow-lg hover:shadow-xl 
              hover:scale-105
              flex items-center justify-center space-x-2
              text-xs md:text-sm lg:text-base
              flex-1 sm:flex-none
            "
          >
            <RotateCw size={14} className="md:size-4" />
            <span>Другой вариант</span>
          </button>
        </div>

        {/* Интеграция с маркетплейсами */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
          <h4 className="font-semibold text-foreground mb-2 md:mb-3 text-sm md:text-base flex items-center space-x-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span>Где купить:</span>
          </h4>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {['Ozon', 'Wildberries', 'Яндекс.Маркет', 'AliExpress'].map(market => (
              <button
                key={market}
                className="
                  px-2 py-1 md:px-3 md:py-2 
                  rounded-lg 
                  bg-card
                  border border-border
                  hover:border-primary 
                  hover:bg-accent
                  transition-all 
                  text-xs md:text-sm
                  flex-shrink-0
                  shadow-sm
                  hover:shadow-md
                  hover:scale-105
                "
              >
                {market}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
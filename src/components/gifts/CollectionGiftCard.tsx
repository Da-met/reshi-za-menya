// src/components/gifts/CollectionGiftCard.tsx
'use client';

import Link from 'next/link';

interface CollectionGiftCardProps {
  gift: {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    brand: string;
    category: string;
    rating: number;
    tags: string[];
  };
  onClick?: () => void; // Добавляем опциональный обработчик клика
}

export function CollectionGiftCard({ gift }: CollectionGiftCardProps) {
  return (
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
        {/* Изображение */}
        <div className="h-48 relative overflow-hidden">
          <img 
            src={gift.image} 
            alt={gift.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold text-primary bg-secondary px-2 py-1 rounded-full">
              {gift.category}
            </span>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Бренд */}
          <div className="mb-2">
            <span className="text-sm text-muted-foreground font-normal">{gift.brand}</span>
          </div>

          {/* Заголовок */}
          <h3 className="text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors font-normal leading-tight">
            {gift.title}
          </h3>

          {/* Описание */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-normal flex-1">
            {gift.description}
          </p>

          {/* Футер */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl text-primary font-bold">{gift.price}</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="font-normal">★ {gift.rating}</span>
            </div>
          </div>
        </div>
      </div>
   
  );
}
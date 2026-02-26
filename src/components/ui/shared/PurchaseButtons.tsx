// src/components/shared/PurchaseButtons.tsx
'use client';

import { ShoppingCart, ExternalLink } from 'lucide-react';
import { SafeLink } from '../safe/SafeLink';


interface Store {
  name: string;
  url: string;
  price: string;
  icon?: React.ReactNode;
}

interface PurchaseButtonsProps {
  purchaseLink?: string;
  whereToBuy?: Store[];
  price?: string;
  size?: string;
  variant?: 'primary' | 'compact';
  className?: string;
}

export function PurchaseButtons({
  purchaseLink,
  whereToBuy,
  price,
  size,
  variant = 'primary',
  className = ''
}: PurchaseButtonsProps) {
  if (variant === 'compact') {
    return (
      <div className={`space-y-2 ${className}`}>
        {purchaseLink ? (
          <SafeLink
            href={purchaseLink}
            external
            className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <ShoppingCart size={16} />
            <span>Купить</span>
          </SafeLink>
        ) : whereToBuy?.map((store, i) => (
          <SafeLink
            key={i}
            href={store.url}
            external
            className="flex items-center justify-between w-full py-2 px-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <span>{store.name}</span>
            <span className="font-bold">{store.price}</span>
          </SafeLink>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Цена */}
      {(price || size) && (
        <div className="flex items-center gap-4">
          {price && (
            <span className="text-2xl md:text-3xl font-bold text-primary">{price}</span>
          )}
          {size && (
            <span className="text-sm text-muted-foreground">{size}</span>
          )}
        </div>
      )}
      
      {/* Кнопки покупки */}
      {purchaseLink ? (
        <SafeLink
          href={purchaseLink}
          external
          className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg"
        >
          <ShoppingCart size={20} />
          <span>Купить на маркетплейсе</span>
          <ExternalLink size={16} />
        </SafeLink>
      ) : whereToBuy && whereToBuy.length > 0 ? (
        <div className="space-y-2">
          {whereToBuy.slice(0, 2).map((store, i) => (
            <SafeLink
              key={i}
              href={store.url}
              external
              className="flex items-center justify-between w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
            >
              <span className="text-sm md:text-base">{store.name}</span>
              <span className="font-bold text-sm md:text-base">{store.price}</span>
            </SafeLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}
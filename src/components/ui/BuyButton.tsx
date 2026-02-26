// src/components/ui/BuyButton.tsx
'use client';

import { ShoppingCart, ExternalLink } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props {
  href: string;
  itemId: string;
  itemTitle: string;
  module: string;
  collectionId?: string;
  collectionTitle?: string;
  price?: string;
  className?: string;
}

export function BuyButton({
  href,
  itemId,
  itemTitle,
  module,
  collectionId,
  collectionTitle,
  price,
  className = ''
}: Props) {
  const { trackClick } = useAnalytics();

  const handleClick = () => {
    trackClick({
      itemId,
      itemTitle,
      module,
      collectionId,
      collectionTitle,
      price
    });

    // Можно добавить небольшое уведомление
    if (process.env.NODE_ENV === 'development') {
      alert(`🔍 Клик по товару: ${itemTitle}`);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-base md:text-lg ${className}`}
    >
      <ShoppingCart size={20} />
      <span>Купить на маркетплейсе</span>
      <ExternalLink size={16} />
    </a>
  );
}
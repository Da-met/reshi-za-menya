// src/components/shared/ProductRating.tsx
'use client';

import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating: number;
  showNumber?: boolean;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProductRating({
  rating,
  showNumber = true,
  showText = true,
  size = 'md',
  className = ''
}: ProductRatingProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const starSize = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Отличный рейтинг';
    if (rating >= 4.0) return 'Хороший рейтинг';
    if (rating >= 3.0) return 'Средний рейтинг';
    return 'Низкий рейтинг';
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {showNumber && (
        <div className="text-center">
          <div className={`text-2xl md:text-3xl font-bold text-primary`}>
            {rating.toFixed(1)}
          </div>
          <div className={`${sizeClasses[size]} text-muted-foreground`}>из 5</div>
        </div>
      )}
      
      <div>
        {showText && (
          <p className={`${sizeClasses[size]} text-muted-foreground`}>
            {getRatingText(rating)}
          </p>
        )}
        
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={starSize[size]}
              className={`${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
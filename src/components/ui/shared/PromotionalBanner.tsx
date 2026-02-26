// src/components/ui/shared/PromotionalBanner.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export interface PromotionalBannerProps {
  title: string;
  description: string;
  emoji?: string; // Эмодзи как в вашем примере
  // icon?: React.ReactNode; // Или иконка
  route?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  isClickable?: boolean;
}

export function PromotionalBannerComponent({
  title,
  description,
  emoji,
  // icon,
  route,
  onClick,
  className = '',
  showArrow = true,
  isClickable = true,
}: PromotionalBannerProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!isClickable) return;
    
    if (onClick) {
      onClick();
    } else if (route) {
      router.push(route);
    }
  };

  if (!title) return null;

  return (
    <div 
      onClick={handleClick}
      className={`
        bg-gradient-to-r from-primary/90 to-secondary/90 
        text-primary-foreground 
        p-4 md:p-5 
        rounded-xl 
        mb-4 md:mb-6
        transition-all
        duration-300
        hover:shadow-lg
        hover:scale-[1.02]
        active:scale-[0.98]
        group
        ${isClickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="flex items-center space-x-2">
            {emoji && <span className="text-lg md:text-xl">{emoji}</span>}
            {/* {icon && <div className="flex-shrink-0">{icon}</div>} */}
          </div>
          <div>
            <h4 className="text-l md:text-xl lg:text-2xl leading-[1.2]">
              {title}
            </h4>
            <p className="text-xs md:text-sm opacity-90 mt-1.5">
              {description}
            </p>
          </div>
        </div>
        
        {showArrow && isClickable && (
          <ArrowRight 
            size={18} 
            className="
              md:size-5 
              opacity-80 
              group-hover:opacity-100 
              group-hover:translate-x-1
              transition-all
              duration-300
              flex-shrink-0
            " 
          />
        )}
      </div>
    </div>
  );
}

export const PromotionalBanner = React.memo(PromotionalBannerComponent);
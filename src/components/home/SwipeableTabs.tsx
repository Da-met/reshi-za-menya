// src/components/home/SwipeableTabs.tsx
'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SwipeableTabsProps {
  categories: Array<{
    id: string;
    title: string;
    icon: LucideIcon;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SwipeableTabs({ categories, activeTab, onTabChange }: SwipeableTabsProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;
  const currentIndex = categories.findIndex(cat => cat.id === activeTab);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < categories.length - 1) {
      onTabChange(categories[currentIndex + 1].id);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      onTabChange(categories[currentIndex - 1].id);
    }
  };

  return (
    <div className="mb-6 md:mb-10">
      {/* Основные кнопки */}
      <div 
        className="flex justify-center mb-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center gap-4 md:gap-8 lg:gap-10">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onTabChange(category.id)}
                className={`
                  flex flex-col md:flex-row items-center
                  transition-all duration-200
                  px-3 py-2 md:px-0 md:py-0
                  cursor-pointer
                  ${isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground/80'
                  }
                  relative
                  group
                `}
              >
                {/* Иконка - на мобильных над текстом, на десктопе слева */}
                <div className={`
                  mb-1 md:mb-0 md:mr-3 lg:mr-4
                  transition-transform duration-200
                  ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                `}>
                  <Icon className={`
                    w-6 h-6 md:w-7 md:h-7
                    ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}
                  `} />
                </div>
                
                {/* Текст - ПРОСТО Tailwind классы без motion */}
                <div className="text-center md:text-left">
                  <span className={`
                    leading-tight inline-block font-medium
                    ${isActive 
                      ? 'text-primary text-xl md:text-xl lg:text-2xl font-semibold' 
                      : 'text-muted-foreground group-hover:text-foreground text-base md:text-lg lg:text-xl font-medium'
                    }
                    transition-all duration-200
                  `}>
                    {category.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Точки-индикаторы */}
      <div className="flex justify-center items-center gap-3 -mt-1">
        {categories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => onTabChange(categories[idx].id)}
            className="focus:outline-none p-1"
            aria-label={`Перейти к ${categories[idx].title}`}
          >
            <motion.div
              className={`
                rounded-full
                ${currentIndex === idx 
                  ? 'bg-primary' 
                  : 'bg-muted-foreground/20'
                }
              `}
              animate={{ 
                width: currentIndex === idx ? '12px' : '8px',
                height: currentIndex === idx ? '12px' : '8px',
              }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
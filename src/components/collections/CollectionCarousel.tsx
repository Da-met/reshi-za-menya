// src/components/collections/CollectionCarousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { CollectionItem } from '@/types/collections';

interface Props {
  items: CollectionItem[];
  module: string;
  collectionId: string;
  getItemCard: (item: CollectionItem) => React.ReactNode;
}

export function CollectionCarousel({ 
  items, 
  module, 
  collectionId, 
  getItemCard 
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const goToPrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 50);
    }, 150);
  }, [items.length, isAnimating]);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 50);
    }, 150);
  }, [items.length, isAnimating]);

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    if (index > currentIndex) {
      setDirection('left');
    } else {
      setDirection('right');
    }
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setIsAnimating(false);
        setDirection(null);
      }, 50);
    }, 150);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isAnimating || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const currentItem = items[currentIndex];

  const getAnimationClass = () => {
    if (!isAnimating) return 'opacity-100 translate-x-0';
    if (direction === 'left') return 'opacity-0 -translate-x-10 transition-all duration-150';
    if (direction === 'right') return 'opacity-0 translate-x-10 transition-all duration-150';
    return 'opacity-100 translate-x-0';
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-center gap-2 mb-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-muted hover:bg-muted-foreground'
            }`}
            disabled={isAnimating}
            aria-label={`Перейти к ${index + 1} из ${items.length}`}
          />
        ))}
      </div>

      <div className="relative flex justify-center px-8 md:px-12">
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/90 border border-border shadow-lg hover:bg-accent transition-all hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Предыдущая"
        >
          <ChevronLeft size={18} className="md:w-5 md:h-5 text-foreground" />
        </button>

        <div 
          className={`w-full max-w-[848px] transition-all duration-300 ${getAnimationClass()}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Link
            href={`/${module}/collections/${collectionId}/${currentItem.data.id}`}
            className="block"
          >
            {getItemCard(currentItem)}
          </Link>
        </div>

        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/90 border border-border shadow-lg hover:bg-accent transition-all hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Следующая"
        >
          <ChevronRight size={18} className="md:w-5 md:h-5 text-foreground" />
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-muted-foreground">
        {currentIndex + 1} / {items.length}
      </div>

      <div className="flex justify-center gap-4 mt-4 md:hidden">
        <button
          onClick={goToPrevious}
          disabled={isAnimating}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg hover:bg-accent transition-all disabled:opacity-50"
        >
          <ChevronLeft size={24} className="text-foreground" />
        </button>
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg hover:bg-accent transition-all disabled:opacity-50"
        >
          <ChevronRight size={24} className="text-foreground" />
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-2 md:hidden">
        ← Проведите для навигации →
      </p>
    </div>
  );
}
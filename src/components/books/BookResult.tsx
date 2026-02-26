// src/components/books/BookResult.tsx

'use client';

import React, { useRef } from 'react';
import { BookResponse } from '@/types/books';
import { RotateCw, Check, Sparkles, Heart, Share2 } from 'lucide-react';
import { BookProductCard } from './BookProductCard';

interface BookResultProps {
  book: BookResponse;
  onSave: () => void;
  onGenerateAnother: (excludeTitle: string) => void;
}

function BookResultComponent({ book, onSave, onGenerateAnother }: BookResultProps) {
  const [saved, setSaved] = React.useState(false);

  
  const instanceId = useRef(`book-result-${Date.now()}-${Math.random()}`).current;
  console.log('📖 [BookResult] Рендер', { 
    title: book.book.title,
    instanceId,
    time: Date.now() 
  });


  const handleSave = React.useCallback(() => {
    onSave();
    setSaved(true);
  }, [onSave]);

  const handleGenerateAnother = React.useCallback(() => {
    onGenerateAnother(book.book.title);
  }, [onGenerateAnother, book.book.title]);

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Заголовок */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ НАШЛИ ИДЕАЛЬНУЮ КНИГУ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
      </div>

      {/* Карточка книги */}
      <BookProductCard book={book.book} />

      {/* Кнопки действий - как в примере */}
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
              {saved ? <Check size={16} /> : <Heart size={16} />}
              <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                {saved ? 'Сохранено!' : 'Сохранить книгу'}
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
              <Share2 size={16} />
              <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
            </button>
          </div>
          <button
            onClick={handleGenerateAnother}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
          >
            <RotateCw size={16} />
            <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 👇 ПРОСТО как в примере, без кастомного сравнения!
export const BookResult = React.memo(BookResultComponent);
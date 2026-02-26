// src/components/books/BookProductCard.tsx

'use client';

import React from 'react';
import { Book, Clock, Globe, Calendar, BookOpen } from 'lucide-react';
import { SafeImage } from '@/components/ui/safe/SafeImage';


interface BookProductCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    whyMatch: string;
    genres: string[];
    length: string;
    readingComplexity: string;
    year?: number;
    country?: string;
    features?: string[];
    coverImage?: string;
    publisher?: string;
    affiliateLinks?: {
      litres?: string;
      book24?: string;
      labyrinth?: string;
      mybook?: string;
      bookmate?: string;
    };
  };
  showBuyButton?: boolean;
  className?: string;
}

function BookProductCardComponent({ 
  book, 
  showBuyButton = true,
  className = '' 
}: BookProductCardProps) {

  const handleBuyClick = (platform?: string) => {
    const defaultLinks = {
      litres: 'https://www.litres.ru/partner-link',
      book24: 'https://book24.ru/partner-link',
      labyrinth: 'https://www.labirint.ru/partner-link',
      mybook: 'https://mybook.ru/partner-link',
      bookmate: 'https://bookmate.ru/partner-link'
    };

    const link = book.affiliateLinks?.[platform as keyof typeof defaultLinks] ||
                 defaultLinks[platform as keyof typeof defaultLinks] ||
                 defaultLinks.litres;

    window.open(link, '_blank');
  };

  return (
    <div className={`bg-card rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Верхняя часть - как в [id]/page.tsx */}
      <div className="p-6 md:p-8">
        {/* Заголовок и кнопки (без кнопок, только заголовок) */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <h1 className="text-2xl md:text-3xl text-foreground mb-3">
              {book.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {book.author}
            </p>
          </div>
        </div>

        {/* Чипы - как в [id]/page.tsx */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
            {book.readingComplexity} сложность
          </span>
          {book.year && (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
              <Calendar size={12} className="sm:size-[14px] mr-1" />
              {book.year}
            </span>
          )}
          <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
            <Clock size={12} className="sm:size-[14px] mr-1" />
            {book.length}
          </span>
          {book.country && (
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
              <Globe size={12} className="sm:size-[14px] mr-1" />
              {book.country}
            </span>
          )}
        </div>

        {/* Обложка и детали - горизонтально на десктопе */}
        <div className="flex flex-col lg:flex-row gap-8 mb-6">
          {/* Обложка */}
          <div className="lg:w-2/5">
            {book.coverImage ? (
              <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-[3/4] relative">
                  <SafeImage
                    src={book.coverImage}
                    alt={`Обложка книги "${book.title}"`}
                    maxHeight="100%"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-sm mx-auto lg:max-w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-center p-6">
                  <Book className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
                  <p className="text-sm text-blue-800 font-medium">{book.title}</p>
                  <p className="text-xs text-blue-600 mt-1">{book.author}</p>
                </div>
              </div>
            )}
          </div>

          {/* Детали книги - как в [id]/page.tsx */}
          <div className="lg:w-3/5">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg text-foreground mb-2">Информация</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Автор:</span>
                    <span className="text-foreground">{book.author}</span>
                  </div>
                  {book.year && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Год:</span>
                      <span className="text-foreground">{book.year}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Страниц:</span>
                    <span className="text-foreground">{book.length}</span>
                  </div>
                  {book.country && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Страна:</span>
                      <span className="text-foreground">{book.country}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сложность:</span>
                    <span className="text-foreground">{book.readingComplexity}</span>
                  </div>
                  {book.publisher && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Издательство:</span>
                      <span className="text-foreground">{book.publisher}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Жанры */}
              {book.genres && book.genres.length > 0 && (
                <div>
                  <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.genres.map((genre, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Особенности */}
              {book.features && book.features.length > 0 && (
                <div>
                  <h3 className="text-lg text-foreground mb-2">Особенности</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {book.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Кнопка "Читать" - как в [id]/page.tsx */}
        {showBuyButton && (
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Доступно для чтения</p>
                <p className="text-2xl font-bold text-primary">Литрес, MyBook, Bookmate</p>
              </div>
              <button
                onClick={() => handleBuyClick('litres')}
                className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
              >
                <BookOpen size={20} />
                <span>Читать онлайн</span>
              </button>
            </div>
          </div>
        )}

        {/* Описание книги - как в [id]/page.tsx */}
        <div className="mb-6">
          <h2 className="text-xl text-foreground mb-3">О книге</h2>
          <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
            {book.description}
          </p>
        </div>

        {/* Почему подходит - как в [id]/page.tsx */}
        <div className="mb-2">
          <h2 className="text-xl text-foreground mb-3">Почему это хорошая рекомендация</h2>
          <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
            {book.whyMatch}
          </p>
        </div>
      </div>
    </div>
  );
}

export const BookProductCard = React.memo(BookProductCardComponent);
BookProductCard.displayName = 'BookProductCard';
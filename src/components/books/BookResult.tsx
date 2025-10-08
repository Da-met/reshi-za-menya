'use client';

import { BookResponse } from '@/types/books';
import { useState } from 'react';
import { Save, RotateCw, Check, Sparkles, Book, Clock, Globe, User } from 'lucide-react';

interface BookResultProps {
  book: BookResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function BookResult({ book, onSave, onGenerateAnother }: BookResultProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleBuyClick = () => {
    // TODO: Заменить на реальную партнерскую ссылку
    window.open('https://www.litres.ru/partner-link', '_blank');
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
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/10 rounded-full translate-y-10 -translate-x-10" />
      
      <div className="relative z-10">
        {/* Заголовок результата */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles size={20} className="text-primary" />
            <h2 className="text-lg md:text-xl lg:text-2xl font-accent font-bold text-foreground">
              Мы нашли идеальную книгу!
            </h2>
            <Sparkles size={20} className="text-secondary" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Вот что мы предлагаем для вашего настроения
          </p>
        </div>

        {/* Карточка книги */}
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
          {/* Акцентная полоска */}
          <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
          
          {/* Заголовок книги и автор */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 md:mb-4 gap-2">
            <div className="flex items-start space-x-2">
              <Book size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-card-foreground mb-1">
                  {book.book.title}
                </h3>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                  <User size={14} className="flex-shrink-0" />
                  <span>{book.book.author}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="inline-block bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-md">
                    {book.book.length}
                  </span>
                  <span className="inline-block bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                    {book.book.complexity}
                  </span>
                  {book.book.year && (
                    <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                      {book.book.year} год
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Детали книги */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 md:mb-4">
            <div className="flex items-center space-x-1 text-xs md:text-sm text-card-foreground">
              <Clock size={14} className="text-primary flex-shrink-0" />
              <span>{book.book.length}</span>
            </div>
            {book.book.country && (
              <div className="flex items-center space-x-1 text-xs md:text-sm text-card-foreground">
                <Globe size={14} className="text-primary flex-shrink-0" />
                <span>{book.book.country}</span>
              </div>
            )}
          </div>

          {/* Жанры */}
          <div className="mb-3 md:mb-4">
            <h4 className="font-semibold text-card-foreground mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>Жанры:</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {book.book.genre.map((genre, index) => (
                <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded-lg text-xs">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Описание */}
          <div className="mb-3 md:mb-4">
            <p className="text-sm md:text-base text-card-foreground leading-relaxed">
              {book.book.description}
            </p>
          </div>

          {/* Особенности */}
          {book.book.features && book.book.features.length > 0 && (
            <div className="mb-3 md:mb-4">
              <h4 className="font-semibold text-card-foreground mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Особенности:</span>
              </h4>
              <div className="flex flex-wrap gap-1">
                {book.book.features.map((feature, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Почему подходит */}
          <div className="
            bg-accent
            rounded-lg
            p-3 md:p-4
            border border-border
          ">
            <h4 className="font-semibold text-accent-foreground mb-1 md:mb-2 text-sm md:text-base flex items-center space-x-2">
              <span className="w-2 h-2 bg-secondary rounded-full"></span>
              <span>Почему вам подойдет:</span>
            </h4>
            <p className="text-xs md:text-sm text-accent-foreground leading-relaxed">
              {book.book.whyMatch}
            </p>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
          <button
            onClick={handleBuyClick}
            className="
              px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3
              rounded-lg md:rounded-xl
              font-semibold
              bg-green-600 hover:bg-green-700
              text-white
              transition-all
              shadow-lg hover:shadow-xl
              hover:scale-105
              flex items-center justify-center space-x-2
              text-xs md:text-sm lg:text-base
              flex-1 sm:flex-none
            "
          >
            <span>🛒 Купить на Литрес</span>
          </button>

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
            <span className="truncate">{saved ? 'Сохранено!' : 'Сохранить книгу'}</span>
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
            {['Литрес', 'Book24', 'Лабиринт', 'MyBook', 'Читай-город'].map(market => (
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
                onClick={() => console.log(`Открываем ${market}`)}
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
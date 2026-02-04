'use client';

import { BookResponse } from '@/types/books';
import { useState } from 'react';
import { RotateCw, Check, Sparkles, Book, Clock, Globe, Heart, Share2, BookOpen, Calendar } from 'lucide-react';
import Image from 'next/image';

interface BookResultProps {
  book: BookResponse;
  onSave: () => void;
  onGenerateAnother: () => void;
}

export function BookResult({ book, onSave, onGenerateAnother }: BookResultProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  const handleBuyClick = (platform?: string) => {
    const defaultLinks = {
      litres: 'https://www.litres.ru/partner-link',
      book24: 'https://book24.ru/partner-link',
      labyrinth: 'https://www.labirint.ru/partner-link',
      mybook: 'https://mybook.ru/partner-link',
      bookmate: 'https://bookmate.ru/partner-link'
    };
    
    const link = book.book.affiliateLinks?.[platform as keyof typeof defaultLinks] || 
                 defaultLinks[platform as keyof typeof defaultLinks] || 
                 defaultLinks.litres;
    
    window.open(link, '_blank');
  };

  const bookInfo = book.book;

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Блок "МЫ НАШЛИ ИДЕАЛЬНУЮ КНИГУ" */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ НАШЛИ ИДЕАЛЬНУЮ КНИГУ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы предлагаем для вашего настроения
        </p>
      </div>

      {/* Основной контент */}
      <div className="space-y-6">
        
        {/* Основной блок с книгой */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          
          {/* Верхняя часть */}
          <div className="p-6 md:p-8">
            {/* Заголовок и кнопки */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-3">
                  {bookInfo.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {bookInfo.author}
                </p>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex gap-2 flex-shrink-0">
                <button className="p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Heart size={18} />
                </button>
                <button className="p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Чипы */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-3 py-1 bg-section-development/10 text-section-development rounded-full text-xs sm:text-sm">
                {bookInfo.readingComplexity} сложность
              </span>
              {bookInfo.year && (
                <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                  <Calendar size={12} className="mr-1" />
                  {bookInfo.year}
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="mr-1" />
                {bookInfo.length}
              </span>
              {bookInfo.country && (
                <span className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                  <Globe size={12} className="mr-1" />
                  {bookInfo.country}
                </span>
              )}
              {bookInfo.rating && (
                <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <span className="mr-1">⭐</span>
                  {bookInfo.rating}
                </span>
              )}
            </div>
          </div>

          {/* Обложка и детали */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              
              {/* Обложка */}
              <div>
                {bookInfo.coverImage && !imageError ? (
                  <div className="relative rounded-lg overflow-hidden shadow-lg bg-muted/20">
                    <div className="aspect-[3/4] relative">
                      <Image 
                        src={bookInfo.coverImage}
                        alt={`Обложка книги "${bookInfo.title}"`}
                        fill
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="text-center p-6">
                      <Book className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mb-4 mx-auto" />
                      <p className="text-sm md:text-base text-blue-800 font-medium">{bookInfo.title}</p>
                      <p className="text-xs md:text-sm text-blue-600 mt-1">{bookInfo.author}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Детали книги */}
              <div>
                <div className="space-y-4 md:space-y-6">
                  
                  {/* Информация */}
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-3">Информация</h3>
                    <div className="space-y-3 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Автор:</span>
                        <span className="text-foreground">{bookInfo.author}</span>
                      </div>
                      {bookInfo.year && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Год:</span>
                          <span className="text-foreground">{bookInfo.year}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страниц:</span>
                        <span className="text-foreground">{bookInfo.length}</span>
                      </div>
                      {bookInfo.country && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Страна:</span>
                          <span className="text-foreground">{bookInfo.country}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сложность:</span>
                        <span className="text-foreground">{bookInfo.readingComplexity}</span>
                      </div>
                      {bookInfo.publisher && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Издательство:</span>
                          <span className="text-foreground">{bookInfo.publisher}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Жанры */}
                  <div>
                    <h3 className="text-lg md:text-xl text-foreground mb-3">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookInfo.genres.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Особенности */}
          {bookInfo.features && bookInfo.features.length > 0 && (
            <div className="border-t border-border p-6 md:p-8">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
                <ul className="space-y-3">
                  {bookInfo.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Кнопка "Читать" */}
          <div className="border-t border-border p-6 md:p-8 bg-gradient-to-r from-primary/20 to-primary/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">Доступно для чтения</p>
                <p className="text-lg md:text-xl font-bold text-primary">Литрес, MyBook, Bookmate</p>
              </div>
              <button 
                onClick={() => handleBuyClick('litres')}
                className="
                  flex items-center justify-center gap-2
                  px-4 py-3
                  bg-green-600 text-white
                  rounded-lg
                  font-medium
                  hover:bg-green-700
                  transition-colors
                  w-full sm:w-auto
                  text-sm md:text-base
                "
              >
                <BookOpen size={18} />
                <span>Читать онлайн</span>
              </button>
            </div>
          </div>

          {/* Описание книги */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl text-foreground">О книге</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {bookInfo.description}
              </p>
            </div>
          </div>

          {/* Почему подходит */}
          <div className="border-t border-border p-6 md:p-8 bg-primary/5">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl text-foreground">Почему это хорошая рекомендация</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {bookInfo.whyMatch}
              </p>
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Кнопки сохранить и поделиться */}
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
                {saved ? <Check size={16} className="flex-shrink-0" /> : <Heart size={16} className="flex-shrink-0" />}
                <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                  {saved ? 'Сохранено!' : 'Сохранить книгу'}
                </span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                <Share2 size={16} className="flex-shrink-0" />
                <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
              </button>
            </div>
            
            {/* Кнопка другой вариант */}
            <button
              onClick={onGenerateAnother}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
            >
              <RotateCw size={16} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Другой вариант</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
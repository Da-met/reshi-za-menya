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
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Блок "МЫ НАШЛИ ИДЕАЛЬНУЮ КНИГУ" */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Sparkles size={24} className="text-primary" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-accent text-foreground">
              МЫ НАШЛИ ИДЕАЛЬНУЮ КНИГУ!
            </h1>
            <Sparkles size={24} className="text-secondary" />
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Вот что мы предлагаем для вашего настроения
          </p>
        </div>

        {/* Основной контент */}
        <div className="space-y-8">
          
          {/* Основной блок с книгой */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            
            {/* Заголовок и кнопки */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-2xl md:text-3xl text-foreground mb-3">
                  {bookInfo.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {bookInfo.author}
                </p>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <button className="p-1 sm:p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Heart size={18} className="sm:size-5" />
                </button>
                <button className="p-1 sm:p-2 bg-muted rounded-lg hover:bg-accent transition-colors">
                  <Share2 size={18} className="sm:size-5" />
                </button>
              </div>
            </div>

            {/* Чипы */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-section-development/10 text-section-development rounded-full text-xs sm:text-sm">
                {bookInfo.readingComplexity} сложность
              </span>
              {bookInfo.year && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                  <Calendar size={12} className="sm:size-[14px] mr-1" />
                  {bookInfo.year}
                </span>
              )}
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-[14px] mr-1" />
                {bookInfo.length}
              </span>
              {bookInfo.country && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                  <Globe size={12} className="sm:size-[14px] mr-1" />
                  {bookInfo.country}
                </span>
              )}
              {bookInfo.rating && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <span className="mr-1">⭐</span>
                  {bookInfo.rating}
                </span>
              )}
            </div>

            {/* Обложка и детали */}
            <div className="flex flex-col lg:flex-row gap-8 mb-6">
              
              {/* Обложка */}
              <div className="lg:w-2/5">
                {bookInfo.coverImage && !imageError ? (
                  <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
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
                  <div className="w-full max-w-sm mx-auto lg:max-w-full aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center shadow-lg">
                    <div className="text-center p-6">
                      <Book className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
                      <p className="text-sm text-blue-800 font-medium">{bookInfo.title}</p>
                      <p className="text-xs text-blue-600 mt-1">{bookInfo.author}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Детали книги */}
              <div className="lg:w-3/5">
                <div className="space-y-4">
                  
                  {/* Информация */}
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Информация</h3>
                    <div className="space-y-2 text-sm">
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
                    <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookInfo.genres.map((genre, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Особенности */}
                  {bookInfo.features && bookInfo.features.length > 0 && (
                    <div>
                      <h3 className="text-lg text-foreground mb-2">Особенности</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {bookInfo.features.map((feature, index) => (
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

            {/* Кнопка "Читать" */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Доступно для чтения</p>
                  <p className="text-2xl font-bold text-primary">Литрес, MyBook, Bookmate</p>
                </div>
                <button 
                  onClick={() => handleBuyClick('litres')}
                  className="
                    flex items-center justify-center gap-2
                    px-4 py-3 sm:py-2
                    bg-green-600 text-white
                    rounded-lg
                    font-medium
                    hover:bg-green-700
                    transition-colors
                    w-full sm:w-auto
                  "
                >
                  <BookOpen size={20} />
                  <span>Читать онлайн</span>
                </button>
              </div>
            </div>

            {/* Описание книги */}
            <div className="mb-6">
              <h2 className="text-xl text-foreground mb-3">О книге</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {bookInfo.description}
              </p>
            </div>

            {/* Почему подходит */}
            <div className="mb-2">
              <h2 className="text-xl text-foreground mb-3">Почему это хорошая рекомендация</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {bookInfo.whyMatch}
              </p>
            </div>
          </div>

          {/* Кнопки действий - АДАПТИВНЫЕ - ИДЕНТИЧНО MovieResult */}
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
                  {saved ? <Check size={18} className="flex-shrink-0" /> : <Heart size={18} className="flex-shrink-0" />}
                  <span className="font-semibold text-sm sm:text-base truncate">
                    {saved ? 'Сохранено!' : 'Сохранить книгу'}
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
                  <Share2 size={18} className="flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">Поделиться</span>
                </button>
              </div>

              {/* Кнопка другой вариант */}
              <button
                onClick={onGenerateAnother}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
              >
                <RotateCw size={18} className="flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">Другой вариант</span>
              </button>
            </div>
          </div>

          {/* Блок маркетплейсов */}
          {/* <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Где купить</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Литрес', key: 'litres' },
                { name: 'Book24', key: 'book24' },
                { name: 'Лабиринт', key: 'labyrinth' },
                { name: 'Читай-город', key: 'chitai-gorod' },
                { name: 'MyBook', key: 'mybook' },
                { name: 'Bookmate', key: 'bookmate' },
                { name: 'Амазон', key: 'amazon' },
                { name: 'OZON', key: 'ozon' }
              ].map(({ name, key }) => (
                <button
                  key={key}
                  onClick={() => handleBuyClick(key)}
                  className="p-3 bg-muted border border-border rounded-lg hover:border-primary hover:bg-accent transition-all text-sm font-medium text-center"
                >
                  {name}
                </button>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
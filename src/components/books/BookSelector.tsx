// src/components/books/BookGenerator.tsx
'use client';

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { BookRequest, BookResponse } from '@/types/books';
import { MoodSection } from './sections/MoodSection';
import { InterestsSection } from './sections/InterestsSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { BookActions } from './BookActions';
import { useBooksForm } from '@/hooks/books/useBooksForm';
import { useBooksApi } from '@/hooks/books/useBooksApi';
import { BOOK_SECTIONS, LUCKY_COMBINATIONS, BOOKS_BANNER } from '@/constants/books.constants';
import { PromotionalBanner } from '@/components/ui/shared';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { BookResult } from './BookResult';


interface BookGeneratorProps {
  onBookGenerated?: (book: BookResponse) => void;
  onRequestChange?: (request: BookRequest) => void;
  currentRequest?: BookRequest;
}

export function BookSelectorComponent({
  onBookGenerated,
  onRequestChange,
  currentRequest = {}
}: BookGeneratorProps) {
  
  const [activeSection, setActiveSection] = useState<'mood' | 'interests' | 'filters'>('mood');
  const [result, setResult] = useState<BookResponse | null>(null);
  const [excludedTitles, setExcludedTitles] = useState<string[]>([]);

  useEffect(() => {
    console.log('🔄 result изменился:', { 
      hasResult: !!result, 
      id: result?.book.id,
      title: result?.book.title,
      time: Date.now() 
    });
  }, [result]);

  // 👇 ЭТОТ useEffect для отслеживания изменений result - добавьте ПОСЛЕ useState
  useEffect(() => {
    console.log('🔄 result изменился:', { 
      hasResult: !!result, 
      id: result?.book.id,
      title: result?.book.title,
      time: Date.now() 
    });
  }, [result]);


  // 👇 РЕФЫ ДЛЯ СКРОЛЛА!
  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const errorContainerRef = useRef<HTMLDivElement>(null);
  
  const { request: bookRequest, isValid, updateRequest, resetRequest } = useBooksForm(currentRequest);
  
  const { generateRecommendation, isLoading: apiIsLoading, error, clearError } = useBooksApi({
    onSuccess: (book) => {
      console.log('🎯 [onSuccess] ВЫЗВАН', { 
        title: book.book.title,
        time: Date.now()
      });
      
      // 👇 Добавляем проверку - если книга уже есть с таким ID, не обновляем
      setResult(prevResult => {
        if (prevResult?.book.id === book.book.id) {
          console.log('⛔ Книга уже есть, пропускаем setResult');
          return prevResult;
        }
        return book;
      });
      
      onBookGenerated?.(book);
    },
    enableCache: true,
    cacheTTL: 3600000
  });

  // Синхронизируем изменения формы с родителем
  useEffect(() => {
    onRequestChange?.(bookRequest);
  }, [bookRequest, onRequestChange]);

  // 👇 СКРОЛЛ К ЛОАДЕРУ
  useEffect(() => {
    if (apiIsLoading && loaderContainerRef.current) {
      console.log('📚 Скроллим к лоадеру!');
      loaderContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [apiIsLoading]);

  // 👇 СКРОЛЛ К ОШИБКЕ
  useEffect(() => {
    if (error && errorContainerRef.current) {
      setTimeout(() => {
        errorContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100); // Небольшая задержка для гарантии
    }
  }, [error]);

  // 👇 СКРОЛЛ К РЕЗУЛЬТАТУ
  useEffect(() => {
    if (result && resultsContainerRef.current) {
      resultsContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [result]);

  const handleGenerate = async (excludeTitle?: string) => {
    if (excludeTitle && typeof excludeTitle !== 'string') {
      excludeTitle = undefined;
    }

    if (!isValid || apiIsLoading) return;

    setResult(null);
    clearError();

    try {
      let titlesToExclude = [...excludedTitles];
      if (excludeTitle && !titlesToExclude.includes(excludeTitle)) {
        titlesToExclude = [...titlesToExclude, excludeTitle]; 
      }

      const requestWithExclude = {
        ...bookRequest,
        ...(titlesToExclude.length > 0 && { exclude_titles: titlesToExclude })
      };

      const bookData = await generateRecommendation(requestWithExclude);
      setExcludedTitles(prev => {
        const newExcluded = [...prev];
        if (!newExcluded.includes(bookData.book.title)) {
          newExcluded.push(bookData.book.title);
        }
        return newExcluded;
      });
      setResult(bookData);

      // 👇 И здесь проверка
      setResult(prevResult => {
        if (prevResult?.book.id === bookData.book.id) {
          return prevResult;
        }
        return bookData;
      });

    } catch (error) {
      console.error('❌ Ошибка генерации:', error);
    }
  };

  const handleLucky = async () => {
    setExcludedTitles([]);
    setResult(null);
    clearError();

    try {
      const randomIndex = Math.floor(Math.random() * LUCKY_COMBINATIONS.length);
      const randomCombination = LUCKY_COMBINATIONS[randomIndex];
      
      // Обновляем форму случайными значениями
      resetRequest();
      updateRequest({
        readingMood: randomCombination.readingMood,
        preferredGenres: [...randomCombination.preferredGenres]
      });

      const luckyRequest = {
        readingMood: randomCombination.readingMood,
        preferredGenres: [...randomCombination.preferredGenres],
        bookLength: randomCombination.bookLength,
        narrativePace: randomCombination.narrativePace,
        emotionalIntensity: randomCombination.emotionalIntensity,
        specialFeatures: [],
        authorRegion: undefined,
        publicationPeriod: undefined,
        targetAudience: undefined,
        popularityLevel: undefined
      };

      const bookData = await generateRecommendation(luckyRequest);
      setResult(bookData);
    } catch (error) {
      console.error('❌ Ошибка случайного выбора:', error);
    }
  };

  useEffect(() => {
    setExcludedTitles([]);
  }, [bookRequest.readingMood, bookRequest.preferredGenres]);

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={BOOKS_BANNER.title}
        description={BOOKS_BANNER.description}
        route={BOOKS_BANNER.route}
        emoji={BOOKS_BANNER.emoji}
      />

      <SelectedOptions request={bookRequest} />

      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация по секциям */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 p-2 sm:p-1 bg-muted rounded-xl">
          {BOOK_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as typeof activeSection)}
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Секции формы */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'mood' && (
            <MoodSection request={bookRequest} onChange={updateRequest} />
          )}
          {activeSection === 'interests' && (
            <InterestsSection request={bookRequest} onChange={updateRequest} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={bookRequest} onChange={updateRequest} />
          )}
        </div>

        {/* Кнопки действий */}
        <BookActions
          isFormValid={isValid}
          isGenerating={apiIsLoading}
          onGenerate={() => handleGenerate()}
          onLucky={handleLucky}
        />

        {!isValid && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Выберите настроение или добавьте 2+ жанра
          </p>
        )}
      </div>

      {/* 👇 ЛОАДЕР С РЕФОМ */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={apiIsLoading}
          title="Ищем идеальную книгу"
          message="Анализируем ваши предпочтения..."
        />
      </div>

      {/* 👇 БЛОК ОШИБКИ С РЕФОМ */}
      <div ref={errorContainerRef} className="scroll-mt-24">
        {error && !apiIsLoading && (
          <ErrorDisplay
            error={error}
            onRetry={() => handleGenerate()}
            onDismiss={clearError}
            module="books"
          />
        )}
      </div>

      {/* 👇 РЕЗУЛЬТАТ С РЕФОМ */}
      <div ref={resultsContainerRef} className="scroll-mt-24">
        {result && !apiIsLoading && (
          <BookResult
            book={result}
            onSave={() => console.log('Сохранение книги:', result)}
            onGenerateAnother={(excludeTitle) => handleGenerate(excludeTitle)}
          />
        )}
      </div>
    </div>
  );
}

export const BookSelector = React.memo(BookSelectorComponent);
BookSelector.displayName = 'BookSelector';
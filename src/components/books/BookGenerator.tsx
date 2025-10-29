'use client';

import { BookRequest, BookResponse } from '@/types/books';
import { MoodSection } from './sections/MoodSection';
import { InterestsSection } from './sections/InterestsSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { TrendingBanner } from './TrendingBanner';
import { BookActions } from './BookActions';
import { useBookGeneration } from './hooks/useBookGeneration';
import { useRandomBooks } from './hooks/useRandomBooks';
import { Heart, BookOpen, Settings } from 'lucide-react';
import { useState } from 'react';

interface BookGeneratorProps {
  onBookGenerated?: (book: BookResponse) => void;
  isGenerating?: boolean;
  onGeneratingChange?: (generating: boolean) => void;
  onRequestChange?: (request: BookRequest) => void;
  currentRequest?: BookRequest;
  onClearBook?: () => void;
}

export function BookGenerator({
  onBookGenerated,
  isGenerating = false,
  onGeneratingChange,
  currentRequest = {},
  onClearBook
}: BookGeneratorProps) {
  const [activeSection, setActiveSection] = useState<'mood' | 'interests' | 'filters'>('mood');
  const { bookRequest, isFormValid, handleRequestChange } = useBookGeneration(currentRequest);
  const { generateRandomRequest } = useRandomBooks();

  const handleGenerate = async () => {
    if (!isFormValid() || isGenerating) return;

    onClearBook?.();
    onGeneratingChange?.(true);

    try {
      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: "book_recommendation",    // 👈 Имя промпта из БД
          category: "Books",                      // 👈 Категория промпта  
          parameters: bookRequest                 // 👈 Данные из формы
        })
      });

      if (!response.ok) throw new Error('Ошибка API');

      const apiResponse = await response.json();
      
      // Адаптируем данные под наши типы
      const bookData: BookResponse = {
        book: {
          ...apiResponse.jsonStructuredResponse,
          // Дополнительные преобразования если нужны
        },
        generationId: Date.now().toString()
      };

      onBookGenerated?.(bookData);
      
    } catch (error) {
      console.error('Ошибка генерации книги:', error);
      // TODO: Показать ошибку пользователю
    } finally {
      onGeneratingChange?.(false);
    }
  };

  const handleLucky = async () => {
    const randomRequest = generateRandomRequest();
    
    try {
      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: "book_recommendation",
          category: "Books", 
          parameters: randomRequest
        })
      });

      if (!response.ok) throw new Error('Ошибка API');

      const apiResponse = await response.json();
      const bookData: BookResponse = {
        book: apiResponse.jsonStructuredResponse,
        generationId: `lucky-${Date.now()}`
      };

      onBookGenerated?.(bookData);
      
    } catch (error) {
      console.error('Ошибка случайной генерации:', error);
      // TODO: Показать ошибку пользователю
    } finally {
      onGeneratingChange?.(false);
    }
  };

  return (
    <div className="space-y-6">
      <TrendingBanner />
      <SelectedOptions request={bookRequest} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация по секциям */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {[
            { id: 'mood' as const, label: 'Настроение', icon: <Heart size={16} /> },
            { id: 'interests' as const, label: 'Жанры', icon: <BookOpen size={16} /> },
            { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {section.icon}
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Секции формы */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'mood' && (
            <MoodSection request={bookRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'interests' && (
            <InterestsSection request={bookRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={bookRequest} onChange={handleRequestChange} />
          )}
        </div>

        {/* Кнопки действий */}
        <BookActions
          isFormValid={isFormValid()}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
          onLucky={handleLucky}
        />

        {!isFormValid() && (
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Выберите настроение или добавьте 2+ жанра
          </p>
        )}
      </div>
    </div>
  );
}
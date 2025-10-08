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
    
    // 🔴 ВРЕМЕННАЯ ЗАГЛУШКА - ЗАМЕНИТЬ НА РЕАЛЬНЫЙ API
    console.log('📚 ОТПРАВКА НА БЭКЕНД (BookRequest со ВСЕМИ полями):', bookRequest);
    
    // 🚀 TODO: ЗАМЕНИТЬ НА РЕАЛЬНЫЙ API ВЫЗОВ
    /*
    const response = await fetch('/api/generate-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookRequest)
    });
    */
    
    onClearBook?.();
    onGeneratingChange?.(true);
  
    // ⏳ ВРЕМЕННАЯ ЗАГЛУШКА
    setTimeout(() => {
      const mockBook: BookResponse = {
        book: {
          id: '1',
          title: 'Мастер и Маргарита',
          author: 'Михаил Булгаков',
          description: 'Великий роман о добре и зле, любви и верности, магии и реальности.',
          whyMatch: 'Идеально для глубокого погружения в классическую литературу с элементами мистики',
          genre: ['Классика', 'Мистика', 'Философский роман'],
          length: '500 страниц',
          complexity: 'Средняя',
          year: 1967,
          country: 'Россия',
          features: ['Культовая классика', 'Философская глубина', 'Многоплановый сюжет']
        },
        generationId: '123'
      };
      
      console.log('✅ ПОЛУЧЕН ОТВЕТ ОТ API (BookResponse):', mockBook);
      onBookGenerated?.(mockBook);
      onGeneratingChange?.(false);
    }, 2000);
  };

  const handleLucky = async () => {
    // 🔴 ВРЕМЕННАЯ ЗАГЛУШКА - ЗАМЕНИТЬ НА РЕАЛЬНЫЙ API
    const randomRequest = generateRandomRequest();
    console.log('🎲 РАНДОМНЫЙ ЗАПРОС НА БЭКЕНД (BookRequest):', randomRequest);
    
    // 🚀 TODO: ЗАМЕНИТЬ НА РЕАЛЬНЫЙ API ВЫЗОВ
    /*
    const response = await fetch('/api/generate-book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(randomRequest)
    });
    
    const result: BookResponse = await response.json();
    onBookGenerated(result);
    */
    
    onClearBook?.();
    onGeneratingChange?.(true);

    // ⏳ ВРЕМЕННАЯ ЗАГЛУШКА - УДАЛИТЬ ПОСЛЕ ИНТЕГРАЦИИ API
    setTimeout(() => {
      const mockBook: BookResponse = {
        book: {
          id: `lucky-${Date.now()}`,
          title: 'Случайная книга',
          author: 'Разные авторы',
          description: 'Отличный выбор для разнообразия чтения!',
          whyMatch: 'Идеально подходит для расширения кругозора',
          genre: randomRequest.interests || [],
          length: '300-400 страниц',
          complexity: 'Разная',
          year: 2020,
          country: 'Международная'
        },
        generationId: `lucky-${Date.now()}`
      };
      
      console.log('✅ ПОЛУЧЕН ОТВЕТ ОТ API (рандомная заглушка):', mockBook);
      onBookGenerated?.(mockBook);
      onGeneratingChange?.(false);
    }, 2000);
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
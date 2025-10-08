'use client';

import { useState } from 'react';
import { BookResponse, BookRequest } from '@/types/books';
import { BookGenerator } from '@/components/books/BookGenerator';
import { BookResult } from '@/components/books/BookResult';


export default function BooksPage() {
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentBook, setCurrentBook] = useState<BookResponse | null>(null);
  const [currentRequest, setCurrentRequest] = useState<BookRequest>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBookGenerated = (book: BookResponse) => {
    setCurrentBook(book);
  };

  const handleClearBook = () => {
    setCurrentBook(null);
  };

  const handleRequestChange = (request: BookRequest) => {
    setCurrentRequest(request);
  };

  const handleSaveBook = () => {
    console.log('Сохранение книги:', currentBook);
    // Логика сохранения
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="
            text-4xl md:text-5xl lg:text-6xl 
            font-accent
            text-foreground
            mb-3 md:mb-4
          ">
            Что почитать?
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            text-muted-foreground
            mb-6 md:mb-8
            max-w-2xl
            mx-auto
          ">
            Найдем идеальную книгу для вашего настроения и интересов
          </p>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setCurrentView('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              📚 Генератор книг
            </button>
            <button
              onClick={() => setCurrentView('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                ${currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              💾 Мои книги
            </button>
          </div>
        </div>

        {currentView === 'generator' ? (
          <>
            <BookGenerator
              onBookGenerated={handleBookGenerated}
              isGenerating={isGenerating}
              onGeneratingChange={setIsGenerating}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
              onClearBook={handleClearBook}
            />
            
            {currentBook && (
              <BookResult
                book={currentBook}
                onSave={handleSaveBook}
                onGenerateAnother={() => setCurrentBook(null)}
              />
            )}
          </>
        ) : (
          <div className="bg-card rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-accent font-bold mb-4 text-foreground">Мои книги</h2>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-muted-foreground mb-4">Здесь будут ваши сохраненные книги</p>
              <p className="text-sm text-muted-foreground">
                Сохраняйте понравившиеся рекомендации, чтобы не потерять их
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
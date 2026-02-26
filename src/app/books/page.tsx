// src/app/books/page.tsx

'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookResponse, BookRequest } from '@/types/books';


// Ленивая загрузка всех компонентов
const BookSelector = lazy(() => 
  import('@/components/books/BookSelector').then(mod => ({ 
    default: mod.BookSelector 
  }))
);

const SavedBooks = lazy(() => 
  import('@/components/books/SavedBooks').then(mod => ({ 
    default: mod.SavedBooks 
  }))
);

// Компонент загрузки
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Загрузка модуля книг...</p>
      </div>
    </div>
  );
}

// Основной контент с логикой
function BooksContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<'generator' | 'saved'>('generator');
  const [currentRequest, setCurrentRequest] = useState<BookRequest>({});

  // При загрузке проверяем параметр URL
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  const handleBookGenerated = (book: BookResponse) => {
    console.log('📄 [Page] книга сгенерирована:', book.book.title);
    // Здесь можно добавить логику, если нужно
  };

  const handleRequestChange = (request: BookRequest) => {
    setCurrentRequest(request);
  };

  const handleViewChange = (view: 'generator' | 'saved') => {
    setCurrentView(view);
    
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    
    router.replace(`/books?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-accent text-foreground mb-3 md:mb-4">
            Что почитать?
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Найдем идеальную книгу для вашего настроения и интересов
          </p>

          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('generator')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                cursor-pointer
                ${currentView === 'generator'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                }
              `}
            >
              📚 Генератор книг
            </button>
            <button
              onClick={() => handleViewChange('saved')}
              className={`
                px-5 py-3 md:px-6 md:py-3
                rounded-full
                font-medium
                transition-all
                text-sm md:text-base
                cursor-pointer
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

        {/* Динамическая загрузка компонентов с Suspense */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            </div>
          </div>
        }>
          {currentView === 'generator' ? (
            <BookSelector
              onBookGenerated={handleBookGenerated}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
            />
          ) : (
            <SavedBooks />
          )}
        </Suspense>
      </div>
    </div>
  );
}

// Основной экспорт с Suspense на уровне страницы
export default function BooksPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BooksContent />
    </Suspense>
  );
}
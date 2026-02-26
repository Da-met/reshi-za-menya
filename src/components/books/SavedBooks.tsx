'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Clock, MoreVertical, Eye, EyeOff, Star } from 'lucide-react';
import { SavedBook } from '@/types/books';
import { EmptyState, PromotionalBanner } from '../ui/shared';
import { BOOKS_BANNER } from '@/constants/books.constants';
import React from 'react';

// Временные данные
const mockSavedBooks: SavedBook[] = [
  {
    id: '1',
    bookData: {
      book: {
        id: 'book-1',
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        description: 'Великий роман о добре и зле, любви и творчестве, где реальность переплетается с фантастикой.',
        whyMatch: 'Идеально подходит для любителей глубокой прозы с философским подтекстом и элементами мистики.',
        genres: ['классика', 'мистика', 'роман'],
        length: '480 страниц',
        readingComplexity: 'Средняя',
        year: 1967,
        country: 'Россия'
      },
      generationId: 'gen-1'
    },
    requestData: {
      readingMood: 'think',
      preferredGenres: ['classic', 'fiction'],
      bookLength: 'single'
    },
    createdAt: new Date('2024-01-15'),
    userComment: 'Невероятно глубокая книга, перечитываю каждый год и каждый раз нахожу что-то новое.',
    userRating: 10,
    read: true,
    readDate: new Date('2024-01-20')
  },
  {
    id: '2',
    bookData: {
      book: {
        id: 'book-2',
        title: 'Гарри Поттер и философский камень',
        author: 'Джоан Роулинг',
        description: 'Первая книга знаменитой серии о юном волшебнике Гарри Поттере.',
        whyMatch: 'Отлично подходит для семейного чтения или для погружения в мир магии и приключений.',
        genres: ['фэнтези', 'приключения', 'детская'],
        length: '320 страниц',
        readingComplexity: 'Легкая',
        year: 1997,
        country: 'Великобритания'
      },
      generationId: 'gen-2'
    },
    requestData: {
      readingMood: 'entertain',
      preferredGenres: ['fantasy', 'adventure'],
      bookLength: 'long_series'
    },
    createdAt: new Date('2024-01-10')
  }
];



export function SavedBooksComponent() {
  const router = useRouter();
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>(mockSavedBooks);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDeleteBook = (bookId: string) => {
    console.log('Удаление книги:', bookId);
    setSavedBooks(prev => prev.filter(book => book.id !== bookId));
    setActiveDropdown(null);
  };

  const handleToggleRead = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedBooks(prev => prev.map(book =>
      book.id === bookId
        ? { ...book, read: !book.read, readDate: !book.read ? new Date() : undefined }
        : book
    ));
  };

  const handleOpenBook = (bookId: string) => {
    router.push(`/books/saved/${bookId}`);
  };

  const toggleDropdown = (bookId: string) => {
    setActiveDropdown(activeDropdown === bookId ? null : bookId);
  };

  if (savedBooks.length === 0) {
    return (
      <>
        <PromotionalBanner
          title={BOOKS_BANNER.title}
          description={BOOKS_BANNER.description}
          route={BOOKS_BANNER.route}
          emoji={BOOKS_BANNER.emoji}
        />
        <EmptyState
          icon="📚"
          title="Нет сохраненных книг"
          description="Сохраняйте понравившиеся рекомендации книг, чтобы вернуться к ним позже"
          variant="compact"
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <PromotionalBanner
        title={BOOKS_BANNER.title}
        description={BOOKS_BANNER.description}
        route={BOOKS_BANNER.route}
        emoji={BOOKS_BANNER.emoji}
      />

      <div className="flex items-center justify-between mb-3">
        <p className="text-muted-foreground">
          {savedBooks.length} сохранен{savedBooks.length === 1 ? 'ая' : 'ых'} книг
          {savedBooks.length === 1 ? 'а' : savedBooks.length >= 2 && savedBooks.length <= 4 ? 'и' : ''}
        </p>
      </div>

      <div className="grid gap-5">
        {savedBooks.map((savedBook) => {
          const isDropdownOpen = activeDropdown === savedBook.id;
          const book = savedBook.bookData.book;
          
          return (
            <div
              key={savedBook.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenBook(savedBook.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground mt-1">
                      {book.author}
                    </p>
                    
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-lg text-primary font-semibold">
                        {book.year}
                      </span>
                      <span className="text-lg text-primary font-semibold">
                        {book.length}
                      </span>
                      {savedBook.userRating && (
                        <span className="flex items-center gap-1 text-lg text-blue-600 font-semibold">
                          <Star size={16} className="fill-blue-500" />
                          {savedBook.userRating}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(savedBook.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleRead(savedBook.id, e);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                        >
                          {savedBook.read ? <EyeOff size={14} /> : <Eye size={14} />}
                          {savedBook.read ? 'Не прочитана' : 'Прочитана'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBook(savedBook.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {book.genres.slice(0, 3).map((genre) => (
                    <span key={genre} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleRead(savedBook.id, e);
                    }}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                      savedBook.read
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {savedBook.read ? <Eye size={12} /> : <EyeOff size={12} />}
                    {savedBook.read ? 'Прочитана' : 'Не прочитана'}
                  </button>
                </div>

                {savedBook.userComment && (
                  <div className="mb-4 p-3 bg-primary/20 border border-primary/30 rounded-lg">
                    <p className="text-sm text-foreground break-words">{savedBook.userComment}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {savedBook.createdAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const SavedBooks = React.memo(SavedBooksComponent);
SavedBooks.displayName = 'SavedBooks';
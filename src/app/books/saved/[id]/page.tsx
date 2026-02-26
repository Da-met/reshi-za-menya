// src/app/books/saved/[id]/page.tsx

'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, Star, Clock, MessageCircle, Edit3, Trash2, Eye, EyeOff, Book, Users } from 'lucide-react';
import Link from 'next/link';
import { BookProductCard } from '@/components/books/BookProductCard';
import { SavedBook } from '@/types/books';

// Заглушка данных
const mockBookData: SavedBook = {
  id: '1',
  bookData: {
    book: {
      id: 'book-1',
      title: 'Мастер и Маргарита',
      author: 'Михаил Булгаков',
      description: 'Великий роман о добре и зле, любви и творчестве, где реальность переплетается с фантастикой. Действие происходит в Москве 1930-х годов и в древнем Ершалаиме, где происходит история Понтия Пилата и Иешуа Га-Ноцри.',
      whyMatch: 'Идеально подходит для любителей глубокой прозы с философским подтекстом и элементами мистики. Книга заставляет задуматься о вечных вопросах добра и зла, свободы и ответственности.',
      genres: ['классика', 'мистика', 'роман', 'философская проза'],
      length: '480 страниц',
      readingComplexity: 'Средняя',
      year: 1967,
      country: 'Россия',
      features: ['Глубокий философский подтекст', 'Многослойный сюжет', 'Яркие персонажи', 'Сатирические элементы'],
      coverImage: '/images/books/master-i-margarita.png'
    },
    generationId: 'gen-1'
  },
  requestData: {
    readingMood: 'think',
    preferredGenres: ['classic', 'fiction'],
    bookLength: 'single',
    narrativePace: 'moderate',
    emotionalIntensity: 'dramatic',
    publicationPeriod: 'classic',
    targetAudience: 'adult'
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Невероятно глубокая книга, перечитываю каждый год и каждый раз нахожу что-то новое. Особенно впечатляет образ Воланда и его свиты - гениальное воплощение сил зла, которые на самом деле восстанавливают справедливость.',
  userRating: 10,
  read: true,
  readDate: new Date('2024-01-20')
};

// Вспомогательные функции
const getMoodLabel = (mood: string) => {
  const labels: Record<string, string> = {
    relax: 'Расслабляющее',
    inspire: 'Вдохновляющее',
    think: 'Заставляющее задуматься',
    entertain: 'Развлекательное',
    learn: 'Познавательное',
    emotions: 'Эмоциональное',
    escape: 'Для погружения',
    any: 'Любое'
  };
  return labels[mood] || mood;
};

const getPaceLabel = (pace: string) => {
  const labels: Record<string, string> = {
    dynamic: 'Динамичный',
    moderate: 'Умеренный',
    leisurely: 'Неспешный',
    any: 'Любой'
  };
  return labels[pace] || pace;
};

const getAudienceLabel = (audience: string) => {
  const labels: Record<string, string> = {
    child: 'Для детей',
    teen: 'Для подростков',
    adult: 'Для взрослых',
    any: 'Для всех'
  };
  return labels[audience] || audience;
};

export default function BookDetailPage() {
  const [book, setBook] = useState<SavedBook>(mockBookData);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(book.userComment || '');
  const [isRating, setIsRating] = useState(false);
  const [tempRating, setTempRating] = useState(book.userRating || 0);

  // Функции для работы с комментарием
  const handleAddComment = () => {
    setIsEditingComment(true);
    setCommentText(book.userComment || '');
  };

  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(book.userComment || '');
  };

  const handleSaveComment = () => {
    setBook(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
    console.log('Сохранение комментария:', commentText);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(book.userComment || '');
  };

  const handleDeleteComment = () => {
    setBook(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
    console.log('Удаление комментария');
  };

  // Функции для статуса прочтения
  const handleToggleRead = () => {
    setBook(prev => ({
      ...prev,
      read: !prev.read,
      readDate: !prev.read ? new Date() : undefined
    }));
  };

  // Функции для оценки
  const handleStartRating = () => {
    setIsRating(true);
    setTempRating(book.userRating || 0);
  };

  const handleSetRating = (rating: number) => {
    setTempRating(rating);
  };

  const handleSaveRating = () => {
    setBook(prev => ({
      ...prev,
      userRating: tempRating
    }));
    setIsRating(false);
    console.log('Сохранение оценки:', tempRating);
  };

  const handleCancelRating = () => {
    setIsRating(false);
    setTempRating(book.userRating || 0);
  };

  const handleRemoveRating = () => {
    setBook(prev => ({
      ...prev,
      userRating: undefined
    }));
    setIsRating(false);
    console.log('Удаление оценки');
  };

  const bookInfo = book.bookData.book;

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/books?view=saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к моим книгам
          </Link>
        </div>

        {/* Основной контент */}
        <div className="space-y-8">
          
          {/* Карточка книги - используем BookProductCard */}
          <BookProductCard book={bookInfo} showBuyButton={true} />

          {/* Правый блок с деталями запроса */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl text-foreground mb-4">Детали запроса</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {book.requestData.readingMood && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  <Heart size={12} className="mr-1" />
                  {getMoodLabel(book.requestData.readingMood)}
                </span>
              )}
              {book.requestData.narrativePace && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Clock size={12} className="mr-1" />
                  {getPaceLabel(book.requestData.narrativePace)}
                </span>
              )}
              {book.requestData.targetAudience && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Users size={12} className="mr-1" />
                  {getAudienceLabel(book.requestData.targetAudience)}
                </span>
              )}
              {book.requestData.bookLength && (
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  <Book size={12} className="mr-1" />
                  {book.requestData.bookLength === 'single' ? 'Одна книга' :
                   book.requestData.bookLength === 'short_series' ? 'Короткая серия' :
                   'Длинная серия'}
                </span>
              )}
              {book.requestData.preferredGenres?.map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-primary-foreground text-primary rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            {/* Статус прочтения и оценка */}
            <div className="border-t border-border pt-4 space-y-4">
              
              {/* Статус прочтения */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={handleToggleRead}
                    className={`p-1 rounded transition-colors ${
                      book.read
                        ? 'text-green-600 hover:text-green-700'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {book.read ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span className="text-foreground">
                    {book.read ? 'Прочитана' : 'Не прочитана'}
                  </span>
                </div>
                {book.read && book.readDate && (
                  <span className="text-xs text-muted-foreground">
                    {book.readDate.toLocaleDateString('ru-RU')}
                  </span>
                )}
              </div>

              {/* Оценка пользователя */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-foreground">Моя оценка</span>
                  </div>
                  {!isRating && book.userRating && (
                    <button
                      onClick={handleStartRating}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Изменить
                    </button>
                  )}
                </div>

                {isRating ? (
                  // Режим оценки
                  <div className="space-y-3 bg-primary/20 p-3 rounded-lg">
                    <div className="text-center text-sm font-medium mb-2">
                      Оцените книгу
                    </div>
                    <div className="flex justify-center gap-1 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleSetRating(star)}
                          className={`p-1 transition-all transform hover:scale-125 ${
                            star <= tempRating
                              ? 'text-yellow-500 scale-110'
                              : 'text-gray-300 hover:text-yellow-400'
                          }`}
                        >
                          <Star
                            size={20}
                            className={star <= tempRating ? 'fill-yellow-500' : ''}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="text-center text-sm font-semibold text-yellow-600">
                      {tempRating}/10
                    </div>
                    <div className="flex justify-center gap-2 pt-2">
                      <button
                        onClick={handleRemoveRating}
                        className="px-3 py-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        Удалить
                      </button>
                      <button
                        onClick={handleCancelRating}
                        className="px-3 py-1 text-xs border border-border rounded hover:bg-accent transition-colors"
                      >
                        Отмена
                      </button>
                      <button
                        onClick={handleSaveRating}
                        className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                      >
                        Сохранить
                      </button>
                    </div>
                  </div>
                ) : book.userRating ? (
                  // Отображение оценки
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= Math.ceil(book.userRating! / 2)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-yellow-600 font-semibold text-sm">
                        {book.userRating}/10
                      </span>
                    </div>
                  </div>
                ) : (
                  // Кнопка добавления оценки
                  <button
                    onClick={handleStartRating}
                    className="w-full p-2 border border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    + Поставить оценку
                  </button>
                )}
              </div>

              {/* Дата сохранения */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                <Clock size={14} />
                <span>Сохранено {book.createdAt.toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </div>

          {/* Блок комментария */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-medium">Моя заметка</h2>
              {!isEditingComment && book.userComment && (
                <button
                  onClick={handleEditComment}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать комментарий"
                >
                  <Edit3 size={18} />
                </button>
              )}
            </div>

            {isEditingComment ? (
              // Режим редактирования
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о книге, впечатления или почему выбрали именно ее..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:primary/50 bg-primary/30 min-h-[80px]"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={handleDeleteComment}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Удалить комментарий"
                  >
                    <Trash2 size={18} />
                    <span className="hidden xs:inline text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelComment}
                      className="px-3 py-1 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : book.userComment ? (
              // Просмотр комментария
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {book.userComment}
                </p>
              </div>
            ) : (
              // Кнопка добавления комментария
              <button
                onClick={handleAddComment}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <MessageCircle size={24} />
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-sm text-muted-foreground/80">
                      Поделитесь впечатлениями, мыслями о книге<br />
                      или почему выбрали именно ее для чтения
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
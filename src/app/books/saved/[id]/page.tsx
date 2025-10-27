'use client';

import { use, useState } from 'react';
import { ArrowLeft, Heart, Share2, BookOpen, Star, Calendar, Clock, MessageCircle, Edit3, Trash2, Eye, EyeOff, Book, Users, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
      genre: ['классика', 'мистика', 'роман', 'философская проза'],
      length: '480 страниц',
      complexity: 'Средняя',
      year: 1967,
      country: 'Россия',
      features: ['Глубокий философский подтекст', 'Многослойный сюжет', 'Яркие персонажи', 'Сатирические элементы'],
        cover: '/images/books/master-i-margarita.png'
    },
    generationId: 'gen-1'
  },
  requestData: {
    mood: 'think',
    interests: ['classic', 'fiction'],
    volume: 'single',
    pace: 'moderate',
    emotional: 'dramatic',
    period: 'classic',
    audience: 'adult'
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

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
          {/* Основной блок с книгой */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            {/* Заголовок и кнопки */}
            <div className="flex items-start justify-between mb-4">
              {/* Заголовок */}
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
                <button
                  onClick={handleToggleRead}
                  className={`p-1 sm:p-2 rounded-lg transition-colors ${
                    book.read
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {book.read ? <Eye size={18} className="sm:size-5" /> : <EyeOff size={18} className="sm:size-5" />}
                </button>
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
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
                {bookInfo.complexity} сложность
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Calendar size={12} className="sm:size-[14px] mr-1" />
                {bookInfo.year}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-[14px] mr-1" />
                {bookInfo.length}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Globe size={12} className="sm:size-[14px] mr-1" />
                {bookInfo.country}
              </span>
            </div>

            {/* Обложка и детали - горизонтально на десктопе */}
            <div className="flex flex-col lg:flex-row gap-8 mb-6">
              {/* Обложка */}
              <div className="lg:w-2/5">
                {bookInfo.cover ? (
                    <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-[3/4] relative">
                        <Image
                        src={bookInfo.cover}
                        alt={`Обложка книги "${bookInfo.title}"`}
                        fill
                        className="object-cover"
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
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Год:</span>
                        <span className="text-foreground">{bookInfo.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страниц:</span>
                        <span className="text-foreground">{bookInfo.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страна:</span>
                        <span className="text-foreground">{bookInfo.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сложность:</span>
                        <span className="text-foreground">{bookInfo.complexity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Жанры */}
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {bookInfo.genre.map((genre, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Особенности */}
                  {bookInfo.features && (
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
                <button className="
                  flex items-center justify-center gap-2
                  px-4 py-3 sm:py-2
                  bg-primary text-primary-foreground
                  rounded-lg
                  font-medium
                  hover:bg-primary/90
                  transition-colors
                  w-full sm:w-auto
                ">
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

          {/* Правый блок - теперь всегда внизу */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl text-foreground mb-4">Детали запроса</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.requestData.mood && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  <Heart size={12} className="mr-1" />
                  {getMoodLabel(book.requestData.mood)}
                </span>
              )}

              {book.requestData.pace && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <Clock size={12} className="mr-1" />
                  {getPaceLabel(book.requestData.pace)}
                </span>
              )}

              {book.requestData.audience && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  <Users size={12} className="mr-1" />
                  {getAudienceLabel(book.requestData.audience)}
                </span>
              )}

              {book.requestData.volume && (
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  <Book size={12} className="mr-1" />
                  {book.requestData.volume === 'single' ? 'Одна книга' : 
                   book.requestData.volume === 'short_series' ? 'Короткая серия' : 
                   'Длинная серия'}
                </span>
              )}

              {book.requestData.interests?.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-primary-foreground text-primary rounded-full text-sm">
                  {interest}
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
              <h2 className="text-xl font-medium">Мой комментарий</h2>
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
                    // Автоматическая высота
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
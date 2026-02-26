'use client';

import { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import Link from 'next/link';
import { MovieProductCard, MovieRequestDetails } from '@/components/movies';
import type { SavedMovie } from '@/types/movies';

// Временные данные (как в Skincare)
const mockSavedMovie: SavedMovie = {
  id: '1',
  movieData: {
    recommendation: {
      id: 'movie-1',
      title: 'Назад в будущее',
      type: 'movie',
      genre: ['фантастика', 'комедия', 'приключения'],
      releaseYear: 1985,
      description: 'Подросток Марти Макфлай случайно попадает в прошлое на машине времени, построенной его другом-учёным доком Брауном. Теперь ему нужно найти способ вернуться в своё время, не изменив при этом ход истории.',
      whyMatch: 'Идеально подходит для семейного просмотра, сочетает юмор, захватывающий сюжет и научную фантастику.',
      runtime: '116 мин',
      productionCountry: 'США',
      kinopoiskRating: 8.5,
      director: 'Роберт Земекис',
      actors: ['Майкл Дж. Фокс', 'Кристофер Ллойд', 'Лиа Томпсон'],
      poster: '/images/movies/back-to-the-future.png'
    },
    generationId: 'gen-1'
  },
  requestData: {
    context: 'family',
    mood: 'funny',
    genres: ['comedy', 'adventure'],
    format: ['movie'],
    year: '80s',
    country: 'usa'
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Отличный фильм для просмотра с детьми-подростками. Юмор понятен всем возрастам, а сюжет держит в напряжении до самого конца.',
  userRating: 9,
  watched: true,
  watchDate: new Date('2024-01-20')
};

export default function MovieDetailPage() {
  const [savedMovie, setSavedMovie] = useState<SavedMovie>(mockSavedMovie);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(savedMovie.userComment || '');
  const [isRating, setIsRating] = useState(false);
  const [tempRating, setTempRating] = useState(savedMovie.userRating || 0);

  // Логика комментария
  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(savedMovie.userComment || '');
  };

  const handleSaveComment = () => {
    setSavedMovie(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(savedMovie.userComment || '');
  };

  const handleDeleteComment = () => {
    setSavedMovie(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
  };

  // Логика статуса просмотра
  const handleToggleWatched = () => {
    setSavedMovie(prev => ({
      ...prev,
      watched: !prev.watched,
      watchDate: !prev.watched ? new Date() : undefined
    }));
  };

  // Логика оценки
  const handleStartRating = () => {
    setIsRating(true);
    setTempRating(savedMovie.userRating || 0);
  };

  const handleSetRating = (rating: number) => {
    setTempRating(rating);
  };

  const handleSaveRating = () => {
    setSavedMovie(prev => ({
      ...prev,
      userRating: tempRating
    }));
    setIsRating(false);
  };

  const handleCancelRating = () => {
    setIsRating(false);
    setTempRating(savedMovie.userRating || 0);
  };

  const handleRemoveRating = () => {
    setSavedMovie(prev => ({
      ...prev,
      userRating: undefined
    }));
    setIsRating(false);
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/movies?view=saved"
            className="inline-flex items-center text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Назад к моим фильмам
          </Link>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Карточка фильма */}
          <MovieProductCard movie={savedMovie.movieData.recommendation} />

          {/* Детали запроса */}
          <MovieRequestDetails
            request={savedMovie.requestData}
            createdAt={savedMovie.createdAt}
          />

          {/* Блок статуса просмотра */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={handleToggleWatched}
                  className={`p-1 rounded transition-colors ${
                    savedMovie.watched
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {savedMovie.watched ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <span className="text-foreground">
                  {savedMovie.watched ? 'Просмотрено' : 'Не просмотрено'}
                </span>
              </div>
              {savedMovie.watched && savedMovie.watchDate && (
                <span className="text-xs text-muted-foreground">
                  {savedMovie.watchDate.toLocaleDateString('ru-RU')}
                </span>
              )}
            </div>
          </div>

          {/* Блок оценки */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Star size={16} className="text-yellow-500" />
                  <span className="text-foreground">Моя оценка</span>
                </div>
                {!isRating && savedMovie.userRating && (
                  <button
                    onClick={handleStartRating}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Изменить
                  </button>
                )}
              </div>

              {isRating ? (
                <div className="space-y-3 bg-primary/20 p-3 rounded-lg">
                  <div className="text-center text-sm font-medium mb-2">
                    Оцените фильм
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
              ) : savedMovie.userRating ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= Math.ceil(savedMovie.userRating! / 2)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-yellow-600 font-semibold text-sm">
                      {savedMovie.userRating}/10
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleStartRating}
                  className="w-full p-2 border border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all text-sm text-muted-foreground hover:text-foreground"
                >
                  + Поставить оценку
                </button>
              )}
            </div>
          </div>

          {/* Блок комментария — полностью как в Skincare */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg md:text-xl text-foreground">Моя заметка</h2>
              {!isEditingComment && savedMovie.userComment && (
                <button
                  onClick={handleEditComment}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать комментарий"
                >
                  <Edit3 size={16} />
                </button>
              )}
            </div>

            {isEditingComment ? (
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о фильме, впечатления или почему выбрали именно его..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:ring-primary/50 bg-background min-h-[80px]"
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
                    <Trash2 size={16} />
                    <span className="hidden xs:inline text-xs md:text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelComment}
                      className="px-3 py-1 text-xs md:text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : savedMovie.userComment ? (
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {savedMovie.userComment}
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingComment(true)}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <Edit3 size={20} />
                  <div className="text-center">
                    <p className="font-medium text-sm md:text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-xs md:text-sm text-muted-foreground/80">
                      Поделитесь впечатлениями, мыслями о фильме<br />
                      или почему выбрали именно его для просмотра
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
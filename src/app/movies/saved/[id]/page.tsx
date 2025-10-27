'use client';

import { use, useState } from 'react';
import { ArrowLeft, Heart, Share2, Play, Star, Calendar, Clock, MessageCircle, Edit3, Trash2, Eye, EyeOff, Film} from 'lucide-react';
import Link from 'next/link';
import { SavedMovie } from '@/types/movies';
import { MovieOptionTag } from '@/components/movies/MovieOptionTag';

// Заглушка данных
const mockMovieData: SavedMovie = {
  id: '1',
  movieData: {
    recommendation: {
      id: 'movie-1',
      title: 'Назад в будущее',
      type: 'movie',
      genre: ['фантастика', 'комедия', 'приключения'],
      releaseYear: 1985,
      description: 'Подросток Марти Макфлай случайно попадает в прошлое на машине времени, построенной его другом-учёным доком Брауном. Теперь ему нужно найти способ вернуться в своё время, не изменив при этом ход истории.',
      whyMatch: 'Идеально подходит для семейного просмотра, сочетает юмор, захватывающий сюжет и научную фантастику. Фильм стал классикой кинематографа и понравится как детям, так и взрослым.',
      runtime: '116 мин',
      productionCountry: 'США',
      kinopoiskRating: 8.5,
      director: 'Роберт Земекис',
      actors: ['Майкл Дж. Фокс', 'Кристофер Ллойд', 'Лиа Томпсон', 'Криспин Гловер'],
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

// Вспомогательные функции
const getContextLabel = (context: string) => {
  const labels: Record<string, string> = {
    family: 'Семьей',
    child: 'С детьми',
    friends: 'С друзьями',
    romance: 'Для романтического вечера',
    solo: 'В одиночку',
    party: 'На вечеринке',
    parents: 'С родителями',
    colleagues: 'С коллегами'
  };
  return labels[context] || context;
};

const getMoodLabel = (mood: string) => {
  const labels: Record<string, string> = {
    funny: 'Веселое',
    thrilling: 'Захватывающее',
    thoughtful: 'Заставляющее задуматься',
    any: 'Любое'
  };
  return labels[mood] || mood;
};

const getFormatLabel = (format: string) => {
  const labels: Record<string, string> = {
    movie: 'Фильм',
    series: 'Сериал',
    cartoon: 'Мультфильм',
    anime: 'Аниме'
  };
  return labels[format] || format;
};

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [movie, setMovie] = useState<SavedMovie>(mockMovieData);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(movie.userComment || '');
  const [isRating, setIsRating] = useState(false);
  const [tempRating, setTempRating] = useState(movie.userRating || 0);

  // Функции для работы с комментарием
  const handleAddComment = () => {
    setIsEditingComment(true);
    setCommentText(movie.userComment || '');
  };

  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(movie.userComment || '');
  };

  const handleSaveComment = () => {
    setMovie(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
    console.log('Сохранение комментария:', commentText);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(movie.userComment || '');
  };

  const handleDeleteComment = () => {
    setMovie(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
    console.log('Удаление комментария');
  };

  // Функции для статуса просмотра
  const handleToggleWatched = () => {
    setMovie(prev => ({
      ...prev,
      watched: !prev.watched,
      watchDate: !prev.watched ? new Date() : undefined
    }));
  };

  // Функции для оценки
  const handleStartRating = () => {
    setIsRating(true);
    setTempRating(movie.userRating || 0);
  };

  const handleSetRating = (rating: number) => {
    setTempRating(rating);
  };

  const handleSaveRating = () => {
    setMovie(prev => ({
      ...prev,
      userRating: tempRating
    }));
    setIsRating(false);
    console.log('Сохранение оценки:', tempRating);
  };

  const handleCancelRating = () => {
    setIsRating(false);
    setTempRating(movie.userRating || 0);
  };

  const handleRemoveRating = () => {
    setMovie(prev => ({
      ...prev,
      userRating: undefined
    }));
    setIsRating(false);
    console.log('Удаление оценки');
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/movies?view=saved"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к моим фильмам
          </Link>
        </div>

        {/* Основной контент - ПРОСТАЯ ВЕРТИКАЛЬНАЯ СТРУКТУРА */}
        <div className="space-y-8">
          {/* Основной блок с фильмом */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            
            {/* Заголовок и кнопки */}
            <div className="flex items-start justify-between mb-4">
              {/* Заголовок */}
              <div className="flex-1 min-w-0 mr-4">
                <h1 className="text-2xl md:text-3xl text-foreground mb-3">
                  {movie.movieData.recommendation.title}
                </h1>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <button 
                  onClick={handleToggleWatched}
                  className={`p-1 sm:p-2 rounded-lg transition-colors ${
                    movie.watched 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {movie.watched ? <Eye size={18} className="sm:size-5" /> : <EyeOff size={18} className="sm:size-5" />}
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
                {movie.movieData.recommendation.type === 'series' ? 'Сериал' : 'Фильм'}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Calendar size={12} className="sm:size-[14px] mr-1" />
                {movie.movieData.recommendation.releaseYear}
              </span>
              <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs sm:text-sm">
                <Clock size={12} className="sm:size-[14px] mr-1" />
                {movie.movieData.recommendation.runtime}
              </span>
              {movie.movieData.recommendation.kinopoiskRating && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm">
                  <Star size={12} className="sm:size-[14px] mr-1 fill-yellow-500" />
                  {movie.movieData.recommendation.kinopoiskRating}
                </span>
              )}
            </div>

            {/* Постер и детали - горизонтально на десктопе */}
            <div className="flex flex-col lg:flex-row gap-8 mb-6">
              
              {/* Постер */}
              <div className="lg:w-2/5">
                {movie.movieData.recommendation.poster ? (
                  <div className="w-full max-w-sm mx-auto lg:max-w-full relative rounded-lg overflow-hidden shadow-lg">
                    <div className="aspect-[3/4] relative">
                    <img
                      src={movie.movieData.recommendation.poster}
                      alt={movie.movieData.recommendation.title}
                      className="w-full h-full object-cover"
                    />
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-sm mx-auto lg:max-w-full aspect-[3/4] bg-muted rounded-lg flex items-center justify-center shadow-lg">
                    <Film size={48} className="text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Детали фильма */}
              <div className="lg:w-3/5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Информация</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Длительность:</span>
                        <span className="text-foreground">{movie.movieData.recommendation.runtime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Страна:</span>
                        <span className="text-foreground">{movie.movieData.recommendation.productionCountry}</span>
                      </div>
                      {movie.movieData.recommendation.director && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Режиссер:</span>
                          <span className="text-foreground text-right">{movie.movieData.recommendation.director}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Жанры */}
                  <div>
                    <h3 className="text-lg text-foreground mb-2">Жанры</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.movieData.recommendation.genre.map((genre, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-foreground text-primary rounded text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Актеры */}
                  {movie.movieData.recommendation.actors && (
                    <div>
                      <h3 className="text-lg text-foreground mb-2">В ролях</h3>
                      <p className="text-sm text-muted-foreground">
                        {movie.movieData.recommendation.actors.slice(0, 3).join(', ')}
                        {movie.movieData.recommendation.actors.length > 3 && '...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Кнопка "Смотреть" */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl border border-primary/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground">Доступно для просмотра</p>
                  <p className="text-2xl font-bold text-primary">Кинопоиск, ivi, Netflix</p>
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
                  <Play size={20} />
                  <span>Смотреть онлайн</span>
                </button>
              </div>
            </div>

            {/* Описание фильма */}
            <div className="mb-6">
              <h2 className="text-xl text-foreground mb-3">О фильме</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {movie.movieData.recommendation.description}
              </p>
            </div>

            {/* Почему подходит */}
            <div className="mb-2">
              <h2 className="text-xl text-foreground mb-3">Почему это хорошая рекомендация</h2>
              <p className="text-muted-foreground leading-normal text-sm md:text-base font-medium">
                {movie.movieData.recommendation.whyMatch}
              </p>
            </div>
          </div>

          {/* Правый блок - теперь всегда внизу */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <h2 className="text-xl text-foreground mb-4">Детали запроса</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.requestData.context && (
                <MovieOptionTag
                  type="context"
                  label={getContextLabel(movie.requestData.context)}
                  value={movie.requestData.context}
                />
              )}
              
              {movie.requestData.mood && (
                <MovieOptionTag
                  type="mood"
                  label={getMoodLabel(movie.requestData.mood)}
                  value={movie.requestData.mood}
                />
              )}

              {movie.requestData.format?.map(format => (
                <MovieOptionTag
                  key={format}
                  type="format"
                  label={getFormatLabel(format)}
                  value={format}
                />
              ))}

              {movie.requestData.year && (
                <MovieOptionTag
                  type="year"
                  label={movie.requestData.year}
                  value={movie.requestData.year}
                />
              )}

              {movie.requestData.country && (
                <MovieOptionTag
                  type="country"
                  label={movie.requestData.country === 'usa' ? 'США' : movie.requestData.country}
                  value={movie.requestData.country}
                />
              )}

              {movie.requestData.genres?.map(genre => (
                <MovieOptionTag
                  key={genre}
                  type="genre"
                  label={genre}
                  value={genre}
                />
              ))}
            </div>

            {/* Статус просмотра и оценка */}
            <div className="border-t border-border pt-4 space-y-4">
              {/* Статус просмотра */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <button 
                    onClick={handleToggleWatched}
                    className={`p-1 rounded transition-colors ${
                      movie.watched 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {movie.watched ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <span className="text-foreground">
                    {movie.watched ? 'Просмотрено' : 'Не просмотрено'}
                  </span>
                </div>
                {movie.watched && movie.watchDate && (
                  <span className="text-xs text-muted-foreground">
                    {movie.watchDate.toLocaleDateString('ru-RU')}
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
                  {!isRating && movie.userRating && (
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
                ) : movie.userRating ? (
                  // Отображение оценки
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={16}
                            className={
                              star <= Math.ceil(movie.userRating! / 2)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-yellow-600 font-semibold text-sm">
                        {movie.userRating}/10
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
                <span>Сохранено {movie.createdAt.toLocaleDateString('ru-RU')}</span>
              </div>
            </div>
          </div>

          {/* Блок комментария - ИСПРАВЛЕННАЯ ВЕРСИЯ */}
          <div className="bg-card rounded-2xl shadow-lg p-4 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-medium">Мой комментарий</h2>
              {!isEditingComment && movie.userComment && (
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
              // Режим редактирования - КОМПАКТНЫЙ С АВТО-ВЫСОТОЙ
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    // Автоматическая высота
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о фильме, впечатления или почему выбрали именно его..."
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
            ) : movie.userComment ? (
              // Просмотр комментария
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {movie.userComment}
                </p>
              </div>
            ) : (
              // Кнопка добавления комментария - УЛУЧШЕННАЯ
              <button
                onClick={handleAddComment}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <MessageCircle size={24} />
                  <div className="text-center">
                    <p className="font-medium text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-sm text-muted-foreground/80">
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
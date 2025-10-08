'use client';

import { BookRequest } from '@/types/books';

interface InterestsSectionProps {
  request: BookRequest;
  onChange: (updates: Partial<BookRequest>) => void;
}

const fictionGenres = [
  'Фантастика', 'Фэнтези', 'Детектив', 'Триллер', 'Ужасы', 'Роман',
  'Приключения', 'Исторический', 'Современная проза', 'Классика',
  'Поэзия', 'Драма', 'Юмор', 'Мистика', 'Киберпанк', 'Постапокалипсис',
  'Стимпанк', 'Магический реализм',
];

const nonfictionGenres = [
  'Биографии', 'Мемуары', 'Психология', 'Саморазвитие', 'Философия',
  'Наука', 'История', 'Путешествия', 'Искусство', 'Бизнес',
  'Здоровье', 'Кулинария', 'Хобби', 'Природа', 'Технологии',
  'Эссеистика', 'Журналистика', 'Культура', 'Религия', 'Политика'
];

export function InterestsSection({ request, onChange }: InterestsSectionProps) {
  const toggleGenre = (genre: string) => {
    const currentGenres = request.interests || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    onChange({ interests: newGenres });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Какие жанры и темы интересуют?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Выберите любимые жанры — чем больше, тем точнее рекомендация
        </p>
      </div>
      
      {/* Художественная литература */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
          📖 Художественная литература
        </h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {fictionGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.interests?.includes(genre)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Нехудожественная литература */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
          📚 Нехудожественная литература
        </h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {nonfictionGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.interests?.includes(genre)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Счетчик выбранных жанров */}
      {request.interests && request.interests.length > 0 && (
        <div className="p-3 bg-accent rounded-lg">
          <p className="text-sm text-accent-foreground">
            ✅ Выбрано жанров: <span className="font-bold">{request.interests.length}</span>
            {request.interests.length < 2 && (
              <span className="text-orange-600 ml-2">— добавьте ещё для лучших рекомендаций</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
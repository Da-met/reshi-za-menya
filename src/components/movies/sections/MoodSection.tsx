'use client';

import { MovieRequest } from '@/types/movies';

interface MoodSectionProps {
  request: MovieRequest;
  onChange: (updates: Partial<MovieRequest>) => void;
}

const moodOptions = [
  { id: 'funny', label: 'Посмеяться', emoji: '😂' },
  { id: 'thrilling', label: 'Поволноваться', emoji: '🎢' },
  { id: 'thoughtful', label: 'Подумать', emoji: '🤔' },
  { id: 'any', label: 'Любое', emoji: '😊' }
];

const genreOptions = [
  'Комедия', 'Драма', 'Триллер', 'Фантастика', 'Фэнтези', 
  'Ужасы', 'Романтика', 'Детектив', 'Приключения', 'Семейные',
  'Мультфильм', 'Аниме', 'Боевик', 'Мелодрама', 'Исторический',
  'Криминал', 'Биография', 'Вестерн', 'Военный', 'Документальный',
  'Иностранный', 'Катастрофа', 'Короткометражка', 'Мюзикл', 'Нуар',
  'Политический', 'Природа', 'Реалити', 'Спорт', 'Трагедия',
  'Фильм-нуар', 'Экшн'
];

export function MoodSection({ request, onChange }: MoodSectionProps) {
  const toggleGenre = (genre: string) => {
    const currentGenres = request.genres || [];
    const newGenres = currentGenres.includes(genre)
      ? currentGenres.filter(g => g !== genre)
      : [...currentGenres, genre];
    
    onChange({ genres: newGenres });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-l md:text-xl font-accent font-semibold mb-2 text-foreground">
          Какое настроение и жанры?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Выберите настроение и любимые жанры
        </p>
      </div>
      
      {/* Настроение */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">🎭 Настроение</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => onChange({ mood: mood.id })}
              className={`p-4 rounded-lg border text-center transition-all ${
                request.mood === mood.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-lg mb-1">{mood.emoji}</div>
              <div className="text-sm font-medium">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Жанры */}
      <div>
        <h4 className="font-semibold mb-2 md:mb-3 text-foreground text-sm md:text-base">
          🎬 Жанры {request.genres && <span className="text-primary">({request.genres.length})</span>}
        </h4>
        <div className="flex flex-wrap gap-2">
          {genreOptions.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                request.genres?.includes(genre)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
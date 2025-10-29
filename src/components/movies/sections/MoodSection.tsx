'use client';

import { MovieRequest } from '@/types/movies';

interface MoodSectionProps {
  request: MovieRequest;
  onChange: (updates: Partial<MovieRequest>) => void;
}

export const moodOptions = [
  { 
    id: 'funny', 
    label: 'Посмеяться', 
    emoji: '😂', 
    hints: ['Комедии', 'Ситкомы', 'Стендап'] 
  },
  { 
    id: 'thrilling', 
    label: 'Поволноваться', 
    emoji: '🎢', 
    hints: ['Триллеры', 'Ужасы', 'Детективы'] 
  },
  { 
    id: 'thoughtful', 
    label: 'Подумать', 
    emoji: '🤔', 
    hints: ['Драмы', 'Арт-хаус', 'Философское кино'] 
  },
  { 
    id: 'romantic', 
    label: 'Почувствовать романтику', 
    emoji: '💕', 
    hints: ['Мелодрамы', 'Ромкомы', 'Истории любви'] 
  },
  { 
    id: 'inspiring', 
    label: 'Вдохновиться', 
    emoji: '✨', 
    hints: ['Биографии', 'Спортивные драмы', 'Истории успеха'] 
  },
  { 
    id: 'adventurous', 
    label: 'Отправиться в приключение', 
    emoji: '🗺️', 
    hints: ['Приключения', 'Экшн', 'Фэнтези'] 
  },
  { 
    id: 'relaxing', 
    label: 'Расслабиться', 
    emoji: '😌', 
    hints: ['Комедии', 'Лёгкие драмы', 'Семейные фильмы'] 
  },
  { 
    id: 'emotional', 
    label: 'Пережить эмоции', 
    emoji: '🎭', 
    hints: ['Драмы', 'Трагедии', 'Психологическое кино'] 
  }
];

const genreOptions = [
  'Комедия', 'Драма', 'Триллер', 'Фантастика', 'Фэнтези',
  'Ужасы', 'Романтика', 'Детектив', 'Приключения', 'Семейные',
  'Мультфильм', 'Аниме', 'Боевик', 'Мелодрама', 'Исторический',
  'Криминал', 'Биография', 'Вестерн', 'Военный', 'Документальный',
  'Арт-хаус', 'Философское', 'Спортивный', 'Музыкальный', 'Короткометражка',
  'Научная фантастика', 'Психологический', 'Ситком', 'Стендап', 'Ромком'
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
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Какое настроение и жанры?
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Выберите настроение и любимые жанры
        </p>
      </div>
      
      {/* Настроение */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🎭 Настроение</h4>
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

        {request.mood && (
          <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
            <p className="text-xs md:text-sm text-accent-foreground">
              💡 Часто выбирают: {moodOptions.find(m => m.id === request.mood)?.hints?.join(', ')}
            </p>
          </div>
        )}
      </div>



      {/* Жанры */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
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
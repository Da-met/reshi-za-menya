'use client';

import { BookRequest } from '@/types/books';

interface FiltersSectionProps {
  request: BookRequest;
  onChange: (updates: Partial<BookRequest>) => void;
}

const volumeOptions = [
  { id: 'single', label: 'Одна книга' },
  { id: 'short_series', label: 'Короткая серия (2-3 книги)' },
  { id: 'long_series', label: 'Длинная серия (4+ книги)' },
  { id: 'any', label: 'Любой объем' }
];

const paceOptions = [
  { id: 'dynamic', label: 'Динамичный' },
  { id: 'moderate', label: 'Умеренный' },
  { id: 'leisurely', label: 'Неторопливый' },
  { id: 'any', label: 'Любой' }
];

const emotionalOptions = [
  { id: 'light', label: 'Легкая и светлая' },
  { id: 'emotional', label: 'Эмоциональная глубина' },
  { id: 'dramatic', label: 'Напряженная и драматичная' },
  { id: 'any', label: 'Любая' }
];

const featureOptions = [
  'Бестселлер', 'Современный автор', 'Проверенная классика',
  'Малоизвестная жемчужина', 'Экранизирована', 'Короткая форма',
  'Интеллектуальная', 'Популярная', 'Экспериментальная',
  'Традиционная', 'Социальная проблематика', 'Философская глубина'
];

const regionOptions = [
  { id: 'russian', label: '🇷🇺 Русскоязычная' },
  { id: 'europe_america', label: 'Европа и Америка' },
  { id: 'asia', label: 'Азия' },
  { id: 'other', label: 'Другие регионы' },
  { id: 'any', label: 'Любой регион' }
];

const periodOptions = [
  { id: 'modern', label: 'Современная (последние 5 лет)' },
  { id: 'recent', label: 'Новейшая (2000-е годы)' },
  { id: '20th', label: 'XX век' },
  { id: 'classic', label: 'Классика (XIX век и ранее)' },
  { id: 'any', label: 'Любое время' }
];

const audienceOptions = [
  { id: 'child', label: 'Детская' },
  { id: 'teen', label: 'Подростковая (YA)' },
  { id: 'adult', label: 'Взрослая' },
  { id: 'any', label: 'Любая' }
];

const popularityOptions = [
  { id: 'bestseller', label: 'Широко известные' },
  { id: 'average', label: 'Средней популярности' },
  { id: 'hidden_gem', label: 'Малоизвестные жемчужины' },
  { id: 'any', label: 'Любые' }
];

export function FiltersSection({ request, onChange }: FiltersSectionProps) {
  const toggleFeature = (feature: string) => {
    const currentFeatures = request.specialFeatures || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    onChange({ specialFeatures: newFeatures });
  };

  const handleSingleSelect = (field: keyof BookRequest, value: string) => {
    if (request[field] === value) {
      onChange({ [field]: undefined });
    } else {
      onChange({ [field]: value });
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Дополнительные фильтры
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Уточните параметры для более точного поиска
        </p>
      </div>

      {/* Объем */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">📚 Объем</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {volumeOptions.map((volume) => (
            <button
              key={volume.id}
              onClick={() => handleSingleSelect('bookLength', volume.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.bookLength === volume.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{volume.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Темп повествования */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🎭 Темп повествования</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {paceOptions.map((pace) => (
            <button
              key={pace.id}
              onClick={() => handleSingleSelect('narrativePace', pace.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.narrativePace === pace.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{pace.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Эмоциональная насыщенность */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">💫 Эмоциональная насыщенность</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emotionalOptions.map((emotional) => (
            <button
              key={emotional.id}
              onClick={() => handleSingleSelect('emotionalIntensity', emotional.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.emotionalIntensity === emotional.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{emotional.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Особенности */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">
          🌟 Особенности {request.specialFeatures && <span className="text-primary">({request.specialFeatures.length})</span>}
        </h4>
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((feature) => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                request.specialFeatures?.includes(feature)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {/* Регион */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🌍 Регион и культура</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {regionOptions.map((region) => (
            <button
              key={region.id}
              onClick={() => handleSingleSelect('authorRegion', region.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.authorRegion === region.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{region.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Время написания */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">📅 Время написания</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {periodOptions.map((period) => (
            <button
              key={period.id}
              onClick={() => handleSingleSelect('publicationPeriod', period.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.publicationPeriod === period.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{period.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Возрастная аудитория */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">👥 Возрастная аудитория</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {audienceOptions.map((audience) => (
            <button
              key={audience.id}
              onClick={() => handleSingleSelect('targetAudience', audience.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.targetAudience === audience.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{audience.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Известность */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">✨ Известность произведения</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popularityOptions.map((popularity) => (
            <button
              key={popularity.id}
              onClick={() => handleSingleSelect('popularityLevel', popularity.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.popularityLevel === popularity.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{popularity.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
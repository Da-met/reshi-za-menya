'use client';
import React from 'react';
import { COUNTRY_OPTIONS, DURATION_OPTIONS, FORMAT_OPTIONS, RATING_OPTIONS, YEAR_OPTIONS } from '@/constants/movies.constants';
import { MovieRequest } from '@/types/movies';

interface FiltersSectionProps {
  request: MovieRequest;
  onChange: (updates: Partial<MovieRequest>) => void;
}


export function FiltersSectionComponent({ request, onChange }: FiltersSectionProps) {
  const toggleFormat = (format: string) => {
    const currentFormats = request.format || [];
    const newFormats = currentFormats.includes(format)
      ? currentFormats.filter(f => f !== format)
      : [...currentFormats, format];
    
    onChange({ format: newFormats });
  };

  const handleSingleSelect = (field: keyof MovieRequest, value: string) => {
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
      
      {/* Формат */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">📺 Формат</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FORMAT_OPTIONS.map((format) => (
            <button
              key={format.id}
              onClick={() => toggleFormat(format.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.format?.includes(format.id)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{format.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Длительность */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">⏱️ Длительность</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DURATION_OPTIONS.map((duration) => (
            <button
              key={duration.id}
              onClick={() => handleSingleSelect('duration', duration.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.duration === duration.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{duration.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Год выхода */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">📅 Год выхода</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {YEAR_OPTIONS.map((year) => (
            <button
              key={year.id}
              onClick={() => handleSingleSelect('year', year.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.year === year.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{year.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Страна */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🌍 Страна</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {COUNTRY_OPTIONS.map((country) => (
            <button
              key={country.id}
              onClick={() => handleSingleSelect('country', country.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.country === country.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{country.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Рейтинг */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">⭐ Рейтинг Кинопоиск/IMDb</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {RATING_OPTIONS.map((rating) => (
            <button
              key={rating.id}
              onClick={() => handleSingleSelect('rating', rating.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                request.rating === rating.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              <div className="text-sm font-medium">{rating.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


export const FiltersSection = React.memo(FiltersSectionComponent);
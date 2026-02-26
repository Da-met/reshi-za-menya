'use client';

import React from 'react';
import { SkincareRequest } from '@/types/skincare';
import { CONCERNS } from '@/constants/skincare.constants';

interface ConcernsSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}

function ConcernsSectionComponent({ request, onChange }: ConcernsSectionProps) {
  // Выбранные проблемы (гарантируем что это массив)
  const currentConcerns = request.concerns || [];

  const toggleConcern = (concernId: string) => {
    // Если пытаемся убрать последнюю проблему - не позволяем
    if (currentConcerns.includes(concernId) && currentConcerns.length <= 1) {
      // Можно показать сообщение
      alert('Должна быть выбрана хотя бы одна проблема кожи!');
      return;
    }

    const newConcerns = currentConcerns.includes(concernId)
      ? currentConcerns.filter(id => id !== concernId)
      : [...currentConcerns, concernId];
    onChange({ concerns: newConcerns });
  };

  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какие проблемы кожи вас беспокоят?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите хотя бы одну проблему (обязательно)
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {CONCERNS.map((concern) => {
          const isSelected = currentConcerns.includes(concern.id);
          const isLastSelected = isSelected && currentConcerns.length === 1;

          return (
            <button
              key={concern.id}
              onClick={() => toggleConcern(concern.id)}
              className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground shadow-md'
                  : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
              } ${isLastSelected ? 'cursor-not-allowed opacity-100' : 'cursor-pointer'}`}
              disabled={isLastSelected}
              title={isLastSelected ? "Нельзя убрать последнюю проблему" : ""}
            >
              <span className="text-xl md:text-2xl">{concern.emoji}</span>
              <span className="font-medium text-xs md:text-sm text-center">{concern.label}</span>
            </button>
          );
        })}
      </div>

      {currentConcerns.length > 0 && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано проблем: {currentConcerns.length}
            {currentConcerns.length === 1 && " (минимум)"}
          </p>
        </div>
      )}

      {/* Предложение популярных проблем */}
      {currentConcerns.length === 0 && (
        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            💡 Не знаете с чего начать? Попробуйте эти популярные проблемы:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({ concerns: ['dullness'] })}
              className="px-3 py-1 bg-card border border-border rounded-lg text-sm hover:border-primary transition-colors"
            >
              Тусклый цвет лица
            </button>
            <button
              onClick={() => onChange({ concerns: ['dryness'] })}
              className="px-3 py-1 bg-card border border-border rounded-lg text-sm hover:border-primary transition-colors"
            >
              Сухость
            </button>
            <button
              onClick={() => onChange({ concerns: ['pores'] })}
              className="px-3 py-1 bg-card border border-border rounded-lg text-sm hover:border-primary transition-colors"
            >
              Расширенные поры
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const ConcernsSection = React.memo(ConcernsSectionComponent);
'use client';

import React from 'react';
import { SkincareRequest } from '@/types/skincare';
import { SKIN_TYPES } from '@/constants/skincare.constants';

interface SkinTypeSectionProps {
  request: SkincareRequest;
  onChange: (updates: Partial<SkincareRequest>) => void;
}


function SkinTypeSectionComponent({ request, onChange }: SkinTypeSectionProps) {
  return (
    <div>
      <h3 className="text-xl md:text-2xl lg:text-3xl font-accent mb-3 md:mb-4 text-foreground">
        Какой у вас тип кожи?
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Выберите тип кожи для персонализированных рекомендаций
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
        {SKIN_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange({ skin_type: type.id })}
            className={`p-3 md:p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center space-y-1 md:space-y-2 ${
              request.skin_type === type.id
                ? 'border-primary bg-primary/95 text-primary-foreground shadow-xl scale-[1.02] font-black' // ← МАКСИМАЛЬНЫЙ КОНТРАСТ
                : 'bg-card border-border text-foreground hover:border-primary/70 hover:shadow-lg hover:scale-[1.01]' // ← УСИЛЕННЫЙ HOVER
            }`}
          >
            <span className="text-xl md:text-2xl">{type.emoji}</span>
            <span className="font-medium text-xs md:text-sm text-center">{type.label}</span>
            <span className="text-xs text-muted-foreground text-center hidden sm:block">{type.description}</span>
          </button>
        ))}
      </div>

      {request.skin_type && (
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-accent rounded-lg">
          <p className="text-xs md:text-sm text-accent-foreground">
            ✅ Выбрано: {SKIN_TYPES.find(t => t.id === request.skin_type)?.label}
          </p>
        </div>
      )}
    </div>
  );
}

export const SkinTypeSection = React.memo(SkinTypeSectionComponent);
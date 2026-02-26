// src/components/analyzer/AnalyzerResult.tsx

'use client';

import React from 'react';
import { AnalysisResponse } from '@/types/analyzer';
import { useState } from 'react';
import { RotateCw, Sparkles, Heart, Share2 } from 'lucide-react';
import { AnalyzerProductCard } from './AnalyzerProductCard';

interface AnalyzerResultProps {
  result: AnalysisResponse;
  onSave: () => void;
  onAnalyzeAnother: () => void;
}

export function AnalyzerResultComponent({ result, onSave, onAnalyzeAnother }: AnalyzerResultProps) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  return (
    <div className="space-y-6 md:space-y-8 mt-8">
      {/* Заголовок */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Sparkles size={20} className="text-primary" />
          <h2 className="text-xl md:text-2xl lg:text-3xl font-accent text-foreground">
            МЫ ПРОАНАЛИЗИРОВАЛИ СОСТАВ!
          </h2>
          <Sparkles size={20} className="text-secondary" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
          Вот что мы обнаружили в средстве
        </p>
      </div>

      {/* Карточка товара - используем новый компонент */}
      <AnalyzerProductCard 
        product={result.product}
        showPurchaseButtons={true}
      />

      {/* Кнопки действий */}
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col xs:flex-row gap-3 flex-1">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors flex-1 min-w-0 ${
                saved
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {saved ? '✓' : <Heart size={18} className="flex-shrink-0" />}
              <span className="font-semibold text-xs md:text-sm sm:text-base truncate">
                {saved ? 'Сохранено!' : 'Сохранить анализ'}
              </span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex-1 min-w-0">
              <Share2 size={18} className="flex-shrink-0" />
              <span className="text-xs md:text-sm sm:text-base truncate">Поделиться</span>
            </button>
          </div>

          <button
            onClick={onAnalyzeAnother}
            className="flex items-center justify-center gap-2 py-3 px-4 border border-border text-foreground rounded-xl font-semibold hover:bg-accent transition-colors min-w-0"
          >
            <RotateCw size={18} className="flex-shrink-0" />
            <span className="text-xs md:text-sm sm:text-base truncate">Другой продукт</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const AnalyzerResult = React.memo(AnalyzerResultComponent);
AnalyzerResult.displayName = 'AnalyzerResult';
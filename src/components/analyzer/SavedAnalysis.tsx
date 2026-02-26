// src/components/analyzer/SavedAnalysis.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2, Clock, MoreVertical } from 'lucide-react';
import type { SavedAnalysis as SavedAnalysisType } from '@/types/analyzer';
import { EmptyState, PromotionalBanner } from '../ui/shared';
import { ANALYZER_BANNER } from '@/constants/analyzer.constants';

// Исправленные мок-данные - только productName!
const mockSavedAnalysis: SavedAnalysisType[] = [
  {
    id: '1',
    giftData: {
      id: '1',
      name: 'La Roche-Posay Effaclar H',
      brand: 'La Roche-Posay',
      description: 'Увлажняющий крем для проблемной кожи',
      category: 'Крем',
      ingredients: [],
      safetyScore: 8.5,
      skinTypeCompatibility: {},
      warnings: [],
      recommendations: []
    },
    requestData: {
      productName: 'La Roche-Posay Effaclar H'  // ← ТОЛЬКО productName!
    },
    createdAt: new Date('2024-01-15'),
    userComment: 'Отлично подошел для проблемной кожи'
  },
  {
    id: '2',
    giftData: {
      id: '2',
      name: 'Cerave Увлажняющий крем',
      brand: 'Cerave',
      description: 'Базовый увлажняющий крем для лица',
      category: 'Крем',
      ingredients: [],
      safetyScore: 9.2,
      skinTypeCompatibility: {},
      warnings: [],
      recommendations: []
    },
    requestData: {
      productName: 'Cerave Увлажняющий крем'  // ← ТОЛЬКО productName!
    },
    createdAt: new Date('2024-01-10')
  }
];

export function SavedAnalysis() {
  const router = useRouter();
  const [savedAnalysis, setSavedAnalysis] = useState<SavedAnalysisType[]>(mockSavedAnalysis);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    console.log('Удаление анализа:', id);
    setSavedAnalysis(prev => prev.filter(item => item.id !== id));
    setActiveDropdown(null);
  };

  const handleOpenAnalysis = (id: string) => {
    router.push(`/analyzer/saved/${id}`);
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  if (savedAnalysis.length === 0) {
    return (
      <div>
        <PromotionalBanner
          title={ANALYZER_BANNER.title}
          description={ANALYZER_BANNER.description}
          route={ANALYZER_BANNER.route}
          emoji={ANALYZER_BANNER.emoji}
        />

        <EmptyState
          icon="🧴"
          title="Нет сохраненных анализов"
          description="Сохраняйте результаты анализов, чтобы вернуться к ним позже"
          variant="compact"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <PromotionalBanner
          title={ANALYZER_BANNER.title}
          description={ANALYZER_BANNER.description}
          route={ANALYZER_BANNER.route}
          emoji={ANALYZER_BANNER.emoji}
        />
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-muted-foreground">
            {savedAnalysis.length} сохранен{savedAnalysis.length === 1 ? 'ый' : 'ых'} анализ{savedAnalysis.length === 1 ? '' : 'ов'}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {savedAnalysis.map((analysis) => {
          const isDropdownOpen = activeDropdown === analysis.id;
          const safetyColor = analysis.giftData.safetyScore >= 8 ? 'text-green-500' :
            analysis.giftData.safetyScore >= 6 ? 'text-blue-500' :
            analysis.giftData.safetyScore >= 4 ? 'text-yellow-500' : 'text-red-500';

          return (
            <div
              key={analysis.id}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm cursor-pointer"
              onClick={() => handleOpenAnalysis(analysis.id)}
            >
              <div className="p-6">
                {/* Заголовок и меню */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl text-foreground leading-tight break-words group-hover:text-primary transition-colors">
                      {analysis.giftData.name}
                    </h3>
                    
                    {/* Бренд и оценка */}
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {analysis.giftData.brand}
                      </span>
                      <div className={`px-3 py-1 rounded-full ${safetyColor} bg-opacity-20`}>
                        <span className="font-bold">{analysis.giftData.safetyScore.toFixed(1)}</span>
                        <span className="text-sm ml-1">/10</span>
                      </div>
                    </div>
                  </div>

                  {/* Выпадающее меню */}
                  <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(analysis.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(analysis.id);
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Описание */}
                <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                  {analysis.giftData.description}
                </p>

                {/* УБИРАЕМ блок с параметрами анализа (skinType, skinConcerns) - их больше нет */}

                {/* Комментарий */}
                {analysis.userComment && (
                  <div className="mb-4 p-3 bg-accent/20 border border-accent/30 rounded-lg">
                    <p className="text-sm text-foreground break-words">{analysis.userComment}</p>
                  </div>
                )}

                {/* Дата */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>Сохранено {analysis.createdAt.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
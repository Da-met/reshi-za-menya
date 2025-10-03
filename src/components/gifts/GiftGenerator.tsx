'use client';

import { useState, useEffect } from 'react';
import { GiftRequest, GiftResponse } from '@/types/gifts';
import { CategorySection } from './sections/CategorySection';
import { CharacteristicsSection } from './sections/CharacteristicsSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { SeasonalBanner } from './SeasonalBanner';
import { User, FileText, Settings } from 'lucide-react'; 

interface GiftGeneratorProps {
    onGiftGenerated?: (gift: GiftResponse) => void;
    isGenerating?: boolean;
    onGeneratingChange?: (generating: boolean) => void;
    onRequestChange?: (request: GiftRequest) => void;
    currentRequest?: GiftRequest;
    onClearGift?: () => void;
  }

export function GiftGenerator({ 
  onGiftGenerated, 
  isGenerating = false, 
  onGeneratingChange,
  onRequestChange,
  currentRequest = {},
  onClearGift
}: GiftGeneratorProps) {
  const [giftRequest, setGiftRequest] = useState<GiftRequest>(currentRequest);
  const [activeSection, setActiveSection] = useState<'category' | 'characteristics' | 'filters'>('category');

  // Синхронизируем с родительским состоянием
  useEffect(() => {
    onRequestChange?.(giftRequest);
  }, [giftRequest, onRequestChange]);

  // Валидация формы
  const isFormValid = () => {
    const hasCategory = !!giftRequest.category;
    const hasCharacteristics = 
      (giftRequest.profession?.length || 0) + 
      (giftRequest.interests?.length || 0) + 
      (giftRequest.personality?.length || 0) >= 2;
    
    return hasCategory && hasCharacteristics;
  };

  const handleGenerate = async () => {
    if (!isFormValid() || isGenerating) return;
    onClearGift?.();
    onGeneratingChange?.(true);
    console.log('Генерируем подарок с параметрами:', giftRequest);
    
    // Временная заглушка
    setTimeout(() => {
      const mockGift: GiftResponse = {
        gift: {
          id: '1',
          title: 'Энциклопедия садовода',
          description: 'Красивая книга о садоводстве с практическими советами и иллюстрациями',
          type: 'thing',
          price_range: '1000-3000₽',
          examples: ['Книга "Секреты успешного садовода"', 'Набор качественных садовых инструментов'],
          reasoning: 'Идеально подходит для учителя, который увлекается садоводством - сочетает практическую пользу с эстетическим удовольствием'
        },
        generationId: '123'
      };
      
      onGiftGenerated?.(mockGift);
      onGeneratingChange?.(false);
    }, 2000);
  };

  const handleRequestChange = (updates: Partial<GiftRequest>) => {
    setGiftRequest(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      {/* Сезонный баннер */}
      <SeasonalBanner />
      
      {/* Блок выбранных опций */}
      <SelectedOptions request={giftRequest} />
      
      {/* Основной генератор */}
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация по секциям */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
        {[
            { id: 'category' as const, label: 'Кому дарим', icon: <User size={16} /> },
            { id: 'characteristics' as const, label: 'О человеке', icon: <FileText size={16} /> },
            { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
        ].map((section) => (
            <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all flex-1 justify-center text-sm sm:text-base ${
                activeSection === section.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            >
            {section.icon}
            <span className="font-medium">{section.label}</span>
            </button>
        ))}
        </div>

        {/* Секции формы */}
        <div className="mb-6 min-h-[300px]">
          {activeSection === 'category' && (
            <CategorySection
              request={giftRequest}
              onChange={handleRequestChange}
            />
          )}
          
          {activeSection === 'characteristics' && (
            <CharacteristicsSection
              request={giftRequest}
              onChange={handleRequestChange}
            />
          )}
          
          {activeSection === 'filters' && (
            <FiltersSection
              request={giftRequest}
              onChange={handleRequestChange}
            />
          )}
        </div>

        {/* Кнопка генерации */}
        <div className="text-center">
        <button
            onClick={handleGenerate}
            disabled={!isFormValid() || isGenerating}
            className={`
                w-full sm:w-auto
                px-6 py-3 md:px-8 md:py-4 
                rounded-xl md:rounded-2xl 
                font-bold 
                text-base md:text-lg
                transition-all duration-300 transform
                ${isFormValid() && !isGenerating
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
                ${isGenerating ? 'opacity-70' : ''}
            `}
            >
            {isGenerating ? (
                <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Ищем идеи...</span>
                </div>
            ) : (
                '🎁 РЕШИТЬ ЗА МЕНЯ!'
            )}
        </button>
          
          {!isFormValid() && (
            <p className="text-sm text-muted-foreground mt-3">
              Выберите кому ищем подарок и добавьте минимум 2 характеристики
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
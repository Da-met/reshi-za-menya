'use client';

import { useState, useEffect } from 'react';
import { SkincareRequest, SkincareResponse } from '@/types/skincare';
import { SkinTypeSection } from './sections/SkinTypeSection';
import { ConcernsSection } from './sections/ConcernsSection';
import { ProductTypeSection } from './sections/ProductTypeSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { Droplets, AlertCircle, Filter, Settings } from 'lucide-react';



interface SkincareSelectorProps {
  onProductsGenerated?: (response: SkincareResponse) => void;
  isGenerating?: boolean;
  onGeneratingChange?: (generating: boolean) => void;
  onRequestChange?: (request: SkincareRequest) => void;
  currentRequest?: SkincareRequest;
  onClearProducts?: () => void;
}

export function SkincareSelector({ 
  onProductsGenerated, 
  isGenerating = false, 
  onGeneratingChange,
  onRequestChange,
  currentRequest = {},
  onClearProducts
}: SkincareSelectorProps) {
  const [skincareRequest, setSkincareRequest] = useState<SkincareRequest>({
    skin_type: 'normal',
    product_type: 'moisturizer',
    ...currentRequest
  });
  const [activeSection, setActiveSection] = useState<'skinType' | 'concerns' | 'productType' | 'filters'>('skinType');

  useEffect(() => {
    onRequestChange?.(skincareRequest);
  }, [skincareRequest, onRequestChange]);

  const isFormValid = () => {
    return !!skincareRequest.skin_type && !!skincareRequest.product_type;
  };

  const handleGenerate = async () => {
    if (!isFormValid() || isGenerating) return;
    onClearProducts?.();
    onGeneratingChange?.(true);
    
    console.log('Генерируем подборку с параметрами:', skincareRequest);

    try {
      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateName: "skincare_recommendation",
          category: "Skincare",
          parameters: skincareRequest
        })
      });

      if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

      const apiResponse = await response.json();
      const skincareData: SkincareResponse = {
        products: apiResponse.jsonStructuredResponse.products || [],
        recommendations: apiResponse.jsonStructuredResponse.recommendations || '',
        generationId: Date.now().toString()
      };

      onProductsGenerated?.(skincareData);
      
    } catch (error) {
      console.error('Ошибка генерации подборки:', error);
      alert('Произошла ошибка при подборе средств. Попробуйте еще раз.');
    } finally {
      onGeneratingChange?.(false);
    }
  };

  const handleRequestChange = (updates: Partial<SkincareRequest>) => {
    setSkincareRequest(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <SelectedOptions request={skincareRequest} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {[
            { id: 'skinType' as const, label: 'Тип кожи', icon: <Droplets size={16} /> },
            { id: 'concerns' as const, label: 'Проблемы', icon: <AlertCircle size={16} /> },
            { id: 'productType' as const, label: 'Средство', icon: <Filter size={16} /> },
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

        <div className="mb-6 min-h-[300px]">
          {activeSection === 'skinType' && (
            <SkinTypeSection request={skincareRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'concerns' && (
            <ConcernsSection request={skincareRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'productType' && (
            <ProductTypeSection request={skincareRequest} onChange={handleRequestChange} />
          )}
          {activeSection === 'filters' && (
            <FiltersSection request={skincareRequest} onChange={handleRequestChange} />
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={!isFormValid() || isGenerating}
            className={`
              w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform
              ${isFormValid() && !isGenerating
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              } ${isGenerating ? 'opacity-70' : ''}
            `}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Подбираем средства...</span>
              </div>
            ) : (
              '✨ ПОДОБРАТЬ СРЕДСТВА'
            )}
          </button>
          
          {!isFormValid() && (
            <p className="text-sm text-muted-foreground mt-3">
              Выберите тип кожи и вид средства для подбора
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
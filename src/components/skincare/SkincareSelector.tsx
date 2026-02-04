'use client';
import React from 'react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { SkincareRequest, SkincareResponse } from '@/types/skincare';
import { SkinTypeSection } from './sections/SkinTypeSection';
import { ConcernsSection } from './sections/ConcernsSection';
import { ProductTypeSection } from './sections/ProductTypeSection';
import { FiltersSection } from './sections/FiltersSection';
import { SelectedOptions } from './SelectedOptions';
import { Droplets, AlertCircle, Filter, Settings } from 'lucide-react';
import { SkincareResult } from './SkincareResults';
import { UniversalLoader } from '@/components/ui/UniversalLoader';
import { useLoadingState } from '@/hooks/useLoadingState';


const MemoizedSkincareResult = React.memo(SkincareResult);
const MemoizedSelectedOptions = React.memo(SelectedOptions);

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
  // Состояние запроса
  const [skincareRequest, setSkincareRequest] = useState<SkincareRequest>({
    skin_type: 'normal',
    concerns: ['dullness'],
    ...currentRequest
  });
  
  // Состояние для результатов
  const [result, setResult] = useState<SkincareResponse | null>(null);
  const [alreadySuggested, setAlreadySuggested] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<'skinType' | 'concerns' | 'productType' | 'filters'>('skinType');
  
  // Refs
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  
  // Хук для загрузки
  const { 
    isLoading: isUniversalLoading, 

    startLoading, 
    stopLoading 
  } = useLoadingState({
    defaultMessage: 'Подбираем средства по вашим параметрам...',
    showSuccess: false
  });
  
  // Проверка формы
  const isFormValid = useMemo(() => {
    return !!skincareRequest.skin_type && 
           !!(skincareRequest.concerns && skincareRequest.concerns.length > 0);
  }, [skincareRequest.skin_type, skincareRequest.concerns]);
  
  // Скролл к результатам
  const scrollToResults = useCallback(() => {
    if (!resultsContainerRef.current || !result) return;
      
    setTimeout(() => {
      resultsContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block:  'start',
      });
      console.log('📜 Скролл к результатам выполнен');
    }, 100);
  }, [result]);
  
  // Эффект для скролла при появлении результата
  useEffect(() => {
    if (result) {
      scrollToResults();
    }
  }, [result, scrollToResults]);
  
  // Уведомление родителя
  useEffect(() => {
    onRequestChange?.(skincareRequest);
  }, [skincareRequest, onRequestChange]);
  
  // Основная функция генерации
  const handleGenerate = useCallback(async (excludeTitle?: string) => {
    if (!isFormValid || isGenerating) return;
    
    console.log('🚀 Начинаем генерацию...');
    
    // Сбрасываем предыдущий результат
    setResult(null);
    onClearProducts?.();
    
    // Запускаем лоадер
    startLoading(
      excludeTitle 
        ? 'Ищем альтернативный вариант...' 
        : 'Подбираем средства по вашим параметрам...'
    );
    
    // Добавляем в исключения если нужно
    if (excludeTitle && !alreadySuggested.includes(excludeTitle)) {
      setAlreadySuggested(prev => [...prev, excludeTitle]);
    }
    
    onGeneratingChange?.(true);
    
    try {
      // API запрос
      const response = await fetch('/api/prompt-templates/generate-structured', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          templateName: "skincare_recommendation",
          category: "SkincareRecommendation",
          parameters: {
            ...skincareRequest,
            exclude_titles: alreadySuggested
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      
      const apiResponse = await response.json();
      const jsonResponse = apiResponse.jsonStructuredResponse;
      
      // Функция для преобразования строк в массивы
      const fixIfString = (field: unknown): string[] => {
        if (Array.isArray(field)) return field;
        if (typeof field === 'string') {
          return field.split(',').map(s => s.trim()).filter(s => s.length > 0);
        }
        return [];
      };
      
      // Создаем продукт
      const product = {
        ...jsonResponse,
        id: `product_${Date.now()}`,
        name: jsonResponse.name || 'Средство',
        brand: jsonResponse.brand || 'Бренд',
        description: jsonResponse.description || '',
        price: jsonResponse.price || '',
        price_range: jsonResponse.price_range || jsonResponse.price || '',
        recommended_product_type: jsonResponse.recommended_product_type || skincareRequest.desired_product_type || '',
        key_ingredients: fixIfString(jsonResponse.key_ingredients),
        features: fixIfString(jsonResponse.features),
        reasons: fixIfString(jsonResponse.reasons),
        reasoning: jsonResponse.reasoning || '',
        purchaseLink: jsonResponse.purchaseLink || '',
        where_to_buy: Array.isArray(jsonResponse.where_to_buy) ? jsonResponse.where_to_buy : [],
        tags: fixIfString(jsonResponse.tags),
        rating: jsonResponse.rating,
        size: jsonResponse.size || '',
        image_search_query: jsonResponse.image_search_query || ''
      };
      
      // Добавляем в исключения
      if (product.name && !alreadySuggested.includes(product.name)) {
        setAlreadySuggested(prev => [...prev, product.name]);
      }
      
      // Формируем результат
      const skincareData: SkincareResponse = {
        products: [product],
        recommendations: jsonResponse.reasoning || 'Рекомендации для вашего типа кожи',
        generationId: apiResponse.generationId || Date.now().toString()
      };
      
      console.log('✅ Результат получен, устанавливаем в состояние');
      
      // Сохраняем результат
      setResult(skincareData);
      
      // Уведомляем родителя
      onProductsGenerated?.(skincareData);
      stopLoading();
      
    } catch (error) {
      console.error('❌ Ошибка генерации:', error);
      stopLoading(false);
      alert('Ошибка при генерации. Попробуйте изменить параметры.');
    } finally {
      onGeneratingChange?.(false);
    }
  }, [
    isFormValid, 
    isGenerating, 
    skincareRequest, 
    alreadySuggested, 
    onGeneratingChange, 
    onClearProducts, 
    onProductsGenerated,
    startLoading,    
    stopLoading
  ]);
  
  // Обработчик изменения запроса
  const handleRequestChange = useCallback((updates: Partial<SkincareRequest>) => {
    console.log('🔄 Изменение запроса:', updates);
    setSkincareRequest(prev => ({ ...prev, ...updates }));
    onRequestChange?.({ ...skincareRequest, ...updates });
  }, [skincareRequest, onRequestChange]);
  
  // Секции
  const sections = useMemo(() => [
    { id: 'skinType' as const, label: 'Тип кожи', icon: <Droplets size={16} /> },
    { id: 'concerns' as const, label: 'Проблемы', icon: <AlertCircle size={16} /> },
    { id: 'productType' as const, label: 'Средство', icon: <Filter size={16} /> },
    { id: 'filters' as const, label: 'Фильтры', icon: <Settings size={16} /> }
  ], []);
  
  
  // Вместо этого добавьте useEffect для логирования только при изменениях:
  useEffect(() => {
    console.log('🎯 Результат изменился:', !!result);
  }, [result]);
  
  useEffect(() => {
    console.log('🔄 Состояние загрузки:', isUniversalLoading);
  }, [isUniversalLoading]);
  

  const loaderContainerRef = useRef<HTMLDivElement>(null);
  // Эффект для скролла при начале загрузки
  useEffect(() => {
    if (isUniversalLoading && loaderContainerRef.current) {
      console.log('🔄 Загрузка началась, скроллим к лоадеру');
      setTimeout(() => {
        loaderContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }
  }, [isUniversalLoading]);


  return (
    <div className="space-y-6">
      <MemoizedSelectedOptions request={skincareRequest} />
      
      <div className="bg-card rounded-2xl shadow-lg p-6">
        {/* Навигация */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 mb-6 md:mb-8 p-2 sm:p-1 bg-muted rounded-xl">
          {sections.map((section) => (
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
        
        {/* Активная секция */}
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
        
        {/* Кнопка */}
        <div className="text-center">
          <button
            onClick={() => handleGenerate()}
            disabled={!isFormValid || isGenerating}
            className={`
              w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform
              ${isFormValid && !isGenerating
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
              } ${isGenerating ? 'opacity-70' : ''}
            `}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Подбираем средство...</span>
              </div>
            ) : (
              '✨ ПОДОБРАТЬ СРЕДСТВО'
            )}
          </button>
          
          {!isFormValid && (
            <p className="text-sm text-muted-foreground mt-3">
              Выберите тип кожи и проблемы кожи для подбора
            </p>
          )}
        </div>
      </div>
      
      {/* Лоадер */}
      <div ref={loaderContainerRef}>
        <UniversalLoader
          isVisible={isUniversalLoading}
          title="Подбираем уходовые средства"
          message="Анализируем ваш тип кожи и потребности..."
        />
      </div>
      
      {/* Результаты */}
      <div ref={resultsContainerRef} className="scroll-mt-24">
        {result && !isUniversalLoading && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-5 duration-400">
            <MemoizedSkincareResult
              response={result}
              onGenerateAnother={(excludeTitle) => {
                console.log('🔄 Запрос другого варианта');
                handleGenerate(excludeTitle);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
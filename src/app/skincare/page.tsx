'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SkincareSelector } from '@/components/skincare/SkincareSelector';
import { SkincareResponse, SkincareRequest } from '@/types/skincare';
import SavedSkincare from '@/components/skincare/SavedSkincare';

function SkincareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<'selector' | 'saved'>('selector');
  const [currentRequest, setCurrentRequest] = useState<SkincareRequest>({});
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Результаты теперь хранятся в SkincareSelector
  
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'saved') {
      setCurrentView('saved');
    }
  }, [searchParams]);

  const handleViewChange = (view: 'selector' | 'saved') => {
    setCurrentView(view);
    const newParams = new URLSearchParams(searchParams.toString());
    if (view === 'saved') {
      newParams.set('view', 'saved');
    } else {
      newParams.delete('view');
    }
    router.replace(`/skincare?${newParams.toString()}`, { scroll: false });
  };

  const handleProductsGenerated = (response: SkincareResponse) => {
    // Можно логировать или обрабатывать, но отображение теперь в SkincareSelector
    console.log('Сгенерированы средства:', response);
  };

  const handleClearProducts = () => {
    // Очистка происходит в SkincareSelector
  };

  const handleRequestChange = (request: SkincareRequest) => {
    setCurrentRequest(request);
  };

  // const handleSaveProducts = () => {
  //   console.log('Сохранение подборки');
  //   // Здесь будет логика сохранения
  // };

  

  return (
    <div className="min-h-screen bg-background py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Заголовок и навигация */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-accent text-foreground mb-3 md:mb-4">
            Подбор уходовых средств
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Персональные рекомендации косметики по типу кожи и потребностям
          </p>
          
          {/* Переключение между вкладками */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => handleViewChange('selector')}
              className={`px-5 py-3 md:px-6 md:py-3 rounded-full font-medium transition-all text-sm md:text-base cursor-pointer ${
                currentView === 'selector'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              💄 Подбор средств
            </button>
            <button
              onClick={() => handleViewChange('saved')}
              className={`px-5 py-3 md:px-6 md:py-3 rounded-full font-medium transition-all text-sm md:text-base cursor-pointer ${
                currentView === 'saved'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              💾 Мои средства
            </button>
          </div>
        </div>
        
        {currentView === 'selector' ? (
          // ВСЯ логика генерации теперь в SkincareSelector
          <SkincareSelector
            key="skincare-selector"
            onProductsGenerated={handleProductsGenerated}
            isGenerating={isGenerating}
            onGeneratingChange={setIsGenerating}
            onRequestChange={handleRequestChange}
            currentRequest={currentRequest}
            onClearProducts={handleClearProducts}
          />
        ) : (
          // SavedSkincare компонент
          <SavedSkincare />
        )}
      </div>
    </div>
  );
}

export default function SkincarePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    }>
      <SkincareContent />
    </Suspense>
  );
}
'use client';

import { Suspense, useState, useEffect, lazy } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SkincareResponse, SkincareRequest } from '@/types/skincare';



// Ленивая загрузка тяжелых компонентов
const SkincareSelector = lazy(() => 
  import('@/components/skincare/SkincareSelector').then(mod => ({ 
    default: mod.SkincareSelector 
  }))
);

const SavedSkincare = lazy(() => 
  import('@/components/skincare/SavedSkincare').then(mod => ({ 
    default: mod.default 
  }))
);

// Компонент загрузки
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Загрузка модуля ухода за кожей...</p>
      </div>
    </div>
  );
}

function SkincareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentView, setCurrentView] = useState<'selector' | 'saved'>('selector');
  const [currentRequest, setCurrentRequest] = useState<SkincareRequest>({});

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
    console.log('Сгенерированы средства:', response);
  };

  const handleRequestChange = (request: SkincareRequest) => {
    setCurrentRequest(request);
  };

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

        {/* Динамическая загрузка компонентов */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Загрузка...</p>
            </div>
          </div>
        }>
          {currentView === 'selector' ? (
            <SkincareSelector
              key="skincare-selector"
              onProductsGenerated={handleProductsGenerated}
              onRequestChange={handleRequestChange}
              currentRequest={currentRequest}
            />
          ) : (
            <SavedSkincare />
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default function SkincarePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SkincareContent />
    </Suspense>
  );
}
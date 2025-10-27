export default function Loading() {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            {/* Навигация */}
            <div className="h-4 bg-muted rounded w-24 mb-8"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Левая колонка */}
              <div className="lg:col-span-2 space-y-6">
                {/* Заголовок */}
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-24"></div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                
                {/* Кнопка чтения */}
                <div className="h-20 bg-muted rounded mb-6"></div>
                
                {/* Описание */}
                <div className="space-y-3 mb-6">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
                
                {/* Детали */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="h-16 bg-muted rounded"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </div>
                
                {/* Почему подходит */}
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
              
              {/* Правая колонка */}
              <div className="lg:col-span-1">
                <div className="h-64 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
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
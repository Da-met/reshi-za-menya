// /app/analyzer/saved/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-pulse">
          {/* Навигация */}
          <div className="h-4 bg-muted rounded w-24 mb-8"></div>
          
          <div className="space-y-8">
            {/* Заголовок */}
            <div className="h-8 bg-muted rounded w-3/4"></div>
            
            {/* Изображение */}
            <div className="h-64 bg-muted rounded-lg"></div>
            
            {/* Блоки информации */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
            
            {/* Ингредиенты */}
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
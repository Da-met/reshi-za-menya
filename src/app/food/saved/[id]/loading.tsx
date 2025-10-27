export default function Loading() {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            {/* Навигация */}
            <div className="h-4 bg-muted rounded w-24 mb-8"></div>
            
            <div className="space-y-8">
              {/* Основной блок с рецептом */}
              <div className="bg-card rounded-2xl p-6 md:p-8 space-y-6">
                {/* Заголовок и кнопки */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="h-8 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-muted rounded-lg"></div>
                    <div className="w-8 h-8 bg-muted rounded-lg"></div>
                    <div className="w-8 h-8 bg-muted rounded-lg"></div>
                  </div>
                </div>
  
                {/* Чипы */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="h-6 bg-muted rounded-full w-20"></div>
                  <div className="h-6 bg-muted rounded-full w-16"></div>
                  <div className="h-6 bg-muted rounded-full w-14"></div>
                </div>
  
                {/* Изображение */}
                <div className="w-full aspect-[4/3] bg-muted rounded-xl mb-6"></div>
  
                {/* Блок ингредиентов */}
                <div className="mb-6">
                  <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* У вас есть */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-5 bg-muted rounded w-1/3"></div>
                        <div className="h-5 bg-muted rounded w-8"></div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-12 bg-muted rounded-lg"></div>
                        ))}
                      </div>
                    </div>
  
                    {/* Нужно купить */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-5 bg-muted rounded w-1/3"></div>
                        <div className="h-5 bg-muted rounded w-8"></div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-12 bg-muted rounded-lg"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Кнопка покупки */}
                <div className="h-20 bg-muted rounded-xl mb-6"></div>
  
                {/* Шаги приготовления */}
                <div className="mb-6">
                  <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-full"></div>
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Советы */}
                <div>
                  <div className="h-6 bg-muted rounded w-1/4 mb-3"></div>
                  <div className="space-y-2">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-3">
                        <div className="w-2 h-2 bg-muted rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 space-y-1">
                          <div className="h-3 bg-muted rounded w-full"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Блок заметки */}
              <div className="bg-card rounded-2xl p-6 md:p-8">
                <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
                <div className="h-24 bg-muted rounded-lg"></div>
              </div>
  
              {/* Статус и дата */}
              <div className="bg-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
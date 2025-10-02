import { ModuleCard } from '@/components/modules/ModuleCard';

import { modulesConfig } from '@/config/modules';
import { Goal, Lightbulb, ShoppingCart } from 'lucide-react';

export default function Home() {
  // Только активные модули
  const activeModules = modulesConfig.filter(module => module.status === 'active');

  // Функция для определения цветовой схемы (чередование)
  const getColorScheme = (index: number) => {
    return index % 2 === 0 ? 'primary' : 'inverted';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Основной контент */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 pt-8">
        <header className="text-center mb-10 md:mb-12 lg:mb-16">
          {/* Затемнение чтобы заголовок лучше читался */}

          <h1 className="
            text-3xl md:text-4xl lg:text-5xl xl:text-6xl 
            font-bold 
            text-foreground
            mb-2 md:mb-4
          ">
            Реши за меня
          </h1>
          <p className="
            text-lg md:text-xl lg:text-2xl xl:text-3xl
            text-muted-foreground
            max-w-3xl 
            mx-auto
          ">
            Приложение, которое генерирует идеи и помогает с их реализацией
          </p>
        </header>

        {/* Активные модули */}
        <div className="mb-12 md:mb-16">
          <div className="
            grid 
            grid-cols-1 
            md:grid-cols-2
            gap-6 md:gap-8 lg:gap-10
            max-w-4xl 
            mx-auto
          ">
            {activeModules.map((module, index) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                href={module.href}
                moduleType={module.moduleType as any}
                icon={module.icon}
                colorScheme={getColorScheme(index)}
              />
            ))}
          </div>
          
          {/* Блок "В разработке" - широкий и низкий */}
          <div className="max-w-4xl mx-auto mt-10 md:mt-12">
            <div className="
              bg-transparent
              border-2 border-dashed border-section-development/30
              rounded-2xl
              p-6 md:p-8
              flex
              items-center
              justify-center
              min-h-[120px]  /* Высота меньше трети от обычной карточки */
              md:min-h-[140px]
            ">
              <div className="text-center text-section-development flex items-center space-x-4 md:space-x-6">
                <div className="text-center">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-1">
                    Разделы в разработке
                  </h3>
                  <p className="text-sm md:text-base opacity-80">
                    Мы активно работаем над новыми модулями. Следите за обновлениями!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Блок "Как это работает" */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="
            text-2xl md:text-3xl lg:text-4xl
            font-bold
            text-foreground
            mb-8 md:mb-12
          ">
            Как это работает?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-center mb-4">
                <Goal className="w-12 h-12" /> {/* Иконка */}
              </div>
              <h3 className="text-l md:text-xl font-semibold mb-2">Выберите раздел</h3>
              <p className="text-muted-foreground text-base md:text-base">
                Рецепты, подарки и многое другое
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-center mb-4">
                <Lightbulb className="w-12 h-12" /> {/* Иконка */}
              </div>
              <h3 className="text-l md:text-xl font-semibold mb-2">Получите идеи</h3>
              <p className="text-muted-foreground text-base md:text-base">
                Рекомендации на основе ваших предпочтений
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="w-12 h-12" /> {/* Иконка */}
              </div>
              <h3 className="text-l md:text-xl font-semibold mb-2">Реализуйте легко</h3>
              <p className="text-muted-foreground text-base md:text-base">
                От идеи до реализации - всё в одном приложении
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
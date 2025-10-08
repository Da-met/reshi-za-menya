import { ModuleCard } from '@/components/modules/ModuleCard';
import { modulesConfig } from '@/config/modules';
import { ModuleType } from '@/types';
import { Goal, Lightbulb, ShoppingCart } from 'lucide-react';

export default function Home() {
  const activeModules = modulesConfig.filter(module => module.status === 'active');

  // Функции для цветовых схем
  const getMobileColorScheme = (index: number) => {
    // Мобильные: 1-2-1-2
    return index % 2 === 0 ? 'primary' : 'inverted';
  };

  const getDesktopColorScheme = (index: number) => {
    // Десктоп: 1-2-2-1
    if (index % 4 === 0 || index % 4 === 3) {
      return 'primary';
    } else {
      return 'inverted';
    }
  };

  // Создаем разные порядки карточек
  const getModulesForView = () => {
    const desktopModules = [...activeModules]; // Оригинальный порядок
    const mobileModules = [...activeModules]; 
    
    // На мобильных меняем местами 3ю и 4ю карточки
    if (mobileModules.length >= 4) {
      [mobileModules[2], mobileModules[3]] = [mobileModules[3], mobileModules[2]];
    }
    
    return { desktopModules, mobileModules };
  };

  const { desktopModules, mobileModules } = getModulesForView();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="test-font-hachi"></div>
      <div className="test-font-stalinist"></div>
      
      {/* Основной контент */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 pt-8">
        <header className="text-center mb-10 md:mb-12 lg:mb-14">
          <h1 className="
            text-5xl md:text-6xl lg:text-6xl xl:text-[5rem]
            text-foreground
            mb-2 md:mb-3
          ">
            РЕШИ ЗА МЕНЯ
          </h1>
          <p className="
            text-lg md:text-l lg:text-xl xl:text-2xl
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
            {/* Мобильная версия с измененным порядком и схемой 1-2-1-2 */}
            {mobileModules.map((module, index) => (
              <div key={`mobile-${module.id}`} className="md:hidden">
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  href={module.href}
                  moduleType={module.moduleType as ModuleType}
                  icon={module.icon}
                  colorScheme={getMobileColorScheme(index)}
                />
              </div>
            ))}
            
            {/* Десктопная версия с оригинальным порядком и схемой 1-2-2-1 */}
            {desktopModules.map((module, index) => (
              <div key={`desktop-${module.id}`} className="hidden md:block">
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  href={module.href}
                  moduleType={module.moduleType as ModuleType}
                  icon={module.icon}
                  colorScheme={getDesktopColorScheme(index)}
                />
              </div>
            ))}
          </div>
          
          {/* Блок "В разработке" */}
          <div className="max-w-4xl mx-auto mt-10 md:mt-12">
            <div className="
              bg-transparent
              border-2 border-dashed border-section-development/30
              rounded-2xl
              p-6 
              flex
              items-center
              justify-center
              min-h-[100px]
              md:min-h-[140px]
            ">
              <div className="text-center text-section-development flex items-center space-x-4 md:space-x-6">
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl mb-1">
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
      <div className="container mx-auto px-4 sm:px-6 pb-8 md:pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="
            text-xl md:text-2xl lg:text-3xl
            text-foreground
            mb-6 md:mb-8
          ">
            Как это работает?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex justify-center mb-3">
                <Goal className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-xl mb-2">Выберите раздел</h3>
              <p className="text-muted-foreground text-sm md:text-s">
                Рецепты, подарки и многое другое
              </p>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex justify-center mb-3">
                <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-xl mb-2">Получите идеи</h3>
              <p className="text-muted-foreground text-sm md:text-s">
                Рекомендации на основе ваших предпочтений
              </p>
            </div>
            <div className="bg-card/50 p-4 rounded-lg border border-border">
              <div className="flex justify-center mb-3">
                <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h3 className="text-xl mb-2">Реализуйте легко</h3>
              <p className="text-muted-foreground text-sm md:text-s">
                От идеи до реализации - всё в одном приложении
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
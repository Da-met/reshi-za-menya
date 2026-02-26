// src/app/page.tsx
'use client';

import { ModuleCard } from '@/components/modules/ModuleCard';
import { moduleCategories } from '@/config/modules';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SwipeableTabs } from '@/components/home/SwipeableTabs';
import { Goal, Lightbulb, ShoppingCart } from 'lucide-react';
// import { useThemeStore } from '@/stores/theme-store';

export default function Home() {
  const [activeCategoryId, setActiveCategoryId] = useState('creative');
  
  // Только креативные и экспертные категории для свайпера
  const swipeCategories = moduleCategories.filter(cat => cat.id !== 'collections');
  const activeCategory = moduleCategories.find(cat => cat.id === activeCategoryId);
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

  // Создаем разные порядки карточек как в вашем оригинале
  const getModulesForView = () => {
    if (!activeCategory?.modules) return { mobileModules: [], desktopModules: [] };
    const desktopModules = [...activeCategory.modules];
    const mobileModules = [...activeCategory.modules]; 
    
    // На мобильных меняем местами 3ю и 4ю карточки (только для 4 элементов)
    if (mobileModules.length >= 4) {
      [mobileModules[2], mobileModules[3]] = [mobileModules[3], mobileModules[2]];
    }
    
    return { desktopModules, mobileModules };
  };

  const { desktopModules, mobileModules } = getModulesForView();


return (
  <div className="min-h-screen bg-background flex flex-col">
    {/* Заголовок */}
    <header className="text-center mb-10 md:mb-14 pt-8 px-4">
      <h1 className="text-5xl md:text-6xl lg:text-[5rem] text-foreground mb-2">
        РЕШИ ЗА МЕНЯ
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
        Приложение, которое генерирует идеи и помогает с их реализацией
      </p>
    </header>

    {/* Свайпабельные вкладки */}
    <div className="container mx-auto px-4 ">
      <SwipeableTabs
        categories={swipeCategories.map(cat => ({
          id: cat.id,
          title: cat.title,
          icon: cat.icon,
        }))}
        activeTab={activeCategoryId}
        onTabChange={setActiveCategoryId}
      />
    </div>

    {/* ВСЕ блоки в одном контейнере */}
    <div className="container mx-auto px-4 flex-1">
      {/* Контент активной категории */}
      {activeCategoryId !== 'collections' && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mb-12 md:mb-16"
          >
            {/* Мобильная версия */}
            <div className="md:hidden">
              <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
                {mobileModules.map((module, index) => (
                  <ModuleCard
                    key={`mobile-${module.id}`}
                    title={module.title}
                    description={module.description}
                    href={module.href}
                    icon={module.icon}
                    colorScheme={getMobileColorScheme(index)}
                    badge={module.isNew ? 'NEW' : undefined}
                    cardStatus="active"
                  />
                ))}
              </div>
            </div>
            
            {/* Десктопная версия */}
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
                {desktopModules.map((module, index) => (
                  <ModuleCard
                    key={`desktop-${module.id}`}
                    title={module.title}
                    description={module.description}
                    href={module.href}
                    icon={module.icon}
                    colorScheme={getDesktopColorScheme(index)}
                    badge={module.isNew ? 'NEW' : undefined}
                    cardStatus="active"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* "Готовые подборки" - ТАКОЙ ЖЕ ШИРИНЫ как главные модули */}
      <div className="max-w-md md:max-w-4xl mx-auto mb-12">
        <Link href="/collections" className="group block">
          <div className="
            rounded-xl
            border-2 border-section-development/50
            hover:bg-primary/10
            hover:border-primary/30
            transition-all
            duration-500
            cursor-pointer
            h-40
            flex
            items-center
            justify-between
            px-8
            group
            relative
            overflow-hidden
            w-full
          ">
            <div className="
              absolute
              inset-0
              bg-gradient-to-r from-primary/5 via-transparent to-transparent
              translate-x-[-100%]
              group-hover:translate-x-[100%]
              transition-transform
              duration-1000
            " />
            
            <div className="relative z-10">
              <h3 className="
                text-2xl md:text-4xl
                font-medium
                text-section-development
                mb-2
                transition-all
                duration-300
                group-hover:scale-105
                transform-gpu
              ">
                Готовые подборки
              </h3>
              
              <p className="
                text-sm md:text-m
                text-section-development
                font-bold
                transition-all
                duration-300
                group-hover:opacity-90
              ">
                Рецепты · Подарки · Фильмы · Книги · Уход
              </p>
            </div>
            
            <div className="
              text-section-development
              text-2xl md:text-3xl
              relative z-10
              transition-all
              duration-500
              group-hover:translate-x-2
              group-hover:scale-110
            ">
              →
            </div>
          </div>
        </Link>
      </div>

      {/* "Как это работает" - ТАКОЙ ЖЕ ШИРИНЫ */}
      <div className="max-w-md md:max-w-4xl mx-auto pb-8 md:pb-12">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-medium text-foreground mb-2">
            Как это работает?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
            Простой путь от вопроса до решения
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              step: '1',
              title: 'Выберите помощника',
              description: 'Что приготовить, подарить или посмотреть?',
              icon: Goal
            },
            {
              step: '2', 
              title: 'Настройте фильтры',
              description: 'Бюджет, время, ингредиенты',
              icon: Lightbulb
            },
            {
              step: '3',
              title: 'Получите решение',
              description: 'Идея + ссылки на покупку',
              icon: ShoppingCart
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="
                rounded-xl p-6 md:p-8
                border border-border/30
                bg-card/30
                transition-all duration-300
                relative
                group

              "
            >
              {/* Тонкая линия сверху вместо цифры */}
              <div className="
                absolute top-0 left-1/2 -translate-x-1/2
                w-12 h-0.5
                bg-muted-foreground/20
                group-hover:bg-muted-foreground/30
                transition-colors duration-300
              " />
              
              <div className="text-center pt-2">
                <div className="
                  inline-flex  
                  rounded-xl 
                  bg-muted/10
                  mb-4 md:mb-6
                ">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                </div>
                
                <h3 className="text-lg md:text-xl font-medium text-foreground mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
);
}
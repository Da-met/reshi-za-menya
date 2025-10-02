'use client';

import { useState } from 'react';
import { useThemeStore } from '../../stores/theme-store';
import { Lollipop, Moon, Cloud } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { 
      id: 'light' as const, 
      name: 'Зефирная', 
      icon: Lollipop,
      buttonBg: 'bg-[#f4d8e6]',
      buttonText: 'text-[#557f59]',
      buttonBorder: 'border-[#f4d8e6]',
    },
    { 
      id: 'night' as const, 
      name: 'Ночная', 
      icon: Moon,
      buttonBg: 'bg-[#083353]',
      buttonText: 'text-[#d36960]',
      buttonBorder: 'border-[#083353]',
    },
    { 
      id: 'sky' as const, 
      name: 'Небесная', 
      icon: Cloud,
      buttonBg: 'bg-[#6e93e4]',
      buttonText: 'text-[#f7f2ee]',
      buttonBorder: 'border-[#6e93e4]',
    },
  ];

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <div className="fixed bottom-6 left-6 z-50 sm:bottom-6 sm:left-6">
      {/* Основная кнопка */}
      {currentTheme && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 
            rounded-full
            shadow-lg 
            flex items-center justify-center 
            transition-all duration-300 
            hover:scale-110 hover:shadow-xl
            group
            border
            ${currentTheme.buttonBg} 
            ${currentTheme.buttonText}
            ${currentTheme.buttonBorder}
          `}
          title={`Текущая тема: ${currentTheme.name}`}
        >
          <currentTheme.icon className="
            w-5 h-5          
            sm:w-7 sm:h-7    
            transition-transform group-hover:scale-125
          "/>
        </button>
      )}

      {/* Выпадающие кнопки */}
      {isOpen && (
        <div className="
          absolute 
          bottom-14 sm:bottom-16 lg:bottom-20 
          left-1/2 
          transform 
          -translate-x-1/2 
          space-y-3 
        ">
          {themes.map((themeOption, index) => {
            // Обратные задержки: первая кнопка (ближняя) - самая большая задержка
            const delayClass = 
              index === 0 ? 'theme-button-enter-delay-2' : // Ближняя к основной - задержка 0.2s
              index === 1 ? 'theme-button-enter-delay-1' : // Средняя - задержка 0.1s  
              'theme-button-enter';                        // Дальняя - задержка 0s
            
            return (
              <button
                key={themeOption.id}
                onClick={() => {
                  setTheme(themeOption.id);
                  setIsOpen(false);
                }}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 
                  rounded-full
                  border
                  shadow-lg 
                  flex items-center justify-center 
                  transition-all duration-300 
                  hover:scale-110 hover:shadow-md
                  ${themeOption.buttonBg} 
                  ${themeOption.buttonText}
                  ${themeOption.buttonBorder}
                  ${
                    theme === themeOption.id 
                      ? 'ring-2 ring-accent scale-110 ring-primary-foreground' 
                      : 'opacity-90 hover:opacity-100'
                  }
                  ${delayClass}
                `}
                title={themeOption.name}
              >
                <themeOption.icon className="w-6 h-6" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
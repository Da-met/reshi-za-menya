'use client';

import React from 'react';
import { AlertCircle, WifiOff, Server, Clock, X } from 'lucide-react';


interface ErrorDisplayProps {
  error: {
    userMessage?: string;
    message?: string;
  };
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
  module: 'movies' | 'books' | 'gifts' | 'recipes' | 'analyzer' | 'skincare' | 'default';
}

const moduleNames = {
  movies: { name: 'фильм', genitive: 'фильма' },
  books: { name: 'книгу', genitive: 'книги' },
  gifts: { name: 'подарок', genitive: 'подарка' },
  recipes: { name: 'рецепт', genitive: 'рецепта' },
  skincare: { name: 'средство', genitive: 'средства' },
  analyzer: { name: 'анализ', genitive: 'анализа' },
  default: { name: 'результат',  genitive: 'результата' }
};

const ErrorDisplayComponent = ({
  error,
  onRetry,
  onDismiss,
  className = '',
  module = 'default'
}: ErrorDisplayProps) => {
  
  const moduleInfo = moduleNames[module] || moduleNames.default;

  const getErrorDetails = () => {
    const errorText = error.message?.toLowerCase() || '';

    // ⏰ ТАЙМАУТ
    if (errorText.includes('таймаут') || errorText.includes('timeout')) {
      return {
        title: `Поиск затянулся`,
        description: `Поиск ${moduleInfo.genitive} занял больше времени, чем обычно. 
          Попробуйте ещё раз — часто это помогает! А если нет, можно изменить параметры.`,
        icon: <Clock size={20} className="text-orange-500" />
      };
    }

    // 📶 НЕТ ИНТЕРНЕТА
    if (errorText.includes('network') || errorText.includes('сеть') || errorText.includes('fetch')) {
      return {
        title: 'Потеряли связь',
        description: `Не видим интернет-соединение. Проверьте Wi-Fi или мобильные данные и попробуйте снова.`,
        icon: <WifiOff size={20} className="text-red-500" />
      };
    }

    // 🔧 СЕРВЕР УПАЛ
    if (errorText.includes('500') || errorText.includes('502') || errorText.includes('503') || errorText.includes('server')) {
      return {
        title: `У нас тут небольшая буря`,
        description: `Сейчас к нам заглянуло очень много людей, и сервис временно не справляется 🤯
          Мы уже чиним! Попробуйте через пару минут.`   ,
        icon: <Server size={20} className="text-amber-500" />
      };
    }

    // 😕 УНИВЕРСАЛЬНАЯ ОШИБКА
    return {
      title: `Что-то пошло не так`,
      description: `Что-то пошло не так. Мы уже знаем об этом и исправляем.`,
      icon: <AlertCircle size={20} className="text-red-500" />
    };
  };

  const { title, description, icon } = getErrorDetails();

  return (
    <div className={`bg-red-50/80 border border-red-200 rounded-xl p-5 relative ${className}`}>
      <div className="flex gap-4">
        <div className="flex-shrink-0 pt-0.5">{icon}</div>
        
        <div className="flex-1">
          <h4 className="text-base font-semibold text-red-900 mb-1">{title}</h4>
          <p className="text-sm text-red-700/90 leading-relaxed">{description}</p>
          
          {onRetry && (
            <button
              onClick={(e) => {
                e.preventDefault(); // 👈 ОСТАНАВЛИВАЕМ СОБЫТИЕ!
                onRetry?.();
              }}
              className="mt-3 text-sm font-medium text-red-800 hover:text-red-900 bg-red-100/80 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <span>↻</span>
              Повторить попытку
            </button>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1.5 text-red-500 hover:text-red-700 hover:bg-red-200/50 rounded-lg transition-colors"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export const ErrorDisplay = React.memo(ErrorDisplayComponent);
ErrorDisplay.displayName = 'ErrorDisplay';
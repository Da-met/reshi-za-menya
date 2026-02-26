// src/components/ui/UniversalLoader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';


interface UniversalLoaderProps {
  /** Показать/скрыть лоадер */
  isVisible: boolean;
  /** Заголовок над анимацией */
  title?: string;
  /** Сообщение под анимацией */
  message?: string;

}

const UniversalLoaderComponent = ({
  isVisible,
  title = "Подбираем уходовые средства",
  message = "Анализируем ваш тип кожи и потребности..."
}: UniversalLoaderProps) => {
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-card rounded-2xl shadow-lg p-8 border border-border"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Заголовок */}
        {title && (
          <motion.h3
            className="text-2xl text-center text-section-development"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
        )}
        
        {/* Центральная анимация - Капля воды */}
        <div className="relative w-32 h-32">
          {/* Капля воды */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary)), hsl(var(--secondary)))',
              boxShadow: '0 0 20px hsla(var(--primary) / 0.4)'
            }}
            animate={{
              scale: [1, 1.1, 1],
              borderRadius: ['50%', '45% 55% 45% 55%', '50%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Волны внутри капли */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2"
              style={{ 
                borderColor: `hsla(var(--primary) / ${0.2 + i * 0.2})` 
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Блестки */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles className="w-6 h-6 text-secondary" />
          </motion.div>
        </div>
        
        {/* Текст под анимацией */}
        <div className="text-center space-y-4 w-full max-w-md">
          <motion.p
            className="text-sm md:text-base text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message}
          </motion.p>
          
          {/* Простой прогресс-индикатор БЕЗ белой полосы */}
          <div className="w-full">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: '0%' }}
                animate={{ width: ['0%', '30%', '70%', '100%', '0%'] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const UniversalLoader = React.memo(UniversalLoaderComponent);
UniversalLoader.displayName = 'UniversalLoader';
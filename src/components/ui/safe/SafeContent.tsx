// src/components/ui/SafeContent.tsx - ОБНОВЛЯЕМ
'use client';

import { SafeText, SafeList } from './SafeText';

// Сохраняем старый интерфейс для обратной совместимости
interface SafeContentProps {
  content: string | string[];
  type?: 'text' | 'html' | 'multiline' | 'list' | 'paragraphs'; // Добавили 'paragraphs'
  className?: string;
  maxLength?: number;
}

export function SafeContent({ 
  content, 
  type = 'text',
  className = '', 
  maxLength 
}: SafeContentProps) {
  
  // Обработка массива
  if (Array.isArray(content)) {
    if (type === 'list') {
      return <SafeList items={content} className={className} />;
    }
    
    // Для обратной совместимости с type="multiline"
    if (type === 'multiline' || type === 'paragraphs') {
      const textContent = content.join('\n');
      return (
        <SafeText 
          content={textContent} 
          className={className}
          maxLength={maxLength}
          mode="paragraphs"
        />
      );
    }
    
    // Иначе объединяем в строку
    const textContent = content.join(', ');
    return (
      <SafeText 
        content={textContent} 
        className={className}
        maxLength={maxLength}
        mode="text"
      />
    );
  }

  // Обработка строки
  // Для обратной совместимости
  if (type === 'html') {
    // ВАЖНО: type="html" больше не поддерживается из соображений безопасности
    // Падаем в режим простого текста
    console.warn('SafeContent: type="html" deprecated, using type="text" instead');
    return (
      <SafeText 
        content={content} 
        className={className}
        maxLength={maxLength}
        mode="text"
      />
    );
  }

  if (type === 'multiline' || type === 'paragraphs') {
    return (
      <SafeText 
        content={content} 
        className={className}
        maxLength={maxLength}
        mode="paragraphs"
      />
    );
  }

  // type="text" (по умолчанию)
  return (
    <SafeText 
      content={content} 
      className={className}
      maxLength={maxLength}
      mode="text"
    />
  );
}
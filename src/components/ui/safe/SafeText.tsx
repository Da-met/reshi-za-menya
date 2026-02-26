// src/components/ui/SafeText.tsx - ОБНОВЛЯЕМ
'use client';

import { escapeHtml, splitParagraphs } from '@/lib/security';

interface SafeTextProps {
  /** Текст для безопасного отображения */
  content: string;
  /** CSS классы */
  className?: string;
  /** Максимальная длина (опционально) */
  maxLength?: number;
  /** Режим отображения: текст или параграфы */
  mode?: 'text' | 'paragraphs';
}

export function SafeText({ 
  content, 
  className = '', 
  maxLength,
  mode = 'text'
}: SafeTextProps) {
  
  if (!content || typeof content !== 'string') {
    return null;
  }

  // Ограничиваем длину если нужно
  let processedContent = content;
  if (maxLength && content.length > maxLength) {
    processedContent = content.substring(0, maxLength) + '...';
  }

  // Экранируем HTML символы с помощью нашей безопасной функции
  const escapedContent = escapeHtml(processedContent);

  if (mode === 'paragraphs') {
    // Разделяем на параграфы
    const paragraphs = splitParagraphs(escapedContent);

    if (paragraphs.length === 0) {
      return null;
    }

    return (
      <div className={className}>
        {paragraphs.map((paragraph, index) => (
          <p 
            key={index} 
            className={index < paragraphs.length - 1 ? 'mb-3' : ''}
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  // Просто текст
  return (
    <span className={className}>
      {escapedContent}
    </span>
  );
}

export function SafeList({ 
  items, 
  className = '',
  type = 'ul' 
}: { 
  items: string[]; 
  className?: string;
  type?: 'ul' | 'ol';
}) {
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  const ListTag = type === 'ul' ? 'ul' : 'ol';
  
  return (
    <ListTag className={className}>
      {items.map((item, index) => {
        if (typeof item !== 'string') return null;
        
        return (
          <li key={index}>
            <SafeText content={item} />
          </li>
        );
      })}
    </ListTag>
  );
}
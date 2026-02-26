'use client';

import { InfoSection } from './InfoSection';

interface TagListProps {
  tags: string[];
  title?: string;
  variant?: 'default' | 'ingredient' | 'category' | 'filter';
  onClick?: (tag: string) => void;
  className?: string;
  withContainer?: boolean; // ← новый пропс вместо noBorder
  limit?: number;
}

export function TagList({ 
  tags, 
  title, 
  variant = 'default', 
  onClick,
  className = '',
  withContainer = true, // ← по умолчанию true
  limit
}: TagListProps) {
  const variantClasses = {
    default: 'border text-primary',
    ingredient: 'bg-primary/10 text-primary',
    category: 'bg-accent/20 text-accent-foreground',
    filter: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const displayTags = limit ? tags.slice(0, limit) : tags;

  const content = (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag, i) => (
        <span
          key={i}
          className={`
            px-3 py-1 rounded-full text-xs md:text-sm font-medium 
            ${variantClasses[variant]}
            ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}
          `}
          onClick={() => onClick?.(tag)}
        >
          {tag}
        </span>
      ))}
      {limit && tags.length > limit && (
        <span className="px-3 py-1 text-xs text-muted-foreground">
          +{tags.length - limit} ещё
        </span>
      )}
    </div>
  );

  if (title) {
    return (
      <InfoSection 
        title={title} 
        className={className}
      >
        {content}
      </InfoSection>
    );
  }

  // Если нет заголовка, но нужен контейнер
  if (withContainer) {
    return (
      <div className={`border-t border-border p-6 md:p-8 ${className}`}>
        {content}
      </div>
    );
  }

  // Если без контейнера
  return <div className={className}>{content}</div>;
}
// src/components/shared/EmptyState.tsx
'use client';

import { Button } from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: string; // Только строки (emoji)
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export function EmptyState({
  icon = '📦',
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
  className = ''
}: EmptyStateProps) {
  
  if (variant === 'compact') {
    return (
      <div className={`text-center p-6 ${className}`}>
        <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-muted-foreground/20">
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-xl text-foreground mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground max-w-sm mx-auto mb-4">
            {description}
          </p>
        )}
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            size="sm"
            variant="outline"
            className="mt-2"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className={`text-center py-12 px-4 ${className}`}>
      <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-muted-foreground/20">
        <span className="text-3xl">{icon}</span>
      </div>
      
      <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{title}</h3>
      
      {description && (
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="lg"
          className="min-w-[160px]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
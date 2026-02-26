// src/components/shared/ui/InfoSection.tsx
'use client';

import { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'primary';
}

export function InfoSection({ 
  title, 
  children, 
  icon, 
  className = '',
  variant = 'default' 
}: InfoSectionProps) {
  const variantClasses = {
    default: '',
    accent: 'bg-accent/10',
    primary: 'bg-primary/5',
  };

  return (
    <div className={`border-t border-border p-6 md:p-8 ${variantClasses[variant]} ${className}`}>
      <div className="space-y-4">
        <h3 className="text-lg md:text-xl text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
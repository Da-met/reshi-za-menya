// src/components/shared/ui/FeatureList.tsx
'use client';

import { CheckCircle, Star, Sparkles, LucideIcon } from 'lucide-react';
import { InfoSection } from './InfoSection';

interface FeatureListProps {
  items: string[];
  title: string;
  variant?: 'check' | 'star' | 'sparkle';
  icon?: LucideIcon;
  className?: string;
}

export function FeatureList({ 
  items, 
  title, 
  variant = 'check',
  icon: CustomIcon,
  className = ''
}: FeatureListProps) {
  const icons = {
    check: CheckCircle,
    star: Star,
    sparkle: Sparkles,
  };
  
  const IconComponent = CustomIcon || icons[variant];
  const iconColor = {
    check: 'text-green-500',
    star: 'text-yellow-500',
    sparkle: 'text-primary',
  };

  return (
    <InfoSection title={title} className={className}>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <IconComponent 
              size={16} 
              className={`flex-shrink-0 ${iconColor[variant]}`} 
            />
            <span className="text-sm md:text-base text-muted-foreground">
              {item}
            </span>
          </div>
        ))}
      </div>
    </InfoSection>
  );
}
// src/components/shared/BackNavigation.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackNavigationProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackNavigation({
  href,
  label = 'Назад',
  className = ''
}: BackNavigationProps) {
  return (
    <div className={`mb-6 md:mb-8 ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" />
        {label}
      </Link>
    </div>
  );
}
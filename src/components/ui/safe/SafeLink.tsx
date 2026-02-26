// src/components/ui/SafeLink.tsx
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { safeHref } from '@/lib/security';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  nextLinkProps?: Omit<Parameters<typeof Link>[0], 'href' | 'children'>;
}

export function SafeLink({
  href,
  children,
  className = '',
  external = false,
  title,
  onClick,
  nextLinkProps = {},
}: SafeLinkProps) {
  
  const safeUrl = safeHref(href);
  
  const isInternal = !external && (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('?') ||
    href === ''
  );
  
  if (isInternal && safeUrl !== '#') {
    return (
      <Link
        href={safeUrl}
        className={className}
        title={title}
        onClick={onClick}
        {...nextLinkProps}
      >
        {children}
      </Link>
    );
  }
  
  const rel = external ? 'noopener noreferrer nofollow' : undefined;
  const target = external ? '_blank' : undefined;
  
  return (
    <a
      href={safeUrl}
      className={className}
      title={title}
      rel={rel}
      target={target}
      onClick={(e) => {
        if (external && safeUrl !== '#') {
          console.log('🔗 Открыта внешняя ссылка:', safeUrl);
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

// Простая версия (опционально)
export function SafeButtonLink({
  href,
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  onClick,
}: SafeLinkProps & {
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}) {
  
  const safeUrl = safeHref(href);
  const isSafe = safeUrl !== '#' && !disabled;
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline: 'border border-border hover:bg-accent',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    if (!isSafe) {
      e.preventDefault();
      return;
    }
    
    onClick?.(e);
  };
  
  return (
    <button
      type="button"
      className={`${variantClasses[variant]} ${className} ${
        !isSafe ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={handleClick}
      disabled={!isSafe}
      aria-disabled={!isSafe}
    >
      {children}
    </button>
  );
}
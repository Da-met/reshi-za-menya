// src/components/ui/safe/SafeImage.tsx
'use client';

import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  maxHeight?: string | number;
}

export function SafeImage({ 
  src, 
  alt, 
  className = '',
  maxHeight = '400px'
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`w-full h-full min-h-[200px] flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">🖼️</div>
          <p className="text-sm text-gray-500">{alt || 'Нет изображения'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto block rounded-lg ${className}`}
        style={{ maxHeight, objectFit: 'contain' }}
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}
// src/components/collections/adapters/SkincareCollectionCard.tsx
'use client';

import { SkincareProductCard } from '@/components/skincare/SkincareProductCard';
import type { SkincareProduct } from '@/types/skincare';

interface Props {
  data: SkincareProduct;
}

export function SkincareCollectionCard({ data }: Props) {
  return <SkincareProductCard product={data} />;
}
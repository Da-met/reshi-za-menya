// src/components/collections/adapters/MovieCollectionCard.tsx
'use client';

import { MovieProductCard } from '@/components/movies/MovieProductCard';
import type { MovieResponse } from '@/types/movies';

interface Props {
  data: MovieResponse['recommendation'];
}

export function MovieCollectionCard({ data }: Props) {
  return <MovieProductCard movie={data} />;
}
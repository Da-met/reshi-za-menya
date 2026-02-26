// src/components/collections/adapters/BookCollectionCard.tsx
'use client';

import { BookProductCard } from '@/components/books/BookProductCard';
import type { BookResponse } from '@/types/books';

interface Props {
  data: BookResponse['book'];
}

export function BookCollectionCard({ data }: Props) {
  return <BookProductCard book={data} />;
}
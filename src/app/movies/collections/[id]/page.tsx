// src/app/movies/collections/[id]/page.tsx
import { use } from 'react';
import { notFound } from 'next/navigation';
import { CollectionDetail } from '@/components/collections/CollectionDetail';
import { getCollectionById } from '@/app/collections/data';

interface Props {
  params: Promise<{ id: string }>;
}

export default function MovieCollectionPage({ params }: Props) {
  const { id } = use(params);
  const collection = getCollectionById(id);
  
  if (!collection || collection.module !== 'movies') {
    notFound();
  }

  return <CollectionDetail collection={collection} />;
}
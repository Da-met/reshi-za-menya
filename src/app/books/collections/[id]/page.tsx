// src/app/books/collections/[id]/page.tsx
import { use } from 'react';
import { notFound } from 'next/navigation';
import { CollectionDetail } from '@/components/collections/CollectionDetail';
import { getCollectionById } from '@/app/collections/data';

interface Props {
  params: Promise<{ id: string }>;
}

export default function BookCollectionPage({ params }: Props) {
  const { id } = use(params);
  const collection = getCollectionById(id);
  
  if (!collection || collection.module !== 'books') {
    notFound();
  }

  return <CollectionDetail collection={collection} />;
}
// src/app/gifts/collections/[id]/[itemId]/page.tsx
import { use } from 'react';
import { notFound } from 'next/navigation';
import { ItemDetail } from '@/components/collections/ItemDetail';
import { getCollectionById } from '@/app/collections/data';

interface Props {
  params: Promise<{ id: string; itemId: string }>;
}

export default function GiftItemPage({ params }: Props) {
  const { id, itemId } = use(params);
  const collection = getCollectionById(id);
  
  if (!collection || collection.module !== 'gifts') {
    notFound();
  }

  const item = collection.items.find(i => i.data.id === itemId);
  
  if (!item) {
    notFound();
  }

  return (
    <ItemDetail 
      item={item} 
      collectionId={id}
      collectionTitle={collection.title}
    />
  );
}
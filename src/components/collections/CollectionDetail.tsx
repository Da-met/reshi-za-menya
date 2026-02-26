// src/components/collections/CollectionDetail.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Collection, CollectionItem } from '@/types/collections';
import {
  GiftCollectionCard,
  FoodCollectionCard,
  MovieCollectionCard,
  BookCollectionCard,
  SkincareCollectionCard
} from './adapters';
import { CollectionCarousel } from './CollectionCarousel';
import type { AnalyzerProduct } from '@/types/analyzer';

interface Props {
  collection: Collection;
}

const AnalyzerCard = ({ data }: { data: AnalyzerProduct }) => (
  <div className="bg-card rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
    <h3 className="text-xl font-normal mb-2">{data.name}</h3>
    <p className="text-sm text-muted-foreground mb-2">{data.brand}</p>
    <p className="text-muted-foreground line-clamp-2">{data.description}</p>
    <div className="mt-4 flex items-center justify-between">
      <span className="text-sm text-green-600">Безопасность: {data.safetyScore}/10</span>
      {data.price && <span className="text-primary font-medium">{data.price}</span>}
    </div>
  </div>
);

export function CollectionDetail({ collection }: Props) {
  const getItemCard = (item: CollectionItem) => {
    switch (item.module) {
      case 'gifts':
        return <GiftCollectionCard data={item.data} />;
      case 'food':
        return <FoodCollectionCard data={item.data} />;
      case 'movies':
        return <MovieCollectionCard data={item.data} />;
      case 'books':
        return <BookCollectionCard data={item.data} />;
      case 'skincare':
        return <SkincareCollectionCard data={item.data} />;
      case 'analyzer':
        return <AnalyzerCard data={item.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Навигация назад */}
        <div className="mb-6 max-w-[848px] mx-auto w-full">
          <Link 
            href="/collections" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Все подборки
          </Link>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8 max-w-[848px] mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-normal text-foreground font-accent mb-4">
            {collection.title}
          </h1>
          <p className="text-xl text-muted-foreground font-normal">
            {collection.description}
          </p>
        </div>

        {/* Карусель с карточками */}
        <CollectionCarousel
          items={collection.items}
          module={collection.module}
          collectionId={collection.id}
          getItemCard={getItemCard}
        />
      </div>
    </div>
  );
}
// src/components/collections/ItemDetail.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CollectionItem } from '@/types/collections';
import { GiftProductCard } from '@/components/gifts/GiftProductCard';
import { FoodRecipeCard } from '@/components/food/FoodRecipeCard';
import { MovieProductCard } from '@/components/movies/MovieProductCard';
import { BookProductCard } from '@/components/books/BookProductCard';
import { SkincareProductCard } from '@/components/skincare/SkincareProductCard';
import type { GiftResponse } from '@/types/gifts';
import type { FoodResponse } from '@/types/food';
import type { MovieResponse } from '@/types/movies';
import type { BookResponse } from '@/types/books';
import type { SkincareProduct } from '@/types/skincare';
import type { AnalyzerProduct } from '@/types/analyzer';

interface Props {
  item: CollectionItem;
  collectionId: string;
  collectionTitle: string;
}

// Детальные компоненты для каждого модуля
const GiftDetail = ({ data }: { data: GiftResponse['gift'] }) => (
  <GiftProductCard gift={data} showPurchaseButtons={true} />
);

const FoodDetail = ({ data }: { data: FoodResponse['recipe'] }) => (
  <FoodRecipeCard recipe={data} />
);

const MovieDetail = ({ data }: { data: MovieResponse['recommendation'] }) => (
  <MovieProductCard movie={data} />
);

const BookDetail = ({ data }: { data: BookResponse['book'] }) => (
  <BookProductCard book={data} />
);

const SkincareDetail = ({ data }: { data: SkincareProduct }) => (
  <SkincareProductCard product={data} />
);

const AnalyzerDetail = ({ data }: { data: AnalyzerProduct }) => (
  <div className="bg-card rounded-2xl shadow-lg p-8">
    <h1 className="text-3xl font-normal mb-2">{data.name}</h1>
    <p className="text-lg text-muted-foreground mb-4">{data.brand}</p>
    
    <p className="text-muted-foreground mb-6">{data.description}</p>
    
    <div className="space-y-4">
      <div className="p-4 bg-secondary rounded-lg">
        <p className="text-lg font-medium mb-2">Безопасность: {data.safetyScore}/10</p>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${data.safetyScore * 10}%` }}
          />
        </div>
      </div>

      {data.ingredients && (
        <div>
          <h2 className="text-lg font-normal mb-2">Состав</h2>
          <div className="space-y-2">
            {data.ingredients.map((ing, i) => (
              <div key={i} className="flex justify-between items-center">
                <span>{ing.name}</span>
                <span className={`text-sm ${
                  ing.safety === 'excellent' ? 'text-green-600' :
                  ing.safety === 'good' ? 'text-blue-600' :
                  ing.safety === 'warning' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {ing.safety}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.price && (
        <p className="text-2xl font-bold text-primary mt-4">{data.price}</p>
      )}
      
      {data.purchaseLink && (
        <a
          href={data.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
        >
          Купить
        </a>
      )}
    </div>
  </div>
);

export function ItemDetail({ item, collectionId, collectionTitle }: Props) {
  // Выбираем нужный компонент
  const getItemComponent = () => {
    switch (item.module) {
      case 'gifts':
        return <GiftDetail data={item.data} />;
      case 'food':
        return <FoodDetail data={item.data} />;
      case 'movies':
        return <MovieDetail data={item.data} />;
      case 'books':
        return <BookDetail data={item.data} />;
      case 'skincare':
        return <SkincareDetail data={item.data} />;
      case 'analyzer':
        return <AnalyzerDetail data={item.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6">
          <Link 
            href={`/${item.module}/collections/${collectionId}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к подборке &quot;{collectionTitle}&quot;
          </Link>
        </div>

        {/* Детальная карточка */}
        {getItemComponent()}
      </div>
    </div>
  );
}
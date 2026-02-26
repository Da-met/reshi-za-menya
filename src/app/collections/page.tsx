// src/app/collections/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

// Импортируем моковые данные
import { allCollectionsSummary, categories } from './data';

export default function AllCollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCollections = selectedCategory === 'all'
    ? allCollectionsSummary
    : allCollectionsSummary.filter(collection => collection.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-500" size={32} />
            <h1 className="text-4xl md:text-5xl font-normal text-foreground font-accent">
              Все подборки
            </h1>
            <Sparkles className="text-yellow-500" size={32} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
            Готовые идеи для всех разделов нашего приложения
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-normal transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Сетка подборок */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/${collection.module}/collections/${collection.id}`}
              className="group block"
            >
              <div className="bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    width={0}
                    height={0}
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-normal text-primary-foreground bg-primary/80 px-2 py-1 rounded-full">
                      {collection.itemsCount} идей
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl text-foreground mb-3 group-hover:text-primary transition-colors font-normal leading-tight">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Сообщение если нет подборок */}
        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <Sparkles size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-normal text-foreground mb-2">
              Подборок пока нет
            </h3>
            <p className="text-muted-foreground">
              Выберите другую категорию
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
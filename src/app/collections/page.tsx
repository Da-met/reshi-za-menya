// src/app/collections/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

const allCollections = [
  {
    id: '1',
    module: 'gifts',
    title: 'Новогодние подарки',
    description: 'Идеи для зимних праздников - от уютных до технологичных',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
    itemsCount: 24,
    category: 'gifts'
  },
  {
    id: '2',
    module: 'gifts', 
    title: 'Подарки на День Рождения',
    description: 'Универсальные и тематические подарки для именинников',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    itemsCount: 18,
    category: 'gifts'
  },
  {
    id: '3',
    module: 'food',
    title: 'Новогодние рецепты',
    description: 'Блюда для праздничного стола - от закусок до десертов',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    itemsCount: 15,
    category: 'food'
  },
  {
    id: '4',
    module: 'food',
    title: 'Быстрые рецепты',
    description: 'Вкусные блюда на скорую руку для занятых дней',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
    itemsCount: 20,
    category: 'food'
  },
  {
    id: '5',
    module: 'movies',
    title: 'Фильмы для свидания',
    description: 'Романтическое кино для особенных вечеров',
    image: 'https://images.unsplash.com/photo-1489599809505-7c8e1c75ce13?w=600&h=400&fit=crop',
    itemsCount: 12,
    category: 'movies'
  },
  {
    id: '6',
    module: 'books',
    title: 'Книги в дорогу',
    description: 'Захватывающие истории для путешественников',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    itemsCount: 8,
    category: 'books'
  }
];

const categories = [
  { id: 'all', label: 'Все подборки' },
  { id: 'gifts', label: 'Подарки' },
  { id: 'food', label: 'Рецепты' },
  { id: 'books', label: 'Книги' },
  { id: 'movies', label: 'Фильмы/Сериалы' }
];

export default function AllCollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCollections = selectedCategory === 'all' 
    ? allCollections 
    : allCollections.filter(collection => collection.category === selectedCategory);

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
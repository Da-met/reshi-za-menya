// src/app/gifts/collections/[id]/page.tsx
'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// Данные подборки - временно, потом из API
const collectionData = {
  id: '1',
  title: 'Новогодние подарки',
  description: 'Самые актуальные и желанные подарки для зимних праздников',
  items: [
    {
      id: '1',
      title: 'Apple Watch Series 9',
      description: 'Умные часы с расширенными функциями здоровья',
      price: '45 990 ₽',
      image: 'https://static.re-store.ru/upload/static/re/blog/iphone-15-apple-watch-series-9-ultra-2-review-2023/5.jpg',
      brand: 'Apple',
      category: 'Электроника',
      rating: 4.8
    },
    {
      id: '2', 
      title: 'Набор косметики L\'Occitane',
      description: 'Люксовая уходовая косметика в праздничной упаковке',
      price: '8 490 ₽',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
      brand: 'L\'Occitane', 
      category: 'Красота',
      rating: 4.9
    }
  ]
};

export default function GiftCollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const collection = collectionData;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/collections" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={20} className="mr-2" />
            Все подборки
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-normal text-foreground font-accent mb-4">
            {collection.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-normal">
            {collection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collection.items.map((item) => (
            <Link key={item.id} href={`/gifts/collections/${id}/${item.id}`} className="group block">
              <div className="bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                <div className="h-48 relative overflow-hidden">
                  <Image src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl text-foreground mb-3 group-hover:text-primary transition-colors font-normal">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-normal mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl text-primary font-normal">{item.price}</span>
                    <span className="text-sm text-muted-foreground">★ {item.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
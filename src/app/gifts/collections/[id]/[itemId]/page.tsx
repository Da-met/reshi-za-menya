// src/app/gifts/collections/new-year/[id]/page.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Star } from 'lucide-react';
import Image from 'next/image';



const giftDetails = {
  id: '1',
  title: 'Apple Watch Series 9',
  description: 'Умные часы с расширенными функциями здоровья, отслеживанием сна и фитнес-трекингом. Идеальный подарок для активных людей, которые следят за своим здоровьем и ведут современный образ жизни.',
  price: '45 990 ₽',
  image: 'https://static.re-store.ru/upload/static/re/blog/iphone-15-apple-watch-series-9-ultra-2-review-2023/5.jpg',
  brand: 'Apple',
  category: 'Электроника',
  features: [
    'Отслеживание сна и активности',
    'Фитнес-трекинг с GPS', 
    'Водонепроницаемость 50м',
    'ЭКГ и измерение кислорода в крови',
    'Умные уведомления',
    'До 18 часов работы'
  ],
  reasons: [
    'Практичный и современный гаджет',
    'Подходит для здоровья и спорта',
    'Стильный аксессуар для повседневной носки',
    'Высокое качество и надежность бренда'
  ],
  purchaseLink: 'https://www.citilink.ru/',
  tags: ['технологии', 'здоровье', 'премиум', 'гаджеты']
};

export default function GiftDetailPage({ }: { params: Promise<{ id: string }> }) {
  const gift = giftDetails;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6">
          <Link 
            href="/gifts/collections/new-year"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Назад к подборке
          </Link>
        </div>

        {/* Основной контент - один блок */}
        <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
          {/* Верхняя часть с изображением и основной информацией */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Изображение */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src={gift.image}
                alt={gift.title}
                width={0} 
                height={0} 
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Информация */}
            <div className="space-y-6">
              {/* Заголовок и категория */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-normal text-primary bg-secondary px-3 py-1 rounded-full">
                    {gift.category}
                  </span>
                  <span className="text-sm text-muted-foreground">{gift.brand}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-normal text-foreground mb-4">
                  {gift.title}
                </h1>
              </div>

              {/* Цена и кнопка */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{gift.price}</span>
                </div>

                <a
                  href={gift.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-xl font-normal hover:bg-primary/90 transition-colors text-lg"
                >
                  <ShoppingCart size={24} />
                  <span>Купить на маркетплейсе</span>
                </a>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                    <Heart size={20} />
                    <span>В избранное</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                    <Share2 size={20} />
                    <span>Поделиться</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Описание */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-normal text-foreground">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">
                {gift.description}
              </p>
            </div>
          </div>

          {/* Особенности и причины */}
          <div className="border-t border-border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
              {/* Особенности */}
              <div className="space-y-4">
                <h2 className="text-xl font-normal text-foreground">Особенности подарка</h2>
                <div className="space-y-3">
                  {gift.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check size={18} className="text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Почему хороший подарок */}
              <div className="space-y-4">
                <h2 className="text-xl font-normal text-foreground">Почему это хороший подарок</h2>
                <div className="space-y-3">
                  {gift.reasons.map((reason, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Star size={18} className="text-yellow-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Теги */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {gift.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-secondary text-primary text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
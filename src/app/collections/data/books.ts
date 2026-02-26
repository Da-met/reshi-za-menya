// src/app/collections/data/books.ts
import { Collection } from '@/types/collections';
import type { BookResponse } from '@/types/books';

const travelBooks: BookResponse['book'][] = [
  {
    id: 'b1',
    title: 'Есть, молиться, любить',
    author: 'Элизабет Гилберт',
    description: 'Искренние мемуары женщины, которая после тяжелого развода отправилась в путешествие по Италии, Индии и Индонезии в поисках себя.',
    whyMatch: 'Идеальная книга для дороги — легкая, вдохновляющая, заставляет мечтать о своих путешествиях.',
    genres: ['мемуары', 'биография', 'путешествия'],
    length: 'single',
    readingComplexity: 'light',
    year: 2006,
    country: 'США',
    features: ['Основано на реальных событиях', 'Вдохновляет'],
    coverImage: 'https://avatars.mds.yandex.net/get-mpic/4493022/2a00000195ccb756486bb3959b3bfda9da34/orig',
    pages: 416,
    rating: 4.2,
    affiliateLinks: {
      litres: 'https://litres.ru/...',
      book24: 'https://book24.ru/...'
    }
  },
  {
    id: 'b2',
    title: 'Вокруг света за 80 дней',
    author: 'Жюль Верн',
    description: 'Классический приключенческий роман о путешествии вокруг света, полное опасностей и неожиданностей.',
    whyMatch: 'Книга, которая сама как путешествие. Держит в напряжении до последней страницы.',
    genres: ['приключения', 'классика'],
    length: 'single',
    readingComplexity: 'medium',
    year: 1872,
    country: 'Франция',
    features: ['Мировая классика', 'Экранизировано'],
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=600&fit=crop',
    pages: 288,
    rating: 4.5,
    affiliateLinks: {}
  }
];

const detectiveBooks: BookResponse['book'][] = [
  {
    id: 'b3',
    title: 'Убийство в "Восточном экспрессе"',
    author: 'Агата Кристи',
    description: 'Знаменитый детектив об убийстве в поезде, которое расследует Эркюль Пуаро.',
    whyMatch: 'Классический детектив, который держит в напряжении. Идеален для тех, кто любит загадки.',
    genres: ['детектив', 'классика'],
    length: 'single',
    readingComplexity: 'light',
    year: 1934,
    country: 'Великобритания',
    features: ['Легендарный автор', 'Много экранизаций'],
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop',
    pages: 320,
    rating: 4.6,
    affiliateLinks: {}
  },
  {
    id: 'b4',
    title: 'Шерлок Холмс: Этюд в багровых тонах',
    author: 'Артур Конан Дойл',
    description: 'Первая книга о знаменитом сыщике, где Холмс и Ватсон знакомятся и расследуют загадочное убийство.',
    whyMatch: 'Начало легендарной серии. Идеально для знакомства с классическим детективом.',
    genres: ['детектив', 'классика'],
    length: 'single',
    readingComplexity: 'medium',
    year: 1887,
    country: 'Великобритания',
    features: ['Культовый герой', 'Атмосфера Лондона'],
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop',
    pages: 256,
    rating: 4.7,
    affiliateLinks: {}
  }
];

const lightReading: BookResponse['book'][] = [
  {
    id: 'b5',
    title: 'Дневник Бриджит Джонс',
    author: 'Хелен Филдинг',
    description: 'Забавный дневник одинокой женщины, которая пытается наладить личную жизнь и борется с вредными привычками.',
    whyMatch: 'Очень смешно и жизненно. Идеально для легкого чтения и поднятия настроения.',
    genres: ['роман', 'комедия'],
    length: 'single',
    readingComplexity: 'light',
    year: 1996,
    country: 'Великобритания',
    features: ['Очень смешно', 'Культовая экранизация'],
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
    pages: 336,
    rating: 4.1,
    affiliateLinks: {}
  },
  {
    id: 'b6',
    title: 'Три чашки чая',
    author: 'Грег Мортенсон',
    description: 'Вдохновляющая история о том, как один человек решил построить школы для детей в Пакистане и Афганистане.',
    whyMatch: 'Книга, которая восстанавливает веру в человечество. Легко читается, но оставляет глубокий след.',
    genres: ['биография', 'путешествия', 'non-fiction'],
    length: 'single',
    readingComplexity: 'medium',
    year: 2006,
    country: 'США',
    features: ['Реальная история', 'Вдохновляет'],
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    pages: 352,
    rating: 4.4,
    affiliateLinks: {}
  }
];

export const bookCollections: Collection[] = [
  {
    id: '6',
    module: 'books',
    title: 'Книги в дорогу',
    description: 'Захватывающие истории для путешественников',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
    category: 'books',
    items: travelBooks.map(book => ({ module: 'books', data: book }))
  },
  {
    id: '12',
    module: 'books',
    title: 'Детективы для уютного вечера',
    description: 'Загадочные истории, от которых невозможно оторваться',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop',
    category: 'books',
    items: detectiveBooks.map(book => ({ module: 'books', data: book }))
  },
  {
    id: '13',
    module: 'books',
    title: 'Легкое чтение',
    description: 'Книги, которые поднимают настроение и не перегружают',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop',
    category: 'books',
    items: lightReading.map(book => ({ module: 'books', data: book }))
  }
];
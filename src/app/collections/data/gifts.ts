// src/app/collections/data/gifts.ts
import { Collection } from '@/types/collections';
import type { GiftResponse } from '@/types/gifts';

// Создаем моковые подарки
const newYearGifts: GiftResponse['gift'][] = [
  {
    id: 'g1',
    title: 'Apple Watch Series 9',
    description: 'Умные часы с расширенными функциями здоровья, отслеживанием сна и фитнес-трекингом',
    type: 'thing',
    price: '45 990 ₽',
    image: 'https://static.re-store.ru/upload/static/re/blog/iphone-15-apple-watch-series-9-ultra-2-review-2023/5.jpg',
    brand: 'Apple',
    category: 'Электроника',
    features: [
      'Отслеживание сна и активности',
      'Фитнес-трекинг с GPS',
      'Водонепроницаемость 50м',
      'ЭКГ и измерение кислорода в крови'
    ],
    reasons: [
      'Практичный и современный гаджет',
      'Подходит для здоровья и спорта',
      'Стильный аксессуар'
    ],
    reasoning: 'Apple Watch Series 9 — это идеальный подарок для тех, кто следит за здоровьем и ведет активный образ жизни. Часы не только выглядят стильно, но и помогают достигать спортивных целей.',
    purchaseLink: 'https://www.citilink.ru/',
    tags: ['технологии', 'здоровье', 'премиум', 'гаджеты']
  },
  {
    id: 'g2',
    title: 'Набор косметики L\'Occitane',
    description: 'Люксовая уходовая косметика в праздничной упаковке. Набор включает крем для рук, гель для душа и ароматное мыло.',
    type: 'thing',
    price: '8 490 ₽',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    brand: 'L\'Occitane',
    category: 'Красота',
    features: [
      'Натуральные ингредиенты',
      'Праздничная упаковка',
      'Подходит для любого типа кожи'
    ],
    reasons: [
      'Премиальный бренд',
      'Подойдет для любого возраста',
      'Создает праздничное настроение'
    ],
    reasoning: 'Набор L\'Occitane — это всегда беспроигрышный вариант. Качественная косметика в красивой упаковке порадует любую девушку или женщину.',
    purchaseLink: 'https://example.com/loccitane',
    tags: ['косметика', 'люкс', 'уход', 'новый год']
  },
  {
    id: 'g3',
    title: 'Настольная игра "Бункер"',
    description: 'Психологическая игра для компании, где нужно выживать в условиях апокалипсиса и убеждать других взять вас в бункер.',
    type: 'thing',
    price: '2 490 ₽',
    image: 'https://images.unsplash.com/photo-1632501641765-e6a4a1e5f87c?w=400&h=300&fit=crop',
    brand: 'Экивоки',
    category: 'Игры',
    features: [
      'Для 4-10 игроков',
      'Партия 40-60 минут',
      'Психологический триллер'
    ],
    reasons: [
      'Сплочает компанию',
      'Каждый раз новая игра',
      'Очень эмоционально'
    ],
    reasoning: 'Идеально для новогодних посиделок с друзьями! Игра создает живые эмоции и запоминается надолго.',
    purchaseLink: 'https://example.com/bunker',
    tags: ['игры', 'компания', 'развлечения']
  }
];

const birthdayGifts: GiftResponse['gift'][] = [
  {
    id: 'g4',
    title: 'Парфюмерный сет Maison Margiela',
    description: 'Набор миниатюр культовых ароматов бренда. Включает 5 ароматов по 10 мл.',
    type: 'thing',
    price: '6 990 ₽',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=300&fit=crop',
    brand: 'Maison Margiela',
    category: 'Парфюмерия',
    features: [
      '5 культовых ароматов',
      'Удобный формат для путешествий',
      'Стильная упаковка'
    ],
    reasons: [
      'Возможность выбрать любимый аромат',
      'Престижный бренд',
      'Оригинальный подарок'
    ],
    reasoning: 'Это подарок для ценителей парфюмерии. Набор позволяет носить с собой сразу несколько ароматов под настроение.',
    purchaseLink: 'https://example.com/maison',
    tags: ['парфюм', 'люкс', 'подарок']
  },
  {
    id: 'g5',
    title: 'Подписка на VK Combo',
    description: 'Годовая подписка на музыку, такси, доставку и кинопоиск. Всё в одном!',
    type: 'experience',
    price: '2 990 ₽/год',
    image: 'https://images.unsplash.com/photo-1556741533-411cf82e9e9a?w=400&h=300&fit=crop',
    brand: 'VK',
    category: 'Цифровые сервисы',
    features: [
      'VK Музыка',
      'Кинопоиск',
      'Такси и доставка',
      'Скидки у партнеров'
    ],
    reasons: [
      'Полезно каждый день',
      'Экономит бюджет',
      'Не занимает место'
    ],
    reasoning: 'Цифровой подарок, который точно пригодится. Особенно актуален для молодежи и активных пользователей.',
    purchaseLink: 'https://vk.com/combo',
    tags: ['цифровой', 'подписка', 'полезно']
  }
];

const giftsForHer: GiftResponse['gift'][] = [
  {
    id: 'g6',
    title: 'Ювелирное кольцо Sokolov',
    description: 'Серебряное кольцо с фианитами. Изящное и универсальное.',
    type: 'thing',
    price: '4 990 ₽',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
    brand: 'Sokolov',
    category: 'Украшения',
    features: [
      'Серебро 925 пробы',
      'Фианиты',
      'Родированное покрытие'
    ],
    reasons: [
      'Классический подарок',
      'Всегда в моде',
      'Подходит под любой стиль'
    ],
    reasoning: 'Украшения — это всегда эмоции и радость. Кольцо от Sokolov станет приятным сюрпризом.',
    purchaseLink: 'https://example.com/sokolov',
    tags: ['украшения', 'серебро', 'романтика']
  }
];

const giftsForHim: GiftResponse['gift'][] = [
  {
    id: 'g7',
    title: 'Набор для виски',
    description: 'Стеклянные стаканы с толстым дном, коптильня и щипцы для льда.',
    type: 'thing',
    price: '3 490 ₽',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    brand: 'BOHEMIA',
    category: 'Посуда',
    features: [
      '2 стакана 300 мл',
      'Коптильня с щепой',
      'Щипцы для льда'
    ],
    reasons: [
      'Для ценителей',
      'Создает атмосферу',
      'Качественное стекло'
    ],
    reasoning: 'Настоящий мужской подарок для домашних посиделок с друзьями.',
    purchaseLink: 'https://example.com/whiskey',
    tags: ['виски', 'посуда', 'мужчине']
  }
];

// Формируем коллекции
export const giftCollections: Collection[] = [
  {
    id: '1',
    module: 'gifts',
    title: 'Новогодние подарки',
    description: 'Самые актуальные и желанные подарки для зимних праздников',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
    category: 'gifts',
    items: newYearGifts.map(gift => ({ module: 'gifts', data: gift }))
  },
  {
    id: '2',
    module: 'gifts',
    title: 'Подарки на День Рождения',
    description: 'Универсальные и тематические подарки для именинников',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    category: 'gifts',
    items: birthdayGifts.map(gift => ({ module: 'gifts', data: gift }))
  },
  {
    id: '7',
    module: 'gifts',
    title: 'Подарки для неё',
    description: 'Идеи, которые порадуют любую девушку или женщину',
    image: 'https://images.unsplash.com/photo-1489269637500-aa0e75768394?w=600&h=400&fit=crop',
    category: 'gifts',
    items: giftsForHer.map(gift => ({ module: 'gifts', data: gift }))
  },
  {
    id: '8',
    module: 'gifts',
    title: 'Подарки для него',
    description: 'Стильные и практичные подарки для мужчин',
    image: 'https://images.unsplash.com/photo-1603202662766-925f3eb6ba32?w=600&h=400&fit=crop',
    category: 'gifts',
    items: giftsForHim.map(gift => ({ module: 'gifts', data: gift }))
  }
];
// src/app/collections/data/skincare.ts
import { Collection } from '@/types/collections';
import type { SkincareProduct } from '@/types/skincare';

const drySkinProducts: SkincareProduct[] = [
  {
    id: 's1',
    name: 'Увлажняющий крем с гиалуроновой кислотой',
    brand: 'La Roche-Posay',
    description: 'Интенсивный увлажняющий уход для сухой и чувствительной кожи. Восстанавливает защитный барьер.',
    price: '1 890 ₽',
    recommended_product_type: 'Увлажняющий крем',
    key_ingredients: ['Гиалуроновая кислота', 'Масло ши', 'Ниацинамид'],
    features: [
      'Увлажняет на 24 часа',
      'Не забивает поры',
      'Подходит для чувствительной кожи'
    ],
    reasons: [
      'Идеален для сухой кожи',
      'Дерматологически протестирован',
      'Экономичный расход'
    ],
    purchaseLink: 'https://example.com/laroche',
    tags: ['увлажнение', 'сухая кожа', 'аптека'],
    image: 'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400&h=300&fit=crop',
    size: '50 мл'
  },
  {
    id: 's2',
    name: 'Ночное восстанавливающее масло',
    brand: 'Kiehl\'s',
    description: 'Ночное масло с каннабидиолом и скваланом для интенсивного восстановления сухой кожи.',
    price: '3 490 ₽',
    recommended_product_type: 'Ночное масло',
    key_ingredients: ['Сквалан', 'Каннабидиол', 'Масло примулы'],
    features: [
      'Восстанавливает за ночь',
      'Убирает шелушения',
      'Придает сияние'
    ],
    reasons: [
      'Роскошный уход',
      'Натуральные компоненты',
      'Эффект заметен с утра'
    ],
    purchaseLink: 'https://example.com/kieth',
    tags: ['масло', 'ночной уход', 'люкс'],
    image: 'https://images.unsplash.com/photo-1608248597279-9b4b5e9d1b7a?w=400&h=300&fit=crop',
    size: '30 мл'
  }
];

const oilySkinProducts: SkincareProduct[] = [
  {
    id: 's3',
    name: 'Себорегулирующий тоник',
    brand: 'CeraVe',
    description: 'Тоник с салициловой кислотой для жирной и проблемной кожи. Сужает поры и матирует.',
    price: '1 290 ₽',
    recommended_product_type: 'Тоник',
    key_ingredients: ['Салициловая кислота', 'Ниацинамид', 'Керамиды'],
    features: [
      'Матирует на 8 часов',
      'Сужает поры',
      'Не сушит'
    ],
    reasons: [
      'Доступная цена',
      'Доказанная эффективность',
      'Подходит для ежедневного использования'
    ],
    purchaseLink: 'https://example.com/cerave',
    tags: ['жирная кожа', 'поры', 'матовость'],
    image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=400&h=300&fit=crop',
    size: '200 мл'
  },
  {
    id: 's4',
    name: 'Матирующая эмульсия',
    brand: 'Vichy',
    description: 'Легкая эмульсия для жирной кожи с эффектом матирования и увлажнения.',
    price: '1 590 ₽',
    recommended_product_type: 'Дневной крем',
    key_ingredients: ['Салициловая кислота', 'Термальная вода', 'Глицерин'],
    features: [
      'Матирует до 12 часов',
      'Контроль себума',
      'Увлажняет'
    ],
    reasons: [
      'Невесомая текстура',
      'Подходит под макияж',
      'Удобный флакон'
    ],
    purchaseLink: 'https://example.com/vichy',
    tags: ['жирная кожа', 'матирование', 'легкий'],
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=400&h=300&fit=crop',
    size: '50 мл'
  }
];

const sensitiveSkinProducts: SkincareProduct[] = [
  {
    id: 's5',
    name: 'Успокаивающий крем-гель',
    brand: 'Avene',
    description: 'Интенсивный успокаивающий уход для чувствительной и реактивной кожи.',
    price: '1 790 ₽',
    recommended_product_type: 'Успокаивающий крем',
    key_ingredients: ['Термальная вода Avene', 'Цинк', 'Масло карите'],
    features: [
      'Снимает покраснения',
      'Успокаивает мгновенно',
      'Не содержит отдушек'
    ],
    reasons: [
      'Гипоаллергенно',
      'Минимальный состав',
      'Подходит для младенцев'
    ],
    purchaseLink: 'https://example.com/avene',
    tags: ['чувствительная кожа', 'успокоение', 'аптека'],
    image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=400&h=300&fit=crop',
    size: '40 мл'
  }
];

const spfProducts: SkincareProduct[] = [
  {
    id: 's6',
    name: 'Солнцезащитный флюид SPF 50+',
    brand: 'La Roche-Posay',
    description: 'Невесомый флюид для защиты кожи от UVA/UVB лучей. Подходит для чувствительной кожи.',
    price: '1 490 ₽',
    recommended_product_type: 'SPF',
    key_ingredients: ['Мексиорил XL', 'Термальная вода', 'Ниацинамид'],
    features: [
      'Максимальная защита',
      'Невесомая текстура',
      'Не оставляет следов'
    ],
    reasons: [
      'Лучший SPF для города',
      'Подходит под макияж',
      'Не липкий'
    ],
    purchaseLink: 'https://example.com/laroche-spf',
    tags: ['spf', 'защита', 'легкий'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
    size: '50 мл'
  }
];

export const skincareCollections: Collection[] = [
  {
    id: '14',
    module: 'skincare',
    title: 'Уход для сухой кожи',
    description: 'Интенсивное увлажнение и питание для сухой и обезвоженной кожи',
    image: 'https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=600&h=400&fit=crop',
    category: 'skincare',
    items: drySkinProducts.map(product => ({ module: 'skincare', data: product }))
  },
  {
    id: '15',
    module: 'skincare',
    title: 'Для жирной и проблемной кожи',
    description: 'Средства, которые матируют, сужают поры и контролируют себум',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=600&h=400&fit=crop',
    category: 'skincare',
    items: oilySkinProducts.map(product => ({ module: 'skincare', data: product }))
  },
  {
    id: '16',
    module: 'skincare',
    title: 'Для чувствительной кожи',
    description: 'Мягкий уход без отдушек и агрессивных компонентов',
    image: 'https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=600&h=400&fit=crop',
    category: 'skincare',
    items: sensitiveSkinProducts.map(product => ({ module: 'skincare', data: product }))
  },
  {
    id: '17',
    module: 'skincare',
    title: 'SPF-защита',
    description: 'Солнцезащитные средства для ежедневного использования',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop',
    category: 'skincare',
    items: spfProducts.map(product => ({ module: 'skincare', data: product }))
  }
];
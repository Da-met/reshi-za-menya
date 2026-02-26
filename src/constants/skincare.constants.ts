// src/constants/skincare.constants.ts

// Типы кожи
export const SKIN_TYPES = [
  { id: 'normal', label: 'Нормальная', emoji: '😊', description: 'Сбалансированная кожа без проблем' },
  { id: 'dry', label: 'Сухая', emoji: '🍂', description: 'Чувство стянутости, шелушения' },
  { id: 'oily', label: 'Жирная', emoji: '✨', description: 'Блеск, расширенные поры' },
  { id: 'combination', label: 'Комбинированная', emoji: '🎭', description: 'Жирная Т-зона, сухие щеки' },
  { id: 'sensitive', label: 'Чувствительная', emoji: '🌿', description: 'Склонность к раздражениям' },
  { id: 'mature', label: 'Зрелая', emoji: '👵', description: 'Морщины, потеря упругости' },
  { id: 'acne-prone', label: 'Склонная к акне', emoji: '🔴', description: 'Высыпания, воспаления' },
  { id: 'dehydrated', label: 'Обезвоженная', emoji: '💧', description: 'Нехватка влаги, тусклость' },
] as const;

// Лейблы для отображения
export const skinTypeLabels: Record<string, string> = {
  'normal': 'Нормальная',
  'dry': 'Сухая',
  'oily': 'Жирная',
  'combination': 'Комбинированная',
  'sensitive': 'Чувствительная',
  'mature': 'Зрелая',
  'acne-prone': 'Склонная к акне',
  'dehydrated': 'Обезвоженная'
};

// Типы продуктов
export const PRODUCT_TYPES = [
  { 
    id: 'cleanser', 
    label: 'Очищение', 
    icon: '🧼',
    description: 'Гели, пенки, мицеллярная вода' 
  },
  { 
    id: 'toner', 
    label: 'Тоник', 
    icon: '💧',
    description: 'Тонизирующие лосьоны' 
  },
  { 
    id: 'serum', 
    label: 'Сыворотка', 
    icon: '🌟',
    description: 'Концентрированные активы' 
  },
  { 
    id: 'moisturizer', 
    label: 'Увлажнение', 
    icon: '💦',
    description: 'Кремы, эмульсии' 
  },
  { 
    id: 'eye-cream', 
    label: 'Для глаз', 
    icon: '👁️',
    description: 'Кремы для области глаз' 
  },
  { 
    id: 'sunscreen', 
    label: 'Солнцезащита', 
    icon: '☀️',
    description: 'SPF средства' 
  },
  { 
    id: 'mask', 
    label: 'Маски', 
    icon: '🧖',
    description: 'Тканевые, глиняные' 
  },
  { 
    id: 'exfoliator', 
    label: 'Пилинг', 
    icon: '✨',
    description: 'Эксфолианты, кислоты' 
  },
] as const;

export const productTypeLabels: Record<string, string> = {
  'cleanser': 'Очищение',
  'toner': 'Тоник',
  'serum': 'Сыворотка',
  'moisturizer': 'Увлажнение',
  'eye-cream': 'Для глаз',
  'sunscreen': 'Солнцезащита',
  'mask': 'Маски',
  'exfoliator': 'Пилинг',
  'treatment': 'Лечение',
  'oil': 'Масло',
  'mist': 'Спрей',
  'set': 'Набор'
};

// Проблемы кожи
export const CONCERNS = [
  { id: 'acne', label: 'Акне', emoji: '🔴' },
  { id: 'dryness', label: 'Сухость', emoji: '🍂' },
  { id: 'oiliness', label: 'Жирность', emoji: '✨' },
  { id: 'pigmentation', label: 'Пигментация', emoji: '🎨' },
  { id: 'wrinkles', label: 'Морщины', emoji: '👵' },
  { id: 'redness', label: 'Покраснения', emoji: '🌡️' },
  { id: 'pores', label: 'Поры', emoji: '🔍' },
  { id: 'dullness', label: 'Тусклость', emoji: '😶' },
  { id: 'sensitivity', label: 'Чувствительность', emoji: '🌿' },
  { id: 'hydration', label: 'Обезвоженность', emoji: '💧' },
  { id: 'dark-circles', label: 'Темные круги', emoji: '👁️' },
  { id: 'scarring', label: 'Постакне', emoji: '🔲' }
] as const;

export const concernLabels: Record<string, string> = {
  'acne': 'Акне',
  'dryness': 'Сухость',
  'oiliness': 'Жирность',
  'pigmentation': 'Пигментация',
  'wrinkles': 'Морщины',
  'redness': 'Покраснения',
  'pores': 'Поры',
  'dullness': 'Тусклость',
  'sensitivity': 'Чувствительность',
  'hydration': 'Обезвоженность',
  'dark-circles': 'Темные круги',
  'scarring': 'Постакне'
};

// Возрастные группы
export const AGE_GROUPS = [
  { id: 'teen', label: 'Подросток' },
  { id: 'young', label: '20-30 лет' },
  { id: 'mature', label: '30-45 лет' },
  { id: '40plus', label: '40+' },
  { id: '50plus', label: '50+' }
] as const;

export const ageGroupLabels: Record<string, string> = {
  'teen': 'Подросток',
  'young': '20-30 лет',
  'mature': '30-45 лет',
  '40plus': '40+',
  '50plus': '50+'
};

// Бюджеты
export const BUDGET_RANGES = [
  { id: 'до 1000 ₽', label: 'до 1000 ₽' },
  { id: '1000-2000 ₽', label: '1000-2000 ₽' },
  { id: '2000-3000 ₽', label: '2000-3000 ₽' },
  { id: '3000-5000 ₽', label: '3000-5000 ₽' },
  { id: '5000+ ₽', label: '5000+ ₽' }
] as const;


// Баннер для модуля 
export const SKIN_BANNER = {
  title: "Персональный подбор ухода",
  description: "Средства по типу кожи и потребностям",
  route: "/skincare",
  emoji: "💆"
} as const;

// Уровни безопасности (из IngredientAnalysis.safety)
export const SAFETY_LEVELS = {
  excellent: { 
    label: 'Отлично', 
    color: 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300',
    icon: 'CheckCircle'
  },
  good: { 
    label: 'Хорошо', 
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
    icon: 'CheckCircle'
  },
  warning: { 
    label: 'Внимание', 
    color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
    icon: 'AlertTriangle'
  },
  danger: { 
    label: 'Опасно', 
    color: 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300',
    icon: 'Flame'
  },
} as const;

// Уровни комедогенности (0-5)
export const COMEDOGENIC_RATINGS = [
  { value: 0, label: 'Не комедогенно', color: 'text-green-600' },
  { value: 1, label: 'Низкая', color: 'text-green-600' },
  { value: 2, label: 'Умеренная', color: 'text-yellow-600' },
  { value: 3, label: 'Высокая', color: 'text-red-600' },
  { value: 4, label: 'Очень высокая', color: 'text-red-600' },
  { value: 5, label: 'Максимальная', color: 'text-red-600' },
] as const;

// Уровни раздражения
export const IRRITANCY_LEVELS = {
  low: { label: 'Низкий', color: 'text-green-600' },
  medium: { label: 'Средний', color: 'text-yellow-600' },
  high: { label: 'Высокий', color: 'text-red-600' },
} as const;


export const POPULAR_PRODUCTS = [
  'La Roche-Posay Effaclar H',
  'Cerave Увлажняющий крем для лица',
  'The Ordinary Niacinamide 10% + Zinc 1%',
  'Cosrx Advanced Snail 96 Mucin Power Essence',
  'Nivea Soft увлажняющий крем',
  'Garnier BB Cream для проблемной кожи',
  'L\'Oreal Paris Revitalift Филлер',
  'Vichy Liftactiv Сыворотка',
  'Avene Cleanance КОМЕДОГЕН',
  'Bioderma Sensibio H2O Мицеллярная вода'
] as const;


// Баннер для модуля
export const ANALYZER_BANNER = {
  title: "Разбери состав косметики",
  description: "Узнай, что на самом деле в твоих средствах для ухода",
  route: "/analyzer",
  emoji: "🧪"
} as const;
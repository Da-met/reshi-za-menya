// src/constants/food.constants.ts

// Типы блюд
export const DISH_TYPES = [
  // { id: 'breakfast', label: 'Завтрак' },
  // { id: 'lunch', label: 'Обед' },
  // { id: 'dinner', label: 'Ужин' },
  { id: 'main', label: 'Основное блюдо' },
  { id: 'soup', label: 'Суп' },
  { id: 'side', label: 'Гарнир' },
  { id: 'salad', label: 'Салат' },
  { id: 'appetizer', label: 'Закуска' },
  { id: 'snack', label: 'Перекус' },
  { id: 'dessert', label: 'Десерт' },
  { id: 'baking', label: 'Выпечка' },
  { id: 'drink', label: 'Напиток' },
  { id: 'sauce', label: 'Соус' },
  { id: 'preserve', label: 'Заготовки' }
] as const;

export const dishTypeLabels: Record<string, string> = {
  'breakfast': 'Завтрак',
  'lunch': 'Обед',
  'dinner': 'Ужин',
  'dessert': 'Десерт',
  'snack': 'Перекус'
};

// Время приготовления
export const COOKING_TIMES = [
  { id: '<15', label: 'До 15 минут', emoji: '⚡' },
  { id: '<30', label: 'До 30 минут', emoji: '🕒' },
  { id: '<45', label: 'До 45 минут', emoji: '🕓' },
  { id: '<60', label: 'До 60 минут', emoji: '🕔' },
  { id: '>60', label: 'Более 60 минут', emoji: '🐢' }
] as const;

// Кухни мира
export const CUISINES = [
  { id: 'russian', label: 'Русская' },
  { id: 'italian', label: 'Итальянская' },
  { id: 'asian', label: 'Азиатская' },
  { id: 'georgian', label: 'Грузинская' },
  { id: 'mexican', label: 'Мексиканская' },
  { id: 'french', label: 'Французская' },
  { id: 'indian', label: 'Индийская' },
  { id: 'american', label: 'Американская' },
  { id: 'mediterranean', label: 'Средиземноморская' },
] as const;

export const cuisineLabels: Record<string, string> = {
  'russian': 'Русская',
  'italian': 'Итальянская',
  'asian': 'Азиатская',
  'georgian': 'Грузинская',
  'mexican': 'Мексиканская'
};


// Заглушка для пустых состояний
export const EMPTY_RECIPE = {
  title: "Нет рецепта",
  description: "Начните с выбора продуктов или названия блюда"
} as const;


// ЦЕЛИ ПИТАНИЯ
export const HEALTH_GOALS = [
  { id: 'weight_loss', label: 'Похудение' },
  { id: 'weight_gain', label: 'Набор массы' },
  { id: 'maintenance', label: 'Поддержание веса' },
  { id: 'detox', label: 'Детокс' },
  { id: 'sports', label: 'Спортивное' },
  { id: 'healthy', label: 'Здоровое питание' },
  { id: 'kids', label: 'Детское меню' },
  { id: 'dietary', label: 'Диетическое' }
] as const;

// КАЛОРИЙНОСТЬ
export const CALORIE_RANGES = [
  { id: 'low', label: 'Низкая (200-300 ккал)' },
  { id: 'medium_low', label: 'Ниже среднего (300-400 ккал)' },
  { id: 'medium', label: 'Средняя (400-500 ккал)' },
  { id: 'medium_high', label: 'Выше среднего (500-600 ккал)' },
  { id: 'high', label: 'Высокая (600-800 ккал)' },
  { id: 'very_high', label: 'Очень высокая (>800 ккал)' }
] as const;

// ИСКЛЮЧЕНИЯ ПО СОСТАВУ
export const EXCLUDE_COMPOSITION = [
  { id: 'sugar', label: 'Без сахара' },
  { id: 'oil', label: 'Без масла' },
  { id: 'flour', label: 'Без муки' },
  { id: 'fried', label: 'Не жареное' },
  { id: 'spicy', label: 'Не острое' },
  { id: 'fatty', label: 'Не жирное' },
  { id: 'smoked', label: 'Не копченое' },
  { id: 'canned', label: 'Не консервированное' }
] as const;

// ДИЕТЫ
export const DIETS = [
  { id: 'vegetarian', label: 'Вегетарианское' },
  { id: 'vegan', label: 'Веганское' },
  { id: 'gluten-free', label: 'Без глютена' },
  { id: 'lactose-free', label: 'Без лактозы' },
  { id: 'keto', label: 'Кето' },
  { id: 'high-protein', label: 'Высокобелковое' },
  { id: 'low-carb', label: 'Низкоуглеводное' },
  { id: 'low-fat', label: 'Низкожирное' },
  { id: 'mediterranean', label: 'Средиземноморская' },
] as const;

// АЛЛЕРГЕНЫ
export const ALLERGENS = [
  { id: 'nuts', label: 'Орехи' },
  { id: 'peanuts', label: 'Арахис' },
  { id: 'seafood', label: 'Морепродукты' },
  { id: 'fish', label: 'Рыба' },
  { id: 'eggs', label: 'Яйца' },
  { id: 'milk', label: 'Молоко' },
  { id: 'gluten', label: 'Глютен' },
  { id: 'soy', label: 'Соя' },
  { id: 'sesame', label: 'Кунжут' },
  { id: 'mustard', label: 'Горчица' },
  { id: 'celery', label: 'Сельдерей' },
  { id: 'sulfites', label: 'Сульфиты' },
  { id: 'honey', label: 'Мед' }
] as const;

// ПОВОДЫ
export const OCCASIONS = [
  { id: 'everyday', label: 'На каждый день' },
  { id: 'holiday', label: 'Праздник' },
  { id: 'romantic', label: 'Романтический ужин' },
  { id: 'kids', label: 'Для детей' },
  { id: 'party', label: 'Вечеринка' },
  { id: 'picnic', label: 'Пикник' },
  { id: 'breakfast', label: 'Завтрак' },
  { id: 'brunch', label: 'Бранч' },
  { id: 'dinner_party', label: 'Званый ужин' },
  { id: 'fasting', label: 'Пост' }
] as const;

// СЛОЖНОСТЬ
export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Легко' },
  { id: 'medium', label: 'Средне' },
  { id: 'hard', label: 'Сложно' },
  { id: 'chef', label: 'Для профи' }
] as const;

// СПОСОБЫ ПРИГОТОВЛЕНИЯ
export const COOKING_METHODS = [
  { id: 'oven', label: 'В духовке' },
  { id: 'stove', label: 'На плите' },
  { id: 'multicooker', label: 'В мультиварке' },
  { id: 'grill', label: 'На гриле' },
  { id: 'no-cook', label: 'Без варки' },
  { id: 'steam', label: 'На пару' },
  { id: 'microwave', label: 'Микроволновка' },
  { id: 'airfryer', label: 'Аэрогриль' },
  { id: 'slow_cooker', label: 'Медленная варка' },
  { id: 'raw', label: 'Сыроедение' },
  { id: 'fermentation', label: 'Ферментация' },
  { id: 'canning', label: 'Консервация' }
] as const;


// КОЛИЧЕСТВО ПОРЦИЙ
export const SERVINGS = [
  { id: '1', label: '1 порция' },
  { id: '2', label: '2 порции' },
  { id: '3', label: '3 порции' },
  { id: '4', label: '4 порции' },
  { id: '5', label: '5 порций' },
  { id: '6', label: '6 порций' },
  { id: '8', label: '8 порций' },
  { id: '10', label: '10 порций' },
  { id: '12', label: '12 порций' }
] as const;




// Баннер для модуля (как в skincare)
export const FOOD_BANNER = {
  title: "Что приготовить сегодня?",
  description: "Рецепты из ваших продуктов или по названию блюда",
  route: "/food",
  emoji: "🍳"
} as const;
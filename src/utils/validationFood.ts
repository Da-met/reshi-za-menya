export const forbiddenWords = [
  "говно", "дерьмо", "блять", "пизда", "хуй", "ебать", "хер", "блядь",
  "памперс", "подгузник", "презерватив", "сигареты", "сигара", "алкоголь",
  "водка", "пиво", "вино", "коньяк", "наркотики", "марихуана", "героин",
  "оружие", "пистолет", "нож", "яд", "токсины", "химикаты", "лекарства",
  "таблетки", "кал", "моча", "рвота", "сопли", "кровь"
];

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateProduct = (product: string): ValidationResult => {
  const cleanProduct = product.toLowerCase().trim();
  
  if (!cleanProduct) {
    return { isValid: false, error: 'Введите название продукта' };
  }
  
  // Разбиваем на слова и проверяем каждое на точное совпадение
  const words = cleanProduct.split(/\s+/);
  
  // Проверка на запрещенные слова (точное совпадение)
  const hasForbiddenWord = words.some(word => 
    forbiddenWords.some(forbidden => 
      word === forbidden // ТОЧНОЕ совпадение, а не частичное
    )
  );
  
  if (hasForbiddenWord) {
    return { isValid: false, error: 'Некорректное название продукта' };
  }
  
  // Проверка длины
  if (cleanProduct.length < 2) {
    return { isValid: false, error: 'Название слишком короткое' };
  }
  
  if (cleanProduct.length > 30) {
    return { isValid: false, error: 'Название слишком длинное' };
  }
  
  // Проверка на только цифры
  if (/^\d+$/.test(cleanProduct)) {
    return { isValid: false, error: 'Название не может состоять только из цифр' };
  }
  
  // Проверка на специальные символы
  if (/[!@#$%^&*()_+=<>?/\\|{}[\]]/.test(cleanProduct)) {
    return { isValid: false, error: 'Недопустимые символы в названии' };
  }
  
  return { isValid: true };
};

// Валидация для названий блюд (более строгая)
export const validateDishName = (dishName: string): ValidationResult => {
  const cleanDishName = dishName.toLowerCase().trim();
  
  if (!cleanDishName) {
    return { isValid: false, error: 'Введите название блюда' };
  }
  
  // Разбиваем на слова и проверяем каждое на точное совпадение
  const words = cleanDishName.split(/\s+/);
  
  // Проверка на запрещенные слова (точное совпадение)
  const hasForbiddenWord = words.some(word => 
    forbiddenWords.some(forbidden => 
      word === forbidden // ТОЧНОЕ совпадение, а не частичное
    )
  );
  
  if (hasForbiddenWord) {
    return { isValid: false, error: 'Некорректное название блюда' };
  }
  
  // Проверка длины для блюд
  if (cleanDishName.length < 2) {
    return { isValid: false, error: 'Название блюда слишком короткое' };
  }
  
  if (cleanDishName.length > 50) {
    return { isValid: false, error: 'Название блюда слишком длинное' };
  }
  
  // Проверка на только цифры
  if (/^\d+$/.test(cleanDishName)) {
    return { isValid: false, error: 'Название блюда не может состоять только из цифр' };
  }
  
  // Более строгая проверка символов для блюд
  if (/[!@#$%^&*()_+=<>?/\\|{}[\]]/.test(cleanDishName)) {
    return { isValid: false, error: 'Недопустимые символы в названии блюда' };
  }
  
  return { isValid: true };
};
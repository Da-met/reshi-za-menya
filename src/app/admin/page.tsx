'use client';

import { useState } from 'react';
import { TestVariables, TestResult, Prompt } from '@/types/prompt';
import { adminModules } from '@/config/admin-modules';
import { Save, Play, Eye, EyeOff, CheckCircle, XCircle, ChevronDown, ChevronRight } from 'lucide-react';

// Моковые данные - в реальности будут с API
const mockPrompts: Prompt[] = [
  // 🍳 Что приготовить
  {
    id: 'cooking-products',
    moduleName: 'cooking',
    promptKey: 'by_products',
    text: `ТЫ — ШЕФ-ПОВАР. Создай вкусный рецепт на основе продуктов пользователя.

# КРИТИЧЕСКИЕ ПРАВИЛА:
• Используй МАКСИМУМ продуктов из списка: {products}
• НИКОГДА не используй исключенные ингредиенты: {excludeIngredients}
• Строго соблюдай диету: {diet}
• Учти аллергены: {allergens}
• Уложись точно во время приготовления: {cookingTime}
• Сохрани баланс вкусов и текстур
• Рецепт должен быть безопасным и выполнимым

# КУЛИНАРНЫЕ ПРИНЦИПЫ:
• Сочетаемость: мясо+овощи, крупы+овощи, молочное+мука
• Баланс: белки + углеводы + овощи
• Время приготовления:
  - <15 мин: быстрые закуски, смузи, салаты
  - <30 мин: простые горячие блюда, паста
  - <45 мин: блюда с подготовкой, запекание
  - <60 мин: сложные блюда, выпечка
  - >60 мин: долгое тушение, маринады

# ФИЛЬТРЫ И ПАРАМЕТРЫ:
• Тип блюда: {dishType}
• Кухня: {cuisine}
• Повод: {occasion}
• Сложность: {difficulty}
• Способ приготовления: {cookingMethod}

# ФОРМАТ ОТВЕТА:
Верни ответ СТРОГО в JSON формате:
{
  "recipe": {
    "id": "уникальный_id_рецепта",
    "title": "Название блюда",
    "description": "Аппетитное описание блюда (2-3 предложения)",
    "type": "{dishType}",
    "cuisine": "{cuisine}",
    "cookingTime": "35 минут",
    "difficulty": "{difficulty}",
    "servings": "2 порции",
    "ingredients": {
      "available": ["продукт1", "продукт2"],
      "toBuy": [
        {"name": "ингредиент", "quantity": "200г", "category": "овощи"},
        {"name": "специи", "quantity": "1 ч.л.", "category": "специи"}
      ]
    },
    "steps": [
      {"step": 1, "instruction": "Четкое описание шага", "time": "5 мин"},
      {"step": 2, "instruction": "Следующий шаг", "time": "10 мин"}
    ],
    "nutritionInfo": {
      "calories": "320 ккал",
      "protein": "15г",
      "carbs": "45г", 
      "fat": "8г"
    },
    "tips": ["Практичный совет 1", "Совет 2"],
    "equipment": ["сковорода", "нож", "разделочная доска"]
  },
  "generationId": "уникальный_id_генерации"
}

# ВАЖНО:
• Все измерения в метрической системе (граммы, миллилитры)
• Время указывай в минутах
• Порции рассчитывай на 2 человек
• Учитывай все фильтры и ограничения`,
    version: 1,
    isActive: true,
    description: 'Генерация рецептов по списку продуктов пользователя',
    variables: [
      'products', 'excludeIngredients', 'dishType', 'cookingTime', 
      'cuisine', 'diet', 'allergens', 'occasion', 'difficulty', 'cookingMethod'
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },

  // 🍳 Что приготовить - ПО НАЗВАНИЮ БЛЮДА
  {
    id: 'cooking-dish',
    moduleName: 'cooking', 
    promptKey: 'by_dish_name',
    text: `ТЫ — ШЕФ-ПОВАР. Создай аутентичный рецепт для конкретного блюда.

# КРИТИЧЕСКИЕ ПРАВИЛА:
• Сохрани СУТЬ и ХАРАКТЕР блюда: {dishName}
• НИКОГДА не используй исключенные ингредиенты: {excludeIngredients}
• Адаптируй разумно под ограничения если они есть
• Сохрани традиционные вкусы и текстуры
• Уложись точно во время приготовления: {cookingTime}
• Рецепт должен быть аутентичным но выполнимым

# АДАПТАЦИЯ:
• Если исключен ключевой ингредиент - найди разумную замену
• Если время указано мало - предложи ускоренную версию
• Сохрани баланс вкусов при адаптации
• Если ограничений нет - дай классический рецепт

# ФИЛЬТРЫ И ПАРАМЕТРЫ:
• Тип блюда: {dishType}
• Кухня: {cuisine}
• Диета: {diet}
• Аллергены: {allergens}
• Повод: {occasion}
• Сложность: {difficulty}
• Способ приготовления: {cookingMethod}

# ФОРМАТ ОТВЕТА:
Верни ответ СТРОГО в JSON формате:
{
  "recipe": {
    "id": "уникальный_id_рецепта", 
    "title": "{dishName}",
    "description": "Описание сохраняющее характер блюда",
    "type": "{dishType}",
    "cuisine": "{cuisine}",
    "cookingTime": "45 минут",
    "difficulty": "{difficulty}",
    "servings": "2 порции",
    "ingredients": {
      "available": [],
      "toBuy": [
        {"name": "основной ингредиент", "quantity": "500г", "category": "мясо"},
        {"name": "овощи", "quantity": "300г", "category": "овощи"},
        {"name": "специи", "quantity": "по вкусу", "category": "специи"}
      ]
    },
    "steps": [
      {"step": 1, "instruction": "Традиционный шаг приготовления", "time": "15 мин"},
      {"step": 2, "instruction": "Следующий этап", "time": "20 мин"}
    ],
    "nutritionInfo": {
      "calories": "450 ккал",
      "protein": "25г",
      "carbs": "35г",
      "fat": "12г"
    },
    "tips": ["Совет по адаптации", "Традиционный совет"],
    "equipment": ["кастрюля", "нож", "сковорода"]
  },
  "generationId": "уникальный_id_генерации"
}

# ВАЖНО:
• Сохрани аутентичность блюда
• Предложи разумные замены для исключенных ингредиентов
• Учитывай все диетические ограничения`,
    version: 1,
    isActive: true,
    description: 'Генерация рецепта по названию блюда с адаптацией',
    variables: [
      'dishName', 'excludeIngredients', 'dishType', 'cookingTime',
      'cuisine', 'diet', 'allergens', 'occasion', 'difficulty', 'cookingMethod'
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },

  // 🎁 Что подарить
  {
    id: 'gifts-interests',
    moduleName: 'gifts',
    promptKey: 'by_interests',
    text: `Ты — помощник по подбору подарков "Реши за меня". Твоя задача — генерировать персонализированные, практичные и креативные идеи подарков на основе введенных пользователем данных.

    **КОНТЕКСТ ПРИЛОЖЕНИЯ:**
    Пользователь не хочет просто список идей, он хочет максимально релевантный вариант, который можно сразу перевести в стадию покупки. Твоя рекомендация — это стартовая точка для действия.

    **ВХОДНЫЕ ДАННЫЕ:**
    {
    "category": "{category}",
    "profession": {profession},
    "interests": {interests},
    "personality": {personality},
    "budget": "{budget}",
    "occasion": "{occasion}",
    "giftTypes": {giftTypes},
    "age": "{age}",
    "gender": "{gender}",
    "excludeTitles": {excludeTitles}
    }

    **СТРОГИЕ ПРАВИЛА ГЕНЕРАЦИИ:**

    1.  **КОЛИЧЕСТВО:** Всегда генерируй **ТОЛЬКО ОДИН** самый релевантный и продуманный подарок. Никаких списков.
    2.  **СИНЕРГИЯ ХАРАКТЕРИСТИК:** Ты должен найти точку пересечения всех характеристик. Не просто "подарок для учителя", а "подарок для мамы-учителя, которая любит книги и садоводство". Соединяй черты характера, профессию и интересы.
    3.  **КОНКРЕТИКА:** Подарок должен быть максимально осязаемым. Вместо "что-то для сада" — "Набор для выращивания микрозелени на подоконнике с деревянным кашпо".
    4.  **ПРИМЕРЫ ТОВАРОВ:** В поле \`examples\` приведи 2-3 конкретных примера товаров, которые точно попадают под описание. Это критически важно для интеграции с маркетплейсами.
    5.  **ОБОСНОВАНИЕ:** В поле \`reasoning\` напиши краткое, убедительное объяснение (2-3 предложения), почему этот подарок идеален для данного человека. Это повысит доверие пользователя. Используй данные о характере, интересах и поводе.
    6.  **БЮДЖЕТ И ТИП:** Строго соблюдай указанный бюджет и тип подарка.

    **ФОРМАТ ОТВЕТА:**
    Ты должен вернуть ответ **ИСКЛЮЧИТЕЛЬНО В ВАЛИДНОМ JSON-ФОРМАТЕ**, без каких-либо дополнительных комментариев, отступов Markdown или текста до/после JSON.

    Обязательная структура JSON:
    {
    "gift": {
        "title": "Краткое и привлекательное название подарка",
        "description": "Более подробное описание (2-3 предложения), что это и почему это круто.",
        "type": "вещь", // (должно соответствовать одному из: вещь, впечатление, handmade)
        "price_range": "1000-3000₽", // (должно точно соответствовать входному бюджету)
        "examples": ["Конкретный товар 1", "Конкретный товар 2", "Конкретный товар 3"],
        "reasoning": "Здесь ты объясняешь, почему этот подарок идеально подходит маме-учителю, которая любит садоводство и книги, учитывая её заботливый характер и повод — День рождения."
    }
    }

    **ВАЖНО:** Если каких-то полей во входных данных нет, ты должен сделать предположение на основе категории и имеющихся данных, но никогда не выдумывай новые интересы или профессии.`,
    version: 1,
    isActive: true,
    description: 'Генерация подарков на основе интересов и характеристик',
    variables: ['category', 'profession', 'interests', 'personality', 'budget', 'occasion', 'giftTypes', 'age', 'gender', 'excludeTitles'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },

  // 🎬 Что посмотреть
  {
    id: 'movies-mood',
    moduleName: 'movies',
    promptKey: 'by_mood',
    text: `Ты — кинокритик. Подбери фильм по настроению и предпочтениям пользователя.

    ПАРАМЕТРЫ:
    • Настроение: {mood}
    • Жанр: {genre} 
    • Длительность: {duration}
    • Год: {year}
    • Исключить: {excludeTitles}

    Верни ОДИН фильм в JSON формате:
    {
    "movie": {
        "title": "Название фильма",
        "description": "Краткое описание сюжета",
        "genre": ["жанр1", "жанр2"],
        "year": "2023",
        "duration": "120 мин",
        "reasoning": "Почему этот фильм подходит под запрос",
        "where_to_watch": ["Кинопоиск", "Ivi", "Netflix"]
    }
    }`,
    version: 1,
    isActive: false,
    description: 'Генерация фильмов по настроению и предпочтениям',
    variables: ['mood', 'genre', 'duration', 'year', 'excludeTitles'],
    createdAt: '2024-01-01', 
    updatedAt: '2024-01-01'
  },

  // 📚 Что почитать
  {
    id: 'books-preferences',
    moduleName: 'books',
    promptKey: 'by_preferences', 
    text: `Ты — литературный критик. Подбери книгу по предпочтениям пользователя.

    ПАРАМЕТРЫ:
    • Жанр: {genre}
    • Настроение: {mood}
    • Объем: {length}
    • Год: {year}
    • Исключить: {excludeTitles}

    Верни ОДНУ книгу в JSON формате:
    {
    "book": {
        "title": "Название книги",
        "author": "Автор",
        "description": "Краткое описание",
        "genre": ["жанр1", "жанр2"],
        "year": "2023",
        "pages": "320",
        "reasoning": "Почему эта книга подходит под запрос",
        "where_to_buy": ["Литрес", "Читай-город", "Ozon"]
    }
    }`,
    version: 1,
    isActive: false,
    description: 'Генерация книг по жанрам и интересам',
    variables: ['genre', 'mood', 'length', 'year', 'excludeTitles'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

const variableSuggestions: Record<string, string[]> = {
    category: ['мама', 'папа', 'девушка', 'парень', 'друг', 'ребенок', 'коллега'],
    profession: ['IT-специалист', 'Врач', 'Учитель', 'Студент', 'Дизайнер', 'Бухгалтер', 'Юрист', 'Инженер', 'Повар'],
    interests: ['Книги', 'Спорт', 'Путешествия', 'Игры', 'Кулинария', 'Музыка', 'Садоводство', 'Фотография', 'Технологии'],
    personality: ['Юморист', 'Минималист', 'Романтик', 'Прагматик', 'Творческий', 'Экстраверт', 'Интроверт'],
    budget: ['до 1000₽', '1000-3000₽', '3000-5000₽', '5000+₽'],
    occasion: ['День рождения', 'Новый год', '8 Марта', '23 Февраля', 'Свадьба', 'Юбилей'],
    giftTypes: ['Вещь', 'Впечатление', 'Сделай сам'],
    age: ['ребенок', 'подросток', 'взрослый'],
    gender: ['мужской', 'женский', 'любой'],
    diet: ['обычная', 'вегетарианская', 'веганская', 'безглютеновая', 'безлактозная'],
    mood: ['радостное', 'грустное', 'романтическое', 'приключенческое', 'спокойное', 'вдохновляющее'],
    genre: ['комедия', 'драма', 'фантастика', 'боевик', 'мелодрама', 'триллер', 'детектив', 'фэнтези'],
    duration: ['короткий (до 90 мин)', 'средний (90-120 мин)', 'длинный (120+ мин)'],
    length: ['короткая (до 200 стр)', 'средняя (200-400 стр)', 'длинная (400+ стр)'],

    products: ['курица', 'рис', 'помидоры', 'яйца'],
    dishName: ['борщ', 'плов', 'паста'],
    excludeIngredients: ['лук', 'грибы', 'орехи'],
    dishType: ['завтрак', 'обед', 'ужин'],
    cookingTime: ['15 минут', '30 минут', '1 час'],
    cuisine: ['русская', 'итальянская'],
    allergens: ['орехи', 'молоко'],
    difficulty: ['легко', 'средне'],
    cookingMethod: ['духовка', 'плита']
  };

export default function AdminPage() {
  const [selectedModule, setSelectedModule] = useState(adminModules[0]);
  const [selectedPrompt, setSelectedPrompt] = useState(selectedModule.prompts[0]);
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);
  const [testVariables, setTestVariables] = useState<TestVariables>({});
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'cooking': true,
    'gifts': true,
    'movies': true,
    'books': true
  });

  const currentPrompt = prompts.find(
    p => p.moduleName === selectedModule.id && p.promptKey === selectedPrompt.key
  );

  const handleSave = async () => {
    // Здесь будет вызов API для сохранения
    console.log('Saving prompt:', currentPrompt);
    setIsEditing(false);
    // В реальности здесь будет вызов API
    alert('Промпт сохранен!');
  };

  const handleTest = async () => {
    try {
      // Здесь будет вызов API для тестирования
      const mockResult = {
        success: true,
        response: { 
          gift: { 
            title: 'Тестовый подарок',
            description: 'Это тестовый подарок для проверки работы промпта',
            type: 'Вещь',
            price_range: '1000-3000₽',
            examples: ['Пример товара 1', 'Пример товара 2'],
            reasoning: 'Этот подарок идеально подходит потому что...'
          }
        }
      };
      setTestResult(mockResult);
    } catch (error) {
      console.error('Ошибка тестирования:', error);
      setTestResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Неизвестная ошибка тестирования' 
      });
    }
  };

  const updatePromptText = (text: string) => {
    if (!currentPrompt) return;
    
    setPrompts(prev => prev.map(p => 
      p.id === currentPrompt.id 
        ? { ...p, text, version: p.version + 1 }
        : p
    ));
  };

  const updateTestVariable = (variable: string, value: string) => {
    setTestVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handlePublish = () => {
    if (!currentPrompt) return;
    
    setPrompts(prev => prev.map(p => 
      p.moduleName === currentPrompt.moduleName && p.promptKey === currentPrompt.promptKey
        ? { ...p, isActive: true }
        : { ...p, isActive: false }
    ));
    
    alert('Промпт опубликован!');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            АДМИН-ПАНЕЛЬ
          </h1>
          <p className="text-lg text-muted-foreground">
            Управление промптами для нейросети
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Боковая панель - навигация */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Модули</h2>
              
              <div className="space-y-2">
                {adminModules.map(module => {
                  const isExpanded = expandedModules[module.id];
                  
                  return (
                    <div key={module.id} className="mb-2">
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center justify-between"
                      >
                        <div className="font-medium">{module.name}</div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {/* Подпромпты модуля */}
                      {isExpanded && (
                        <div className="mt-2 ml-2 space-y-1">
                          {module.prompts.map(prompt => {
                            const promptData = prompts.find(p => 
                              p.moduleName === module.id && p.promptKey === prompt.key
                            );
                            
                            return (
                              <button
                                key={prompt.key}
                                onClick={() => {
                                  setSelectedModule(module);
                                  setSelectedPrompt(prompt);
                                }}
                                className={`w-full text-left p-2 rounded text-sm transition-colors flex items-center justify-between ${
                                  selectedModule.id === module.id && selectedPrompt.key === prompt.key
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                                }`}
                              >
                                <span className="truncate">{prompt.name}</span>
                                {promptData && (
                                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 ${
                                    promptData.isActive ? 'bg-green-500' : 'bg-yellow-500'
                                  }`} />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Основная область - редактирование */}
          <div className="lg:col-span-3 space-y-6">
            {currentPrompt ? (
              <>
                {/* Заголовок и действия */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedModule.name} - {selectedPrompt.name}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        {selectedPrompt.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className={`flex items-center gap-1 text-sm ${
                          currentPrompt.isActive ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {currentPrompt.isActive ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                          {currentPrompt.isActive ? 'Активен' : 'Черновик'}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Версия {currentPrompt.version}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Обновлен: {new Date(currentPrompt.updatedAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={handleTest}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Тест
                      </button>
                      {!currentPrompt.isActive && (
                        <button
                          onClick={handlePublish}
                          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          Опубликовать
                        </button>
                      )}
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Сохранить
                      </button>
                    </div>
                  </div>

                  {/* Переменные для тестирования */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {selectedPrompt.variables.map(variable => {
                        const russianKey = `${variable}_ru`;
                        const suggestions = variableSuggestions[variable] || [];
                        const russianSuggestions = variableSuggestions[russianKey] || [];
                        
                        return (
                        <div key={variable} className="space-y-2">
                            <label className="text-sm font-medium capitalize">
                            {variable.replace(/([A-Z])/g, ' $1')}
                            {russianSuggestions.length > 0 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                ({russianSuggestions.join(', ')})
                                </span>
                            )}
                            </label>
                            <input
                            type="text"
                            value={testVariables[variable] || ''}
                            onChange={(e) => updateTestVariable(variable, e.target.value)}
                            placeholder={
                                suggestions.length > 0 
                                ? `Например: ${suggestions[0]}`
                                : russianSuggestions.length > 0
                                ? `Например: ${russianSuggestions[0]}`
                                : `Введите ${variable}`
                            }
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                            list={`suggestions-${variable}`}
                            />
                            {suggestions.length > 0 && (
                            <datalist id={`suggestions-${variable}`}>
                                {suggestions.map(suggestion => (
                                <option key={suggestion} value={suggestion} />
                                ))}
                            </datalist>
                            )}
                        </div>
                        );
                    })}
                    </div>
                </div>

                {/* Редактор промпта */}
                <div className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Текст промпта</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm text-primary hover:underline px-3 py-1 border border-primary rounded"
                      >
                        {isEditing ? 'Предпросмотр' : 'Редактировать'}
                      </button>
                      <div className="text-sm text-muted-foreground px-3 py-1 border border-border rounded">
                        {currentPrompt.text.length} символов
                      </div>
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={currentPrompt.text}
                      onChange={(e) => updatePromptText(e.target.value)}
                      className="w-full h-96 px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm resize-none"
                      placeholder="Введите текст промпта..."
                    />
                  ) : (
                    <pre className="w-full h-96 px-3 py-2 border border-border rounded-lg bg-muted/50 overflow-auto whitespace-pre-wrap font-mono text-sm">
                      {currentPrompt.text}
                    </pre>
                  )}
                </div>

                {/* Результат тестирования */}
                {testResult && (
                  <div className={`rounded-lg border p-6 ${
                    testResult.success 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-center gap-2 mb-4">
                      {testResult.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <h3 className="text-lg font-semibold">
                        {testResult.success ? 'Тест пройден' : 'Ошибка тестирования'}
                      </h3>
                    </div>
                    
                    {testResult.success && testResult.response && (
                      <div>
                        <p className="text-sm text-green-700 mb-2">Нейросеть вернула валидный JSON:</p>
                        <pre className="text-sm bg-white p-4 rounded border overflow-auto max-h-64">
                          {JSON.stringify(testResult.response, null, 2)}
                        </pre>
                      </div>
                    )}
                    
                    {testResult.error && (
                      <div>
                        <p className="text-red-700 font-medium mb-2">Ошибка:</p>
                        <p className="text-red-700">{testResult.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  Выберите промпт для редактирования
                </h3>
                <p className="text-muted-foreground">
                  Выберите модуль и конкретный промпт из списка слева чтобы начать редактирование
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
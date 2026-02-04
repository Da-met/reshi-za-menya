import { Prompt, PromptParameter } from '@/types/prompt';

// Создаем интерфейсы для API данных
interface ApiParameter {
  parameterValue: string;
  comment?: string;
  [key: string]: unknown;
}

interface ApiPrompt {
  id: string | number;
  category: string;
  name: string;
  template: string;
  requiredParameters?: ApiParameter[];
  optionalParameters?: ApiParameter[];
  outputParameters?: ApiParameter[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

interface ApiPromptRequest {
  name: string;
  category: string;
  template: string;
  requiredParameters?: ApiParameter[];
  optionalParameters?: ApiParameter[];
  outputParameters?: ApiParameter[];
  [key: string]: unknown;
}

// Функция для преобразования ApiParameter в PromptParameter
const convertToPromptParameter = (apiParam: ApiParameter): PromptParameter => {
  return {
    parameterValue: apiParam.parameterValue,
    comment: apiParam.comment || '', // Добавляем comment по умолчанию
  };
};

// Функция для преобразования PromptParameter в ApiParameter
const convertToApiParameter = (promptParam: PromptParameter): ApiParameter => {
  return {
    parameterValue: promptParam.parameterValue,
    comment: promptParam.comment,
  };
};

export const apiToOurFormat = (apiData: ApiPrompt): Prompt => {
  return {
    id: apiData.id.toString(),
    moduleName: apiData.category,
    promptKey: apiData.name, // ИЗМЕНЕНИЕ: оставляем как есть, без .toLowerCase()
    text: apiData.template,
    description: apiData.name, // description = name из API
    variables: [...(apiData.requiredParameters?.map((p: ApiParameter) => p.parameterValue) || [])],
    requiredParameters: apiData.requiredParameters?.map(convertToPromptParameter) || [],
    optionalParameters: apiData.optionalParameters?.map(convertToPromptParameter) || [],
    outputParameters: apiData.outputParameters?.map(convertToPromptParameter) || [],
    createdAt: apiData.createdAt || new Date().toISOString(),
    updatedAt: apiData.updatedAt || new Date().toISOString()
  };
};

export const ourFormatToApi = (ourData: Prompt): ApiPromptRequest => {
  return {
    name: ourData.promptKey, // ИЗМЕНЕНИЕ: отправляем promptKey как name
    category: ourData.moduleName,
    template: ourData.text,
    requiredParameters: ourData.requiredParameters.map(convertToApiParameter),
    optionalParameters: ourData.optionalParameters.map(convertToApiParameter),
    outputParameters: ourData.outputParameters.map(convertToApiParameter),
  };
};

// Загрузка промптов по категории
export const fetchPromptsByCategory = async (category: string): Promise<Prompt[]> => {
  const response = await fetch(`/api/prompt-templates/category/${category}`);
  if (!response.ok) {
    return [];
  }
  const apiData = await response.json() as ApiPrompt[];
  return apiData.map(apiToOurFormat);
};

// Загрузка всех промптов
export const fetchAllPrompts = async (): Promise<Prompt[]> => {
  try {
    const response = await fetch('/api/prompt-templates/');
    const apiData = await response.json() as ApiPrompt[];
    return apiData.map(apiToOurFormat);
  } catch {
    console.log('API недоступно');
    return [];
  }
};

// Сохранение промпта
export const savePrompt = async (prompt: Prompt): Promise<void> => {
  const apiData = ourFormatToApi(prompt);

  if (prompt.id.startsWith('new-')) {
    // Создание нового промпта
    await fetch('/api/prompt-templates/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData)
    });
  } else {
    // Обновление существующего промпта - важно: ID в URL, но не в теле!
    await fetch(`/api/prompt-templates/${prompt.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData)
    });
  }
};

// Удаление промпта
export const deletePrompt = async (promptId: string): Promise<void> => {
  await fetch(`/api/prompt-templates/${promptId}`, {
    method: 'DELETE'
  });
};
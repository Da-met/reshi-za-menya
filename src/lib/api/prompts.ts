import { Prompt } from '@/types/prompt';

export const apiToOurFormat = (apiData: any): Prompt => {
  return {
    id: apiData.id.toString(),
    moduleName: apiData.category, // Сохраняем оригинальную категорию
    promptKey: apiData.name.toLowerCase(),
    text: apiData.template,
    description: apiData.name,
    variables: [...(apiData.requiredParameters?.map((p: any) => p.parameterValue) || [])],
    requiredParameters: apiData.requiredParameters || [],
    optionalParameters: apiData.optionalParameters || [],
    outputParameters: apiData.outputParameters || [],
    createdAt: apiData.createdAt,
    updatedAt: apiData.updatedAt
  };
};

export const ourFormatToApi = (ourData: Prompt): any => {
  return {
    name: ourData.description,
    category: ourData.moduleName,
    template: ourData.text,
    requiredParameters: ourData.requiredParameters,
    optionalParameters: ourData.optionalParameters,
    outputParameters: ourData.outputParameters,
  };
};

// Загрузка промптов по категории
export const fetchPromptsByCategory = async (category: string): Promise<Prompt[]> => {
  const response = await fetch(`/api/prompt-templates/category/${category}`);
  if (!response.ok) {
    return [];
  }
  const apiData = await response.json();
  return apiData.map(apiToOurFormat);
};

// Загрузка всех промптов
export const fetchAllPrompts = async (): Promise<Prompt[]> => {
  try {
    const response = await fetch('/api/prompt-templates/');
    const apiData = await response.json();
    return apiData.map(apiToOurFormat);
  } catch (error) {
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
    // Обновление существующего промпта
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
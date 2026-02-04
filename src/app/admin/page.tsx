// page.tsx - полностью обновленный

'use client';

import { useState, useEffect } from 'react';
import { adminModules } from '@/config/admin-modules';
import { Save, X } from 'lucide-react';
import { Prompt, AdminModule, AdminPrompt } from '@/types/prompt';
import { savePrompt, deletePrompt, fetchAllPrompts } from '@/lib/api/prompts';
import { ParametersEditor } from '@/components/admin/ParametersEditor';
import { PromptBasicInfo } from '@/components/admin/PromptBasicInfo';

export default function AdminPage() {
  const [selectedModule, setSelectedModule] = useState<AdminModule>(adminModules[0] as AdminModule);
  const [selectedPrompt, setSelectedPrompt] = useState<AdminPrompt>(adminModules[0].prompts[0] as AdminPrompt);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setNewlyCreatedPromptId] = useState<string | null>(null);

  // Загрузка промптов
  const loadPrompts = async () => {
    setIsLoading(true);
    try {
      const ourData = await fetchAllPrompts();
      setPrompts(ourData);
      console.log('📥 Все загруженные промпты:', ourData);
    } catch {
      console.log('API недоступно');
      setPrompts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление любого поля промпта
  const updatePromptField = (promptId: string, field: string, value: string) => {
    setPrompts(prev => prev.map(p =>
      p.id === promptId ? { ...p, [field]: value } : p
    ));
  };

  // Функции для параметров (без изменений)
  const addParameter = (promptId: string, paramType: 'required' | 'optional' | 'output') => {
    setPrompts(prev => prev.map(p =>
      p.id === promptId ? {
        ...p,
        [`${paramType}Parameters`]: [...p[`${paramType}Parameters`], { parameterValue: '', comment: '' }]
      } : p
    ));
  };

  const updateParameter = (
    promptId: string,
    paramType: 'required' | 'optional' | 'output',
    index: number,
    field: 'parameterValue' | 'comment',
    value: string
  ) => {
    setPrompts(prev => prev.map(p =>
      p.id === promptId ? {
        ...p,
        [`${paramType}Parameters`]: p[`${paramType}Parameters`].map((param, i) =>
          i === index ? { ...param, [field]: value } : param
        )
      } : p
    ));
  };

  const removeParameter = (
    promptId: string,
    paramType: 'required' | 'optional' | 'output',
    index: number
  ) => {
    setPrompts(prev => prev.map(p =>
      p.id === promptId ? {
        ...p,
        [`${paramType}Parameters`]: p[`${paramType}Parameters`].filter((_, i) => i !== index)
      } : p
    ));
  };

  // Функция сохранения
  const handleSavePrompt = async (prompt: Prompt) => {
    try {
      await savePrompt(prompt);
      alert('Сохранено!');
      loadPrompts(); // Это должно работать
    } catch {
      alert('Ошибка сохранения');
    }
  };

  // Функция удаления промпта
  const handleDeletePrompt = async (promptId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот промпт?')) {
      return;
    }

    try {
      await deletePrompt(promptId);
      alert('Промпт удален!');
      loadPrompts();
    } catch {
      alert('Ошибка удаления');
    }
  };

  // Создание нового промпта
  const createNewPrompt = () => {
    const newId = `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newPrompt: Prompt = {
      id: newId,
      moduleName: selectedModule.category,
      promptKey: selectedPrompt.key,
      text: 'Введите текст промпта здесь...',
      description: selectedPrompt.description,
      variables: [...selectedPrompt.variables],
      requiredParameters: [],
      optionalParameters: [],
      outputParameters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPrompts(prev => [...prev, newPrompt]);
    setNewlyCreatedPromptId(newId);
  };

  // Текущий выбранный промпт
  const currentPrompt = prompts.find(p => {
    const found = p.moduleName === selectedModule.category && p.promptKey === selectedPrompt.key;
    console.log('🔍 Поиск промпта:', {
      'moduleName из API': p.moduleName,
      'category из конфига': selectedModule.category,
      'promptKey из API': p.promptKey,
      'key из конфига': selectedPrompt.key,
      'совпадение': found
    });
    return found;
  });

  console.log('🎯 Найденный промпт:', currentPrompt);

  // Сбрасываем флаг нового промпта при смене выбора
  useEffect(() => {
    setNewlyCreatedPromptId(null);
  }, [selectedModule, selectedPrompt, setNewlyCreatedPromptId]);

  // Автозагрузка при открытии
  useEffect(() => {
    loadPrompts();
  }, []);

  // Функция выбора модуля и промпта
  const selectModuleAndPrompt = (module: AdminModule, prompt: AdminPrompt) => {
    setSelectedModule(module);
    setSelectedPrompt(prompt);
  };

  // Если промпт найден, показываем редактор
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок и кнопка обновления */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            РЕДАКТОР ПРОМПТОВ
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Редактирование промптов для нейросети
          </p>
          <button
            onClick={loadPrompts}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Загрузка...' : 'Обновить список'}
          </button>
        </header>

        {/* Отладочная информация */}
        {prompts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Загруженные промпты:</h3>
            {prompts.map(prompt => (
              <div key={prompt.id} className="text-sm text-blue-700 mb-2">
                <div><strong>ID:</strong> {prompt.id}</div>
                <div><strong>Модуль:</strong> {prompt.moduleName}</div>
                <div><strong>Ключ:</strong> {prompt.promptKey}</div>
                <div><strong>Текст:</strong> {prompt.text.substring(0, 50)}...</div>
              </div>
            ))}
          </div>
        )}

        {/* ГОРИЗОНТАЛЬНАЯ НАВИГАЦИЯ МОДУЛЕЙ */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {adminModules.map((module: AdminModule) => (
              <div key={module.id} className="flex flex-col">
                {/* Кнопка модуля */}
                <button
                  onClick={() => selectModuleAndPrompt(module, module.prompts[0] as AdminPrompt)}
                  className={`
                    px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium
                    ${selectedModule.id === module.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                    }
                  `}
                >
                  {module.name}
                  {module.prompts.length > 1 && (
                    <span className="ml-2 text-xs opacity-75 bg-white/20 px-1.5 py-0.5 rounded">
                      {module.prompts.length}
                    </span>
                  )}
                </button>

                {/* Подтабы для промптов внутри модуля (если больше одного) */}
                {module.prompts.length > 1 && selectedModule.id === module.id && (
                  <div className="flex gap-1 mt-2 ml-2">
                    {module.prompts.map((prompt: AdminPrompt) => (
                      <button
                        key={prompt.key}
                        onClick={() => selectModuleAndPrompt(module, prompt)}
                        className={`
                          px-3 py-1.5 rounded text-xs transition-colors
                          ${selectedPrompt.key === prompt.key
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                          }
                        `}
                      >
                        {prompt.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Информация о выбранном модуле */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedModule.name} {selectedModule.prompts.length > 1 && `→ ${selectedPrompt.name}`}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {selectedPrompt.description}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Категория: <code className="bg-muted px-2 py-1 rounded">{selectedModule.category}</code>
              </div>
            </div>
          </div>
        </div>

        {/* ОБЛАСТЬ РЕДАКТИРОВАНИЯ */}
        <div className="space-y-6">
          {currentPrompt ? (
            // Редактор существующего промпта
            <>
              <PromptBasicInfo
                prompt={currentPrompt}
                onUpdatePrompt={updatePromptField}
                selectedModule={selectedModule}
                selectedPrompt={selectedPrompt}
              />
              <ParametersEditor
                prompt={currentPrompt}
                onUpdateParameter={updateParameter}
                onAddParameter={addParameter}
                onRemoveParameter={removeParameter}
              />

              {/* Кнопки сохранить/удалить */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="text-sm text-muted-foreground text-center sm:text-left">
                    {currentPrompt.id.startsWith('new-')
                      ? 'Готовы сохранить новый промпт?'
                      : `Последнее изменение: ${new Date(currentPrompt.updatedAt).toLocaleDateString('ru-RU')}`
                    }
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSavePrompt(currentPrompt)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Сохранить
                    </button>
                    {!currentPrompt.id.startsWith('new-') && (
                      <button
                        onClick={() => handleDeletePrompt(currentPrompt.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Создание нового промпта
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <h3 className="text-xl font-semibold text-muted-foreground mb-4">
                Промпт не найден
              </h3>
              <p className="text-muted-foreground mb-4">
                Для &quot;{selectedModule.name}&quot; - &quot;{selectedPrompt.name}&quot;
              </p>
              <button
                onClick={createNewPrompt}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Создать новый промпт
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
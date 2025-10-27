'use client';

import { useState, useEffect } from 'react';
import { adminModules } from '@/config/admin-modules';
import { Save, ChevronDown, ChevronRight, Plus, X } from 'lucide-react';
import { Prompt, AdminModule, AdminPrompt } from '@/types/prompt';
import { savePrompt, deletePrompt, fetchAllPrompts } from '@/lib/api/prompts';
import { ParametersEditor } from '@/components/admin/ParametersEditor';
import { PromptBasicInfo } from '@/components/admin/PromptBasicInfo';

export default function AdminPage() {
  const [selectedModule, setSelectedModule] = useState<AdminModule>(adminModules[0] as AdminModule);
  const [selectedPrompt, setSelectedPrompt] = useState<AdminPrompt>(adminModules[0].prompts[0] as AdminPrompt);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [newlyCreatedPromptId, setNewlyCreatedPromptId] = useState<string | null>(null);

  // Загрузка промптов
  const loadPrompts = async () => {
    setIsLoading(true);
    try {
      const ourData = await fetchAllPrompts();
      setPrompts(ourData);
      
      console.log('📥 Все загруженные промпты:', ourData);
      
    } catch (error) {
      console.log('API недоступно');
      setPrompts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Обновление любого поля промпта
  const updatePromptField = (promptId: string, field: string, value: any) => {
    setPrompts(prev => prev.map(p =>
      p.id === promptId ? { ...p, [field]: value } : p
    ));
  };

  // Функции для параметров
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
      loadPrompts();
    } catch (error) {
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
    } catch (error) {
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
    setNewlyCreatedPromptId(newId); // Запоминаем ID нового промпта
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
  }, [selectedModule, selectedPrompt]);


  // Автозагрузка при открытии
  useEffect(() => {
    loadPrompts();
  }, []);


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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Боковая панель */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Модули</h2>
              <div className="space-y-2">
                {adminModules.map((module: AdminModule) => {
                  const isExpanded = expandedModules[module.id] ?? true;
                  
                  return (
                    <div key={module.id} className="mb-2">
                      <button
                        onClick={() => setExpandedModules(prev => ({
                          ...prev,
                          [module.id]: !isExpanded
                        }))}
                        className="w-full text-left p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center justify-between"
                      >
                        <div className="font-medium">{module.name}</div>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-2 ml-2 space-y-1">
                          {module.prompts.map((prompt: AdminPrompt) => (
                            <button
                              key={prompt.key}
                              onClick={() => {
                                setSelectedModule(module);
                                setSelectedPrompt(prompt);
                              }}
                              className={`w-full text-left p-2 rounded text-sm transition-colors ${
                                selectedModule.id === module.id && selectedPrompt.key === prompt.key
                                  ? 'bg-primary text-primary-foreground'
                                  : 'hover:bg-muted'
                              }`}
                            >
                              {prompt.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Область редактирования */}
          <div className="lg:col-span-3">
            {currentPrompt ? (
              // Редактор существующего промпта
              <div className="space-y-6">
                <PromptBasicInfo
                  prompt={currentPrompt!} // Добавьте ! здесь
                  onUpdatePrompt={updatePromptField}
                  selectedModule={selectedModule}
                  selectedPrompt={selectedPrompt}
                />
                <ParametersEditor
                  prompt={currentPrompt!} // Добавьте ! здесь
                  onUpdateParameter={updateParameter}
                  onAddParameter={addParameter}
                  onRemoveParameter={removeParameter}
                />
                
                {/* Кнопки сохранить/удалить */}
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                    <div className="text-sm text-muted-foreground text-center sm:text-left">
                      {currentPrompt!.id.startsWith('new-') // Добавьте ! здесь
                        ? 'Готовы сохранить новый промпт?'
                        : `Последнее изменение: ${new Date(currentPrompt!.updatedAt).toLocaleDateString('ru-RU')}` // Добавьте ! здесь
                      }
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSavePrompt(currentPrompt!)} // Добавьте ! здесь
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Сохранить
                      </button>
                      {!currentPrompt!.id.startsWith('new-') && ( // Добавьте ! здесь
                        <button
                          onClick={() => handleDeletePrompt(currentPrompt!.id)} // Добавьте ! здесь
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Удалить
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Создание нового промпта
              <div className="bg-card rounded-lg border border-border p-12 text-center">
                <h3 className="text-xl font-semibold text-muted-foreground mb-4">
                  Промпт не найден
                </h3>
                <p className="text-muted-foreground mb-4">
                  Для "{selectedModule.name}" - "{selectedPrompt.name}"
                </p>
                <button
                  onClick={createNewPrompt}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
                >
                  Создать новый промпт
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
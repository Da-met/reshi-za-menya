import { Prompt } from '@/types/prompt';

// Создаем интерфейсы для пропсов
interface AdminModule {
  id: string;
  name: string;
  category: string;
  prompts: readonly AdminPrompt[];
}

interface AdminPrompt {
  key: string;
  name: string;
  description: string;
  variables: readonly string[];
}

interface PromptBasicInfoProps {
  prompt: Prompt;
  onUpdatePrompt: (promptId: string, field: string, value: string) => void; // value всегда string
  selectedModule: AdminModule;
  selectedPrompt: AdminPrompt;
}

export const PromptBasicInfo: React.FC<PromptBasicInfoProps> = ({
  prompt,
  onUpdatePrompt,
  selectedModule,
  selectedPrompt,
}) => {
  return (
    <>
      {/* Заголовок */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div>
          <h2 className="text-xl font-semibold">
            {selectedModule.name} - {selectedPrompt.name}
          </h2>
          <p className="text-muted-foreground mt-1">
            {selectedPrompt.description}
          </p>
        </div>
      </div>

      {/* Системная информация */}
      <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Системная информация</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">ID промпта</label>
              <div className="w-full px-3 py-2 border border-border rounded-lg bg-muted font-mono text-sm">
                {prompt.id}
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Фиксированный ID для модуля
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Категория (Category)</label>
              <div className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-sm">
                {prompt.moduleName}
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Автоматически определяется выбранным модулем
              </p>
            </div>
          </div>
      </div>

      {/* Название промпта */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Название промпта</h3>
        <input
          type="text"
          value={prompt.description}
          onChange={(e) => onUpdatePrompt(prompt.id, 'description', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
          placeholder="Введите название промпта..."
        />
        <p className="text-muted-foreground text-sm mt-2">
          Это название будет использоваться как идентификатор в системе (поле name в API)
        </p>
      </div>

      {/* Редактор текста */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Текст промпта</h3>
        <textarea
          value={prompt.text || ''}
          onChange={(e) => onUpdatePrompt(prompt.id, 'text', e.target.value)}
          className="w-full h-96 px-3 py-2 border border-border rounded-lg bg-background font-mono text-sm resize-none"
          placeholder="Введите текст промпта здесь..."
        />
      </div>
    </>
  );
};
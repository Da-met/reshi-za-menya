import { Prompt, PromptParameter } from '@/types/prompt';
import { Plus, X } from 'lucide-react';

interface ParametersEditorProps {
  prompt: Prompt;
  onUpdateParameter: (
    promptId: string,
    paramType: 'required' | 'optional' | 'output',
    index: number,
    field: 'parameterValue' | 'comment',
    value: string
  ) => void;
  onAddParameter: (promptId: string, paramType: 'required' | 'optional' | 'output') => void;
  onRemoveParameter: (promptId: string, paramType: 'required' | 'optional' | 'output', index: number) => void;
}

export const ParametersEditor: React.FC<ParametersEditorProps> = ({
  prompt,
  onUpdateParameter,
  onAddParameter,
  onRemoveParameter,
}) => {
  const renderParameterSection = (
    title: string,
    parameters: PromptParameter[],
    type: 'required' | 'optional' | 'output',
    buttonColor: string
  ) => (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3 mb-4">
        {parameters.map((param, index) => (
          <div key={index} className="border p-3 rounded bg-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Название параметра</label>
                <input
                  type="text"
                  value={param.parameterValue}
                  onChange={(e) => onUpdateParameter(prompt.id, type, index, 'parameterValue', e.target.value)}
                  className="w-full px-2 py-1 border rounded font-mono text-sm"
                  placeholder="category"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Комментарий</label>
                <input
                  type="text"
                  value={param.comment}
                  onChange={(e) => onUpdateParameter(prompt.id, type, index, 'comment', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="Категория получателя..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => onRemoveParameter(prompt.id, type, index)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
              >
                <X className="w-4 h-4" />
                Удалить
              </button>
            </div>
          </div>
        ))}
        {parameters.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            Нет параметров
          </p>
        )}
      </div>
      <button
        onClick={() => onAddParameter(prompt.id, type)}
        className={`flex items-center gap-1 ${buttonColor} text-white px-3 py-2 rounded text-sm hover:opacity-90 w-full justify-center`}
      >
        <Plus className="w-4 h-4" />
        Добавить {title.toLowerCase()}
      </button>
    </div>
  );

  return (
    <>
      {renderParameterSection('Обязательные параметры', prompt.requiredParameters, 'required', 'bg-green-600')}
      {renderParameterSection('Опциональные параметры', prompt.optionalParameters, 'optional', 'bg-blue-600')}
      {renderParameterSection('Выходные параметры', prompt.outputParameters, 'output', 'bg-purple-600')}
    </>
  );
};
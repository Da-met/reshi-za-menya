// /components/analyzer/sections/SkinProfileSection.tsx
'use client';

import { AnalyzerRequest } from '@/types/analyzer';

interface SkinProfileSectionProps {
  request: AnalyzerRequest;
  onChange: (updates: Partial<AnalyzerRequest>) => void;
}

const skinTypes = [
  { id: 'normal' as const, label: 'Нормальная', emoji: '😊', description: 'Баланс увлажнения, нет проблем' },
  { id: 'dry' as const, label: 'Сухая', emoji: '🥺', description: 'Шелушение, стянутость' },
  { id: 'oily' as const, label: 'Жирная', emoji: '💦', description: 'Блеск, расширенные поры' },
  { id: 'combination' as const, label: 'Комбинированная', emoji: '🎭', description: 'Сухие щеки + жирная Т-зона' },
  { id: 'sensitive' as const, label: 'Чувствительная', emoji: '🤧', description: 'Легко раздражается' }
];

const skinConcerns = [
  'Акне', 'Черные точки', 'Пигментация', 'Морщины', 'Сухость',
  'Жирный блеск', 'Покраснение', 'Купероз', 'Обезвоженность', 'Рубцы'
];

const preferences = [
  { id: 'vegan', label: 'Веган 🥬', description: 'Без ингредиентов животного происхождения' },
  { id: 'fragranceFree', label: 'Без отдушек 🌿', description: 'Без парфюмерных композиций' },
  { id: 'crueltyFree', label: 'Не тестируется 🐰', description: 'Cruelty-free продукт' },
  { id: 'hypoallergenic', label: 'Гипоаллергенно 🌾', description: 'Минимальный риск аллергии' }
];

export function SkinProfileSection({ request, onChange }: SkinProfileSectionProps) {
  const toggleArrayItem = (array: string[] | undefined, item: string) => {
    const current = array || [];
    return current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
  };

  const togglePreference = (pref: string, value: boolean) => {
    onChange({
      preferences: {
        ...request.preferences,
        [pref]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent
          mb-3 md:mb-4 text-foreground
        ">
          Расскажите о своей коже
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Это поможет точнее оценить совместимость средств
        </p>
      </div>

      {/* Тип кожи */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">👤 Тип кожи</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {skinTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onChange({ skinType: type.id })}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200
                flex flex-col items-center space-y-1
                ${request.skinType === type.id
                  ? 'bg-primary border-primary text-primary-foreground shadow-md'
                  : 'bg-card border-border text-foreground hover:border-primary hover:shadow-md'
                }
              `}
            >
              <span className="text-xl">{type.emoji}</span>
              <span className="font-medium text-xs">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Проблемы кожи */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">🎯 Проблемы и задачи</h4>
        <div className="flex flex-wrap gap-2">
          {skinConcerns.map((concern) => (
            <button
              key={concern}
              onClick={() => {
                onChange({ skinConcerns: toggleArrayItem(request.skinConcerns, concern) });
              }}
              className={`
                px-3 py-2 rounded-lg border transition-all text-sm
                ${request.skinConcerns?.includes(concern)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
                }
              `}
            >
              {concern}
            </button>
          ))}
        </div>
      </div>

      {/* Предпочтения */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">✨ Ваши предпочтения</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {preferences.map((pref) => (
            <button
              key={pref.id}
              onClick={() => togglePreference(pref.id, !request.preferences?.[pref.id as keyof typeof request.preferences])}
              className={`
                p-3 rounded-lg border transition-all text-left
                flex items-start gap-3
                ${request.preferences?.[pref.id as keyof typeof request.preferences]
                  ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800'
                  : 'bg-card border-border hover:border-primary'
                }
              `}
            >
              <div className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center ${
                request.preferences?.[pref.id as keyof typeof request.preferences]
                  ? 'bg-primary border-primary'
                  : 'border-border'
              }`}>
                {request.preferences?.[pref.id as keyof typeof request.preferences] && (
                  <div className="w-2 h-2 bg-primary-foreground rounded-sm" />
                )}
              </div>
              <div>
                <div className="font-medium">{pref.label}</div>
                <div className="text-xs text-muted-foreground">{pref.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Информация */}
      {request.skinType && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💡 <strong>Совет:</strong> Для {skinTypes.find(t => t.id === request.skinType)?.label?.toLowerCase()} кожи 
            особенно важны {request.skinType === 'dry' ? 'увлажняющие компоненты' : 
                         request.skinType === 'oily' ? 'себорегулирующие компоненты' : 
                         request.skinType === 'sensitive' ? 'успокаивающие компоненты' : 
                         'сбалансированный уход'}.
          </p>
        </div>
      )}
    </div>
  );
}
'use client';

import { GiftRequest } from '@/types/gifts';

interface CharacteristicsSectionProps {
  request: GiftRequest;
  onChange: (updates: Partial<GiftRequest>) => void;
}

const professions = [
  'IT-специалист', 'Врач', 'Учитель', 'Студент', 'Дизайнер', 
  'Бухгалтер', 'Юрист', 'Инженер', 'Повар', 'Строитель',
  'Маркетолог', 'Менеджер', 'Фрилансер', 'Предприниматель', 'Спортсмен'
];

const interests = [
  'Книги', 'Спорт', 'Путешествия', 'Игры', 'Кулинария',
  'Музыка', 'Кино', 'Фотография', 'Рукоделие', 'Садоводство',
  'Автомобили', 'Технологии', 'Искусство', 'Наука', 'Йога'
];

const personality = [
  'Юморист', 'Минималист', 'Романтик', 'Прагматик', 'Творческий',
  'Экстраверт', 'Интроверт', 'Активный', 'Спокойный', 'Амбициозный'
];

export function CharacteristicsSection({ request, onChange }: CharacteristicsSectionProps) {
  const toggleArrayItem = (array: string[] | undefined, item: string) => {
    const current = array || [];
    return current.includes(item) 
      ? current.filter(i => i !== item)
      : [...current, item];
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="
          text-xl md:text-2xl lg:text-3xl font-accent 
          mb-3 md:mb-4 text-foreground
        ">
          Опишите человека подробнее
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
          Выберите характеристики, которые помогут найти идеальный подарок
        </p>
      </div>
      
      {/* Профессии */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">💼 Род занятий</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {professions.map(prof => (
            <button
              key={prof}
              onClick={() => {
                onChange({ profession: toggleArrayItem(request.profession, prof) });
              }}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.profession?.includes(prof)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {prof}
            </button>
          ))}
        </div>
      </div>

      {/* Интересы */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">❤️ Интересы и хобби</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => {
                onChange({ interests_hobbies: toggleArrayItem(request.interests_hobbies, interest) });
              }}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.interests_hobbies?.includes(interest)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Характер */}
      <div>
        <h4 className="text-m md:text-l lg:text-xl text-foreground mb-3">👤 Характер и стиль</h4>
        <div className="flex flex-wrap gap-1 md:gap-2">
          {personality.map(trait => (
            <button
              key={trait}
              onClick={() => {
                onChange({ temperament: toggleArrayItem(request.temperament, trait) });
              }}
              className={`px-2 py-1 md:px-3 md:py-2 rounded-lg border transition-all text-xs md:text-sm ${
                request.temperament?.includes(trait)
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border hover:border-primary hover:bg-accent'
              }`}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
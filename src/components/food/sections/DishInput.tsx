'use client';

import { useState, useEffect } from 'react';

interface DishInputProps {
  dishName: string;
  onChange: (dishName: string) => void;
  onClearError: () => void;
}

export function DishInput({ dishName, onChange, onClearError }: DishInputProps) {
  const [localValue, setLocalValue] = useState(dishName);

  // Синхронизируем с родителем при изменении пропса
  useEffect(() => {
    setLocalValue(dishName);
  }, [dishName]);

  const handleChange = (value: string) => {
    setLocalValue(value);
    onClearError(); // Очищаем ошибку сразу при вводе
    
    // Валидацию делаем только при потере фокуса или отправке формы
    // А здесь просто передаем значение родителю
    onChange(value);
  };

  const handleBlur = () => {
    // При потере фокуса можно сделать дополнительную валидацию если нужно
    // Но сейчас просто синхронизируем с родителем
    onChange(localValue);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-foreground">
        Введите название блюда
      </label>
      <input
        type="text"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="Например: сырники, паста карбонара, борщ..."
        className="
          w-full 
          p-3 md:p-4 
          border border-border 
          rounded-xl 
          bg-background 
          text-foreground
          placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          text-sm md:text-base
        "
      />
      <p className="text-xs text-muted-foreground mt-2">
        💡 Введите точное название блюда, которое хотите приготовить
      </p>
    </div>
  );
}
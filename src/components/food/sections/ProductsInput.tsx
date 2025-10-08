'use client';

import { useState, useRef, useEffect } from 'react';
import { FoodRequest } from '@/types/food';
import { ProductChips } from '../ProductChips';
import { Lightbulb } from 'lucide-react';
import { searchProducts } from '@/data/foodData';

interface ProductsInputProps {
  request: FoodRequest;
  onAddProduct: (product: string) => void;
  onRemoveProduct: (product: string) => void;
  onClearError: () => void;
}

export function ProductsInput({ request, onAddProduct, onRemoveProduct, onClearError }: ProductsInputProps) {
  const [productInput, setProductInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (productInput.length > 1) {
      const results = searchProducts(productInput);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [productInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && productInput.trim()) {
      e.preventDefault();
      onAddProduct(productInput);
      setProductInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onAddProduct(suggestion);
    setProductInput('');
  };

  const handleInputChange = (value: string) => {
    setProductInput(value);
    onClearError();
  };

  return (
    <div className="space-y-4">
      <div className="relative" ref={inputRef}>
        <label className="block text-sm font-medium mb-2 text-foreground">
          Введите продукты, которые у вас есть
          {request.products && request.products.length > 0 && (
            <span className="text-muted-foreground font-normal ml-1">
              ({request.products.length} добавлено)
            </span>
          )}
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={productInput}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => productInput.length > 1 && setShowSuggestions(true)}
            placeholder="Начните вводить продукт..."
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
              pr-24
            "
          />
          
          <button
            onClick={() => {
              onAddProduct(productInput);
              setProductInput('');
            }}
            disabled={!productInput.trim()}
            className="
              absolute 
              right-2 top-1/2 -translate-y-1/2
              px-4 py-2 
              bg-primary text-primary-foreground 
              rounded-lg 
              font-medium 
              text-sm
              hover:bg-primary/90 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all
            "
          >
            Добавить
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto animate-in fade-in duration-200">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 flex items-center space-x-3 group"
              >
                <Lightbulb size={16} className="text-primary flex-shrink-0" />
                <span className="first-letter:uppercase font-medium">{suggestion}</span>
                <span className="text-xs text-muted-foreground group-hover:text-accent-foreground ml-auto">
                  выбрать
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-blue-800 font-medium mb-1">
              💡 Можно вводить любые продукты для готовки
            </p>
            <p className="text-xs text-blue-600">
              Система подскажет популярные варианты. Запрещены нецензурные и непищевые items.
            </p>
          </div>
        </div>
      </div>

      {request.products && request.products.length > 0 && (
        <ProductChips
          products={request.products}
          onRemove={onRemoveProduct}
        />
      )}
    </div>
  );
}
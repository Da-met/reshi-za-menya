'use client';

import { useState, useRef, useEffect } from 'react';
import { FoodRequest } from '@/types/food';
import { ProductChips } from '../ProductChips';
import { Utensils, Search, Lightbulb, AlertCircle, CheckCircle, X } from 'lucide-react';
import { searchProducts } from '@/data/foodData';
import { searchDishes } from '@/data/dishesData';
import { validateProduct, validateDishName } from '@/utils/validationFood';

interface InputModeSectionProps {
  request: FoodRequest;
  onChange: (updates: Partial<FoodRequest>) => void;
}

export function InputModeSection({ request, onChange }: InputModeSectionProps) {
  const [productInput, setProductInput] = useState('');
  const [dishInput, setDishInput] = useState('');
  const [productSuggestions, setProductSuggestions] = useState<string[]>([]);
  const [dishSuggestions, setDishSuggestions] = useState<string[]>([]);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [showDishSuggestions, setShowDishSuggestions] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [lastAddedProduct, setLastAddedProduct] = useState('');

  const productInputRef = useRef<HTMLInputElement>(null);
  const dishInputRef = useRef<HTMLInputElement>(null);

  // Закрытие подсказок при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productInputRef.current && !productInputRef.current.contains(event.target as Node)) {
        setShowProductSuggestions(false);
      }
      if (dishInputRef.current && !dishInputRef.current.contains(event.target as Node)) {
        setShowDishSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleModeChange = (mode: 'products' | 'dish') => {
    onChange({ mode });
    setValidationError('');
    setLastAddedProduct('');
    setDishInput('');
    setProductInput('');
    setShowProductSuggestions(false);
    setShowDishSuggestions(false);
  };

  // Обработчики для продуктов
  const handleProductInputChange = (value: string) => {
    setProductInput(value);
    setValidationError('');
    
    if (value.length > 1) {
      const results = searchProducts(value);
      setProductSuggestions(results);
      setShowProductSuggestions(results.length > 0);
    } else {
      setProductSuggestions([]);
      setShowProductSuggestions(false);
    }
  };

  const handleAddProduct = (product: string) => {
    if (!product.trim()) return;
    
    const validation = validateProduct(product);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Некорректный продукт');
      return;
    }
    
    const newProduct = product.trim().toLowerCase();
    const currentProducts = request.products || [];
    
    if (currentProducts.includes(newProduct)) {
      setValidationError('Этот продукт уже добавлен');
      return;
    }
    
    onChange({ 
      products: [...currentProducts, newProduct] 
    });
    
    setProductInput('');
    setShowProductSuggestions(false);
    setValidationError('');
    setLastAddedProduct(newProduct);
    setTimeout(() => setLastAddedProduct(''), 2000);
  };

  const handleRemoveProduct = (productToRemove: string) => {
    const currentProducts = request.products || [];
    onChange({
      products: currentProducts.filter(product => product !== productToRemove)
    });
  };

  const handleProductKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && productInput.trim()) {
      e.preventDefault();
      handleAddProduct(productInput);
    }
  };

  const handleProductSuggestionClick = (suggestion: string) => {
    handleAddProduct(suggestion);
  };

  // Обработчики для блюд
  const handleDishInputChange = (value: string) => {
    setDishInput(value);
    setValidationError('');
    
    if (value.length > 1) {
      const results = searchDishes(value);
      setDishSuggestions(results);
      setShowDishSuggestions(results.length > 0);
    } else {
      setDishSuggestions([]);
      setShowDishSuggestions(false);
    }
  };

  const handleSaveDish = () => {
    if (!dishInput.trim()) {
      setValidationError('Введите название блюда');
      return;
    }

    const validation = validateDishName(dishInput);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Некорректное название блюда');
      return;
    }

    onChange({ dishName: dishInput.trim() });
    setValidationError('');
    setShowDishSuggestions(false);
  };

  const handleDishKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveDish();
    }
  };

  const handleDishSuggestionClick = (suggestion: string) => {
    setDishInput(suggestion);
    onChange({ dishName: suggestion });
    setShowDishSuggestions(false);
    setValidationError('');
  };

  const handleRemoveDish = () => {
    onChange({ dishName: '' });
    setDishInput('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg md:text-xl font-accent font-semibold mb-3 md:mb-4 text-foreground">
          Как будем искать рецепт?
        </h3>
        
        {/* Переключатель режимов */}
        <div className="flex bg-muted rounded-xl p-1 mb-4 md:mb-6">
          {[
            { id: 'products', label: 'ПРОДУКТЫ', icon: <Utensils size={16} /> },
            { id: 'dish', label: 'БЛЮДО', icon: <Search size={16} /> }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id as 'products' | 'dish')}
              className={`
                flex items-center space-x-2 
                px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 
                rounded-lg 
                font-medium 
                transition-all 
                flex-1 
                justify-center
                text-xs md:text-sm lg:text-base
                ${request.mode === mode.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {mode.icon}
              <span className="whitespace-nowrap">{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Сообщения об ошибках/успехах */}
        {validationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle size={16} />
              <span className="text-sm font-medium">{validationError}</span>
            </div>
          </div>
        )}
        
        {lastAddedProduct && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-in fade-in duration-200">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">
                Продукт "<span className="first-letter:uppercase">{lastAddedProduct}</span>" добавлен
              </span>
            </div>
          </div>
        )}

        {/* РЕЖИМ ПРОДУКТЫ */}
        {request.mode === 'products' && (
          <div className="space-y-4">
            <div className="relative" ref={productInputRef}>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Введите продукты, которые у вас есть
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={productInput}
                  onChange={(e) => handleProductInputChange(e.target.value)}
                  onKeyPress={handleProductKeyPress}
                  onFocus={() => productInput.length > 1 && setShowProductSuggestions(true)}
                  placeholder="Начните вводить продукт..."
                  className="w-full p-3 md:p-4 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base pr-12 md:pr-24"
                />
                
                <button
                  onClick={() => handleAddProduct(productInput)}
                  disabled={!productInput.trim()}
                  className="
                    absolute 
                    right-2 top-1/2 -translate-y-1/2
                    w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2
                    bg-primary text-primary-foreground 
                    rounded-lg 
                    font-medium 
                    text-sm
                    hover:bg-primary/90 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all
                    flex items-center justify-center
                  "
                >
                  <span className="hidden md:inline">Добавить</span>
                  <span className="md:hidden">+</span>
                </button>
              </div>
              
              {/* Подсказки продуктов */}
              {showProductSuggestions && productSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {productSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleProductSuggestionClick(suggestion)}
                      className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 flex items-center space-x-3 group"
                    >
                      <Lightbulb size={16} className="text-primary flex-shrink-0" />
                      <span className="first-letter:uppercase font-medium text-sm">{suggestion}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-accent-foreground ml-auto">
                        выбрать
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Подсказка для продуктов */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    💡 Вводите продукты по одному. Нажмите Enter или кнопку "+"
                  </p>
                  <p className="text-xs text-blue-600">
                    Система подскажет популярные варианты из 600+ продуктов
                  </p>
                </div>
              </div>
            </div>

            {/* Чипы продуктов */}
            {request.products && request.products.length > 0 && (
              <ProductChips
                products={request.products}
                onRemove={handleRemoveProduct}
              />
            )}
          </div>
        )}

        {/* РЕЖИМ БЛЮДО */}
        {request.mode === 'dish' && (
          <div className="space-y-4">
            <div className="relative" ref={dishInputRef}>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Введите название блюда
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={dishInput}
                  onChange={(e) => handleDishInputChange(e.target.value)}
                  onKeyPress={handleDishKeyPress}
                  onFocus={() => dishInput.length > 1 && setShowDishSuggestions(true)}
                  placeholder="Начните вводить название блюда..."
                  className="w-full p-3 md:p-4 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base pr-12 md:pr-24"
                />
                
                <button
                  onClick={handleSaveDish}
                  disabled={!dishInput.trim()}
                  className="
                    absolute 
                    right-2 top-1/2 -translate-y-1/2
                    w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2
                    bg-primary text-primary-foreground 
                    rounded-lg 
                    font-medium 
                    text-sm
                    hover:bg-primary/90 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all
                    flex items-center justify-center
                  "
                >
                  <span className="hidden md:inline">Сохранить</span>
                  <span className="md:hidden">✓</span>
                </button>
              </div>
              
              {/* Подсказки для блюд */}
              {showDishSuggestions && dishSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {dishSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleDishSuggestionClick(suggestion)}
                      className="w-full text-left p-3 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0 flex items-center space-x-3 group"
                    >
                      <Lightbulb size={16} className="text-primary flex-shrink-0" />
                      <span className="first-letter:uppercase font-medium text-sm">{suggestion}</span>
                      <span className="text-xs text-muted-foreground group-hover:text-accent-foreground ml-auto">
                        выбрать
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Подсказка для блюд */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">
                    💡 Введите название блюда и нажмите "✓" или Enter
                  </p>
                  <p className="text-xs text-blue-600">
                    База содержит 250+ популярных блюд со всего мира
                  </p>
                </div>
              </div>
            </div>

            {/* Сохраненное блюдо */}
            {request.dishName && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-green-800">
                    <CheckCircle size={16} />
                    <span className="font-medium text-sm">Блюдо: {request.dishName}</span>
                  </div>
                  <button
                    onClick={handleRemoveDish}
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
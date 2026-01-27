'use client';

import { X } from 'lucide-react';

interface ProductChipsProps {
  products: string[];
  onRemove: (product: string) => void;
}

export function ProductChips({ products, onRemove }: ProductChipsProps) {
  if (products.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-medium mb-2 text-foreground">
        Ваши продукты ({products.length}):
      </p>
      <div className="flex flex-wrap gap-2">
        {products.map(product => (
          <span 
            key={product} 
            className="
              bg-section-development/20 text-section-development 
              px-3 py-2 
              rounded-full 
              text-sm font-medium 
              flex items-center space-x-2
              group
              transition-all
              hover:bg-primary/30
            "
          >
            <span className="first-letter:uppercase">{product}</span>
            <button 
              onClick={() => onRemove(product)}
              className="
                opacity-70 
                group-hover:opacity-100 
                hover:bg-primary/20 
                rounded-full 
                p-0.5
                transition-all
              "
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
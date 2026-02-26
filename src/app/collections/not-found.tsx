// src/app/collections/not-found.tsx
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function CollectionsNotFound() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Sparkles size={64} className="text-muted-foreground mx-auto mb-6" />
        <h1 className="text-4xl font-accent mb-4">Подборка не найдена</h1>
        <p className="text-muted-foreground mb-8">
          К сожалению, такая подборка не существует или была удалена
        </p>
        <Link 
          href="/collections"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
        >
          Вернуться ко всем подборкам
        </Link>
      </div>
    </div>
  );
}
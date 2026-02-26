// src/app/analyzer/saved/[id]/page.tsx

'use client';

import { useState } from 'react';
import { ArrowLeft, Edit3, Trash2, Clock } from 'lucide-react';
import Link from 'next/link';
import type { SavedAnalysis } from '@/types/analyzer';
import { AnalyzerProductCard } from '@/components/analyzer/AnalyzerProductCard';

const mockAnalysis: SavedAnalysis = {
  id: '1',
  giftData: {
    id: 'gift-1',
    name: 'La Roche-Posay Effaclar H Увлажняющий крем',
    brand: 'La Roche-Posay',
    description: 'Увлажняющий крем для очень сухой кожи с гиалуроновой кислотой и церамидами. Идеально подходит для восстановления кожного барьера и интенсивного увлажнения.',
    type: 'thing',
    price: '1 890 ₽',
    image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=400&h=400&fit=crop',
    category: 'Крем',
    features: [
      'Содержит гиалуроновую кислоту',
      'Обогащен церамидами',
      'Без отдушек',
      'Гипоаллергенная формула',
      'Подходит для чувствительной кожи'
    ],
    recommendations: [
      'Интенсивно увлажняет сухую кожу',
      'Восстанавливает защитный барьер',
      'Безопасный состав без раздражителей',
      'Подходит для ежедневного использования'
    ],
    purchaseLink: 'https://www.ozon.ru/product/larocheposay-effaclar-h-1890/',
    tags: ['увлажняющий', 'для сухой кожи', 'без отдушек', 'гипоаллергенный'],
    
    ingredients: [
      {
        name: 'Aqua',
        safety: 'excellent',
        purpose: 'Растворитель',
        comedogenicRating: 0,
        irritancy: 'low',
        benefits: ['Безопасный', 'Гипоаллергенный'],
        concerns: []
      },
      {
        name: 'Glycerin',
        safety: 'good',
        purpose: 'Увлажнитель',
        comedogenicRating: 0,
        irritancy: 'low',
        benefits: ['Интенсивное увлажнение', 'Укрепление барьера кожи'],
        concerns: []
      }
    ],
    safetyScore: 8.5,
    skinTypeCompatibility: {
      normal: 8,
      dry: 9,
      oily: 6,
      combination: 7,
      sensitive: 7
    },
    warnings: ['Может содержать следовые количества аллергенов']
  },
  requestData: {
    productName: 'La Roche-Posay Effaclar H'
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Отлично подошел! Кожа стала мягкой и увлажненной. После недели использования прошло шелушение.'
};

export default function AnalysisDetailPage() {
  const [analysis, setAnalysis] = useState<SavedAnalysis>(mockAnalysis);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(analysis.userComment || '');

  const handleEditComment = () => {
    setIsEditingComment(true);
    setCommentText(analysis.userComment || '');
  };

  const handleSaveComment = () => {
    setAnalysis(prev => ({
      ...prev,
      userComment: commentText.trim()
    }));
    setIsEditingComment(false);
  };

  const handleCancelComment = () => {
    setIsEditingComment(false);
    setCommentText(analysis.userComment || '');
  };

  const handleDeleteComment = () => {
    setAnalysis(prev => ({
      ...prev,
      userComment: undefined
    }));
    setCommentText('');
    setIsEditingComment(false);
  };

  return (
    <div className="min-h-screen bg-background py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Навигация */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/analyzer?view=saved"
            className="inline-flex items-center text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Назад к моим анализам
          </Link>
        </div>

        <div className="space-y-6 md:space-y-8">
          {/* Карточка продукта - используем AnalyzerProductCard */}
          <AnalyzerProductCard 
            product={analysis.giftData}
            showPurchaseButtons={true}
          />

          {/* Блок комментария */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg md:text-xl text-foreground">Моя заметка</h2>
              {!isEditingComment && analysis.userComment && (
                <button
                  onClick={handleEditComment}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
                  title="Редактировать комментарий"
                >
                  <Edit3 size={16} />
                </button>
              )}
            </div>

            {isEditingComment ? (
              // Режим редактирования
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                  placeholder="Напишите ваши мысли о средстве, почему подошел или не подошел..."
                  className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:ring-primary/50 bg-background min-h-[80px]"
                  style={{ resize: 'none', overflow: 'hidden' }}
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={handleDeleteComment}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    title="Удалить комментарий"
                  >
                    <Trash2 size={16} />
                    <span className="hidden xs:inline text-xs md:text-sm">Удалить</span>
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelComment}
                      className="px-3 py-1 text-xs md:text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={handleSaveComment}
                      disabled={!commentText.trim()}
                      className="px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              </div>
            ) : analysis.userComment ? (
              // Просмотр комментария
              <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
                  {analysis.userComment}
                </p>
              </div>
            ) : (
              // Кнопка добавления комментария
              <button
                onClick={() => setIsEditingComment(true)}
                className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
                  <Edit3 size={20} />
                  <div className="text-center">
                    <p className="font-medium text-sm md:text-base mb-1">Добавьте свою заметку</p>
                    <p className="text-xs md:text-sm text-muted-foreground/80">
                      Поделитесь мыслями о средстве<br />
                      или почему подошел/не подошел
                    </p>
                  </div>
                </div>
              </button>
            )}

            {/* Дата сохранения */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
              <Clock size={12} />
              <span>Сохранено {analysis.createdAt.toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
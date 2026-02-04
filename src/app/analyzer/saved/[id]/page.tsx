'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Edit3, Trash2, CheckCircle, Star, AlertTriangle, Sparkles, Clock } from 'lucide-react';
import Link from 'next/link';
import type { SavedAnalysis } from '@/types/analyzer';
import Image from 'next/image';

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
    productName: 'La Roche-Posay Effaclar H',
    skinType: 'dry',
    skinConcerns: ['сухость', 'шелушение'],
    preferences: { fragranceFree: true, crueltyFree: true }
  },
  createdAt: new Date('2024-01-15'),
  userComment: 'Отлично подошел! Кожа стала мягкой и увлажненной. После недели использования прошло шелушение.'
};

export default function AnalysisDetailPage({ }: { params: Promise<{ id: string }> }) {
  const [analysis, setAnalysis] = useState<SavedAnalysis>(mockAnalysis);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [commentText, setCommentText] = useState(analysis.userComment || '');
  const [imageError, setImageError] = useState(false);

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

  const imageSrc = imageError || !analysis.giftData.image
    ? `/images/fallbacks/${analysis.giftData.category || 'skincare'}.jpg`
    : analysis.giftData.image;

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
          {/* Блок с деталями анализа */}
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            {/* Верхняя часть с изображением и основной информацией */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8">
              {/* Изображение */}
              <div className="rounded-xl overflow-hidden bg-muted/20">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={imageSrc}
                    alt={analysis.giftData.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>

              {/* Информация */}
              <div className="space-y-6">
                {/* Заголовок и категория */}
                <div>
                  <div className="flex items-center gap-2 md:gap-3 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs md:text-sm">
                      Средство для ухода
                    </span>
                    {analysis.giftData.brand && (
                      <span className="text-xs md:text-sm text-muted-foreground bg-muted px-2 md:px-3 py-1 rounded-full">
                        {analysis.giftData.brand}
                      </span>
                    )}
                    {analysis.giftData.category && (
                      <span className="text-xs md:text-sm text-muted-foreground bg-muted px-2 md:px-3 py-1 rounded-full">
                        {analysis.giftData.category}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4">
                    {analysis.giftData.name}
                  </h2>

                  {/* Рейтинг безопасности */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        {analysis.giftData.safetyScore.toFixed(1)}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">из 10</div>
                    </div>
                    <div>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {analysis.giftData.safetyScore >= 8 ? 'Отличная безопасность' :
                         analysis.giftData.safetyScore >= 6 ? 'Хорошая безопасность' :
                         'Средняя безопасность'}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < Math.floor(analysis.giftData.safetyScore / 2) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Цена и кнопки */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{analysis.giftData.price}</span>
                  </div>

                  {/* Основные кнопки действий */}
                  <div className="space-y-3">
                    <a
                      href={analysis.giftData.purchaseLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 md:gap-3 w-full py-3 md:py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors text-base md:text-lg"
                    >
                      <ShoppingCart size={20} />
                      <span>Купить на маркетплейсе</span>
                    </a>

                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Heart size={16} />
                        <span>В избранное</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">
                        <Share2 size={16} />
                        <span>Поделиться</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Описание */}
            <div className="border-t border-border p-6 md:p-8">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-foreground">Описание</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {analysis.giftData.description}
                </p>
              </div>
            </div>

            {/* Особенности и преимущества */}
            <div className="border-t border-border">
              <div className="p-6 md:p-8 space-y-6 md:space-y-8">
                {/* Особенности */}
                {analysis.giftData.features && analysis.giftData.features.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl text-foreground">Особенности</h3>
                    <div className="space-y-3">
                      {analysis.giftData.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Преимущества */}
                {analysis.giftData.recommendations && analysis.giftData.recommendations.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg md:text-xl text-foreground">Преимущества</h3>
                    <div className="space-y-3">
                      {analysis.giftData.recommendations.map((recommendation: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <Star size={16} className="text-yellow-500 flex-shrink-0" />
                          <span className="text-sm md:text-base text-muted-foreground">{recommendation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Совместимость с типами кожи */}
            {analysis.giftData.skinTypeCompatibility && Object.keys(analysis.giftData.skinTypeCompatibility).length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <Sparkles size={12} className="text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-foreground">Совместимость с типами кожи</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {Object.entries(analysis.giftData.skinTypeCompatibility).map(([skinType, score]) => {
                      const getColor = () => {
                        if (score >= 8) return 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800';
                        if (score >= 6) return 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800';
                        if (score >= 4) return 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800';
                        return 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800';
                      };
                      
                      const label = skinType === 'normal' ? 'Нормальная' :
                                  skinType === 'dry' ? 'Сухая' :
                                  skinType === 'oily' ? 'Жирная' :
                                  skinType === 'combination' ? 'Комбинированная' : 'Чувствительная';
                      
                      return (
                        <div key={skinType} className="border border-border rounded-lg p-3 hover:border-primary/30 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{label}</span>
                            <span className={`text-xs md:text-sm font-bold ${getColor()}`}>
                              {score.toFixed(1)}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  score >= 8 ? 'bg-green-500' :
                                  score >= 6 ? 'bg-blue-500' :
                                  score >= 4 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${score * 10}%` }}
                              />
                            </div>
                            <span className="text-[10px] md:text-xs text-muted-foreground">/10</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* На что обратить внимание */}
            {analysis.giftData.warnings && analysis.giftData.warnings.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl text-foreground flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
                    На что обратить внимание
                  </h3>
                  <div className="space-y-3">
                    {analysis.giftData.warnings.map((warning: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span className="text-sm md:text-base text-muted-foreground">{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Теги */}
            {analysis.giftData.tags && analysis.giftData.tags.length > 0 && (
              <div className="border-t border-border p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  {analysis.giftData.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="px-2 md:px-3 py-1 bg-secondary text-primary text-xs md:text-sm rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

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
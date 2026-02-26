// D:\МАЙО\JavaScript\ПРОЕКТЫ\РЕШИ ЗА МЕНЯ\reshi-za-menya\src\components\ui\shared\CommentSection.tsx

'use client';
import { useState } from 'react';
import { Edit3, Trash2, MessageCircle } from 'lucide-react';
import { SafeContent } from '../safe/SafeContent';

interface CommentSectionProps {
  comment?: string;
  onSave: (comment: string) => void;
  onDelete: () => void;
  placeholder?: string;
  title?: string;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  addIcon?: React.ReactNode;
  addText?: string;
  addDescription?: string;
  readOnly?: boolean;    // 👈 новый пропс
  compact?: boolean;     // 👈 новый пропс для компактного вида
}

export function CommentSection({
  comment,
  onSave,
  onDelete,
  placeholder = 'Напишите ваш комментарий...',
  title = 'Комментарий',
  editIcon = <Edit3 size={18} />,
  deleteIcon = <Trash2 size={18} />,
  addIcon = <MessageCircle size={24} />,
  addText = 'Добавить комментарий',
  addDescription,
  readOnly = false,
  compact = false,
}: CommentSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setCommentText] = useState(comment || '');

  const handleEdit = () => {
    if (readOnly) return; // 👈 не редактируем в readOnly режиме
    setIsEditing(true);
    setCommentText(comment || '');
  };

  const handleSave = () => {
    onSave(commentText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCommentText(comment || '');
  };

  const handleDelete = () => {
    if (readOnly) return; // 👈 не удаляем в readOnly режиме
    onDelete();
    setIsEditing(false);
  };

  // Компактный режим для карточек
  if (compact) {
    return (
      <div className="p-3 bg-accent/20 border border-accent/30 rounded-lg">
        <SafeContent
          content={comment || ''}
          type="paragraphs"
          className="text-sm text-foreground break-words"
        />
      </div>
    );
  }

  // Основной режим (как было)
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl text-foreground">{title}</h2>
        {!isEditing && comment && !readOnly && (
          <button
            onClick={handleEdit}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex-shrink-0"
            title="Редактировать комментарий"
          >
            {editIcon}
          </button>
        )}
      </div>

      {isEditing ? (
        // Режим редактирования
        <div className="space-y-3">
          <textarea
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder={placeholder}
            className="w-full p-3 text-sm border border-border rounded-lg focus:outline-primary focus:ring-1 focus:ring-primary/50 bg-background min-h-[80px]"
            style={{ resize: 'none', overflow: 'hidden' }}
            rows={2}
            autoFocus
          />
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
              title="Удалить комментарий"
            >
              {deleteIcon}
              <span className="hidden xs:inline text-xs md:text-sm">Удалить</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-xs md:text-sm border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={!commentText.trim()}
                className="px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      ) : comment ? (
        // Просмотр комментария
        <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
          <SafeContent
            content={comment}
            type="paragraphs"
            className="text-sm md:text-base text-foreground leading-relaxed"
          />
        </div>
      ) : !readOnly ? (
        // Кнопка добавления комментария
        <button
          onClick={handleEdit}
          className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
            {addIcon}
            <div className="text-center">
              <p className="font-medium text-sm md:text-base mb-1">{addText}</p>
              {addDescription && (
                <p className="text-xs md:text-sm text-muted-foreground/80">
                  {addDescription}
                </p>
              )}
            </div>
          </div>
        </button>
      ) : null}
    </div>
  );
}
// src/components/shared/UserNote.tsx
'use client';

import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { SafeContent } from '../safe/SafeContent';


interface UserNoteProps {
  initialNote?: string;
  onSave?: (note: string) => void;
  onDelete?: () => void;
  title?: string;
  placeholder?: string;
  editable?: boolean;
  className?: string;
}

export function UserNote({
  initialNote = '',
  onSave,
  onDelete,
  title = 'Моя заметка',
  placeholder = 'Напишите ваши мысли...',
  editable = true,
  className = ''
}: UserNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(initialNote);
  const [currentNote, setCurrentNote] = useState(initialNote);

  const handleSave = () => {
    const trimmed = noteText.trim();
    setCurrentNote(trimmed);
    onSave?.(trimmed);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setCurrentNote('');
    setNoteText('');
    onDelete?.();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNoteText(currentNote);
    setIsEditing(false);
  };

  return (
    <div className={`bg-card rounded-2xl shadow-lg p-6 md:p-8 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl text-foreground">{title}</h2>
        
        {!isEditing && currentNote && editable && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            title="Редактировать заметку"
          >
            <Edit3 size={16} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={noteText}
            onChange={(e) => {
              setNoteText(e.target.value);
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
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
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
                disabled={!noteText.trim()}
                className="px-3 py-1 text-xs md:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      ) : currentNote ? (
        <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
          <SafeContent
            content={currentNote}
            type="paragraphs"
            className="text-sm md:text-base text-foreground leading-relaxed"
          />
        </div>
      ) : editable ? (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-accent/10 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground">
            <Edit3 size={20} />
            <div className="text-center">
              <p className="font-medium text-sm md:text-base mb-1">Добавьте свою заметку</p>
              <p className="text-xs md:text-sm text-muted-foreground/80">
                Поделитесь мыслями о средстве
              </p>
            </div>
          </div>
        </button>
      ) : (
        <p className="text-sm text-muted-foreground italic">Нет заметки</p>
      )}
    </div>
  );
}
'use client';

export function SavedBooks() {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-accent font-bold mb-4 text-foreground">Мои книги</h2>
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📚</div>
        <p className="text-muted-foreground mb-4">Здесь будут ваши сохраненные книги</p>
        <p className="text-sm text-muted-foreground">
          Сохраняйте понравившиеся рекомендации, чтобы не потерять их
        </p>
      </div>
    </div>
  );
}
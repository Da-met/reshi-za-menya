'use client';

export function SavedGifts() {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-accent font-bold mb-4 text-foreground">Мои подарки</h2>
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📦</div>
        <p className="text-muted-foreground mb-4">Здесь будут ваши сохраненные подарки</p>
        <p className="text-sm text-muted-foreground">
          Сохраняйте понравившиеся идеи, чтобы не потерять их
        </p>
      </div>
    </div>
  );
}
export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-accent mb-4">Коллекции уходовых средств</h1>
        <p className="text-muted-foreground">Готовые подборки средств для разных типов кожи</p>
        <a href="/skincare" className="mt-6 inline-block text-primary hover:underline">
          ← Вернуться к подбору
        </a>
      </div>
    </div>
  );
}
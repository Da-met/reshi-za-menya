import { use } from "react";

export default function RecipeCollectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <div>Подборка рецептов {id}</div>;
  }
  
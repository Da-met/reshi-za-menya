import { use } from "react";


export default function MovieCollectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <div>Подборка фильмов {id}</div>;
  }
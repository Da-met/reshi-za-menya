import { use } from "react";

export default function BookCollectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <div>Подборка книг {id}</div>;
  }
  
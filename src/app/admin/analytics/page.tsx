// src/app/admin/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';

type ClickEvent = {
  itemId: string;
  itemTitle: string;
  module: string;
  collectionId?: string;
  collectionTitle?: string;
  price?: string;
  timestamp: string;
};

export default function AnalyticsPage() {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('analytics_clicks');
    if (data) {
      setClicks(JSON.parse(data).reverse());
    }
  }, []);

  const totalClicks = clicks.length;
  const byModule = clicks.reduce((acc, click) => {
    acc[click.module] = (acc[click.module] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-accent mb-8">Статистика кликов</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl shadow">
          <p className="text-sm text-muted-foreground">Всего кликов</p>
          <p className="text-4xl font-bold">{totalClicks}</p>
        </div>
        
        {Object.entries(byModule).map(([module, count]) => (
          <div key={module} className="bg-card p-6 rounded-xl shadow">
            <p className="text-sm text-muted-foreground capitalize">{module}</p>
            <p className="text-4xl font-bold">{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Время</th>
              <th className="p-3 text-left">Товар</th>
              <th className="p-3 text-left">Модуль</th>
              <th className="p-3 text-left">Коллекция</th>
            </tr>
          </thead>
          <tbody>
            {clicks.map((click, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3">{new Date(click.timestamp).toLocaleString()}</td>
                <td className="p-3">{click.itemTitle}</td>
                <td className="p-3 capitalize">{click.module}</td>
                <td className="p-3">{click.collectionTitle || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
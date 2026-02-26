// src/lib/image-utils.ts
export function getSafeImageUrl(
  url?: string,
  title?: string,
  category?: string
): string {
  if (url) return url;
  
  const query = encodeURIComponent(
    `${title || ''} ${category || 'gift present'}`
  ).trim();
  
  return `https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop&q=80&auto=format${query ? `&q=${query}` : ''}`;
}
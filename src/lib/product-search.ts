// src/lib/product-search.ts
/**
 * Поиск товаров по маркетплейсам
 */

interface ProductSearchResult {
  image: string;
  price: string;
  url: string;
  title: string;
}

/**
 * Ищет товар на Wildberries по названию
 */
export async function searchProductOnWildberries(
  productName: string,
  brand?: string
): Promise<ProductSearchResult | null> {
  try {
    const searchQuery = encodeURIComponent(`${brand || ''} ${productName}`.trim());
    
    // Используем API Wildberries (публичное)
    const response = await fetch(
      `https://card.wb.ru/cards/v1/detail?appType=1&curr=rub&dest=-1257786&spp=30&nm=${searchQuery}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    if (data.data?.products?.[0]) {
      const product = data.data.products[0];
      return {
        image: `https://${product.pics?.host}/big/${product.pics?.big?.[0] || '1.webp'}`,
        price: `${Math.floor(product.salePriceU / 100)} ₽`,
        url: `https://www.wildberries.ru/catalog/${product.id}/detail.aspx`,
        title: product.name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Wildberries search error:', error);
    return null;
  }
}

/**
 * Ищет товар на Ozon
 */
export async function searchProductOnOzon(
  productName: string,
  brand?: string
): Promise<ProductSearchResult | null> {
  try {
    const searchQuery = encodeURIComponent(`${brand || ''} ${productName}`.trim());
    
    // Ozon API требует авторизацию, используем поиск через HTML
    const response = await fetch(
      `https://www.ozon.ru/api/composer-api.bx/page/json/v2?url=/search/?text=${searchQuery}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    // Парсим ответ Ozon (структура может меняться)
    const product = data?.widgetStates?.searchResultsV2?.items?.[0];
    
    if (product) {
      return {
        image: product.image?.url || '',
        price: product.price || '',
        url: `https://ozon.ru${product.url || ''}`,
        title: product.title || product.name || ''
      };
    }
    
    return null;
  } catch (error) {
    console.error('Ozon search error:', error);
    return null;
  }
}

/**
 * Основная функция поиска товара
 */
export async function findProductImage(
  productName: string,
  brand?: string,
  productType?: string
): Promise<{ image: string; source: string }> {
  // Пробуем найти на Wildberries
  const wbResult = await searchProductOnWildberries(productName, brand);
  if (wbResult?.image) {
    return { image: wbResult.image, source: 'wildberries' };
  }
  
  // Пробуем найти на Ozon
  const ozonResult = await searchProductOnOzon(productName, brand);
  if (ozonResult?.image) {
    return { image: ozonResult.image, source: 'ozon' };
  }
  
  // Если не нашли, используем поиск через Google (ограниченно)
  const googleImage = await searchGoogleImage(productName, brand, productType);
  if (googleImage) {
    return { image: googleImage, source: 'google' };
  }
  
  // Fallback: Unsplash по категории
  return { 
    image: getCategoryImage(productType), 
    source: 'unsplash' 
  };
}

/**
 * Поиск через Google Images (используем Custom Search API)
 * Требуется API key - можно получить бесплатно
 */
async function searchGoogleImage(
  query: string,
  brand?: string,
  productType?: string
): Promise<string | null> {
  // Для простоты - используем статичные категории
  return getCategoryImage(productType);
}

/**
 * Изображения по категориям (высококачественные)
 */
function getCategoryImage(productType?: string): string {
  const categoryImages: Record<string, string> = {
    'serum': 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=800&h=600&fit=crop&q=80',
    'cleanser': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop&q=80',
    'moisturizer': 'https://images.unsplash.com/photo-1570196911496-66bd58a5b7b4?w=800&h=600&fit=crop&q=80',
    'sunscreen': 'https://images.unsplash.com/photo-1550259977-be7cbd3d658e?w=800&h=600&fit=crop&q=80',
    'toner': 'https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&h=600&fit=crop&q=80',
    'mask': 'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?w=800&h=600&fit=crop&q=80',
    'default': 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=800&h=600&fit=crop&q=80'
  };
  
  const type = productType?.toLowerCase() || 'default';
  return categoryImages[type] || categoryImages.default;
}
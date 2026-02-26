/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net', // ← ДОБАВЬТЕ ЭТУ СТРОКУ
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.re-store.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ozon.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wildberries.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        pathname: '/**',
      },
    ],
  },
  
  // Безопасные rewrites
  async rewrites() {
    const API_BASE_URL = process.env.API_BASE_URL;
    
    if (!API_BASE_URL) {
      console.warn('⚠️ API_BASE_URL не задан в переменных окружения');
      return [];
    }
    
    return [
      {
        source: '/api/prompt-templates/:path*',
        destination: `${API_BASE_URL}/api/prompt-templates/:path*`,
      },
    ];
  },
  
  // Безопасные заголовки
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
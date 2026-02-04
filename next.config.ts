/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'static.re-store.ru'],
    unoptimized: true, // Полностью отключает оптимизацию
  },
  async rewrites() {
    return [
      {
        source: '/api/prompt-templates/:path*',
        destination: 'http://192.168.3.6:2222/api/prompt-templates/:path*',
      },
    ];
  },
}

module.exports = nextConfig
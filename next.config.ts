/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/prompt-templates/:path*',
        destination: 'http://192.168.3.6:2109/api/prompt-templates/:path*',
      },
    ];
  },
}

module.exports = nextConfig
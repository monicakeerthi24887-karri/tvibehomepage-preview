/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/performers',
        destination: '/vendors',
        permanent: false,
      },
      {
        source: '/vote',
        destination: '/vendors',
        permanent: false,
      },
      {
        source: '/app',
        destination: '/pwa',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/pwa',
        destination: '/pwa/index.html',
      },
      {
        source: '/pwa/:path((?!_expo|assets|.*\\\\..*).*)',
        destination: '/pwa/index.html',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tvibe.ca',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

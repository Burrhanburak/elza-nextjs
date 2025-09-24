import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app,']
    }
  },
  // Make sure locale is properly passed
  async headers() {
    return [
      {
        source: '/:locale(en|tr|ru|az)/:path*',
        headers: [
          {
            key: 'X-Locale',
            value: ':locale',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

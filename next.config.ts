import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    mcpServer: true,
  },
  turbopack: {},
};

export default nextConfig;

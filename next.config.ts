import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    mcpServer: true,
  },
  outputFileTracingIncludes: {
    '/*': ['node_modules/sharp/**/*', 'node_modules/styled-jsx/**/*'],
  },
  turbopack: {},
};

export default nextConfig;

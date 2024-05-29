/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/v1/:path*',
          destination: 'http://144.24.77.244:9000/api/v1/:path*',
          // destination: 'http://127.0.0.1:9000/api/v1/:path*',

        },
      ]
    },
    output: 'export'
  }
  module.exports = nextConfig
  
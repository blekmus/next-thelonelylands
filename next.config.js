/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH || ''

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**',
      },
    ],

  },
  output: 'export',
}

module.exports = nextConfig

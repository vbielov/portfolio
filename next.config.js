/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  output: 'export',
  assetPrefix: process.env.ASSET_PREFIX,
  basePath: process.env.BASE_PATH,
}

module.exports = nextConfig

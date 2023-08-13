/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = 'portfolio';

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: 'export',
}

module.exports = nextConfig

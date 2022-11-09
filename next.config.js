/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", 'styles.redditmedia.com', 'www.gravatar.com']
  }
}

module.exports = nextConfig

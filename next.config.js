/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "external-content.duckduckgo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "f004.backblazeb2.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

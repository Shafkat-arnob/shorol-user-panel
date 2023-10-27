const { config } = require('process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //appDir: true,
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "146.190.110.177",
        port: "8080",
        pathname: "/**",
      },
    ],
    formats:['image/webp']
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PATH_URL: process.env.PATH_URL
  },
  images: {
    domains: ["http2.mlstatic.com"]
  }
};

module.exports = nextConfig;

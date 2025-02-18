import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  devIndicators: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/styles": path.resolve(process.cwd(), "src/shared/styles"),
      "@/features": path.resolve(process.cwd(), "src/features"),
      "@/widgets": path.resolve(process.cwd(), "src/widgets"),
      "@/entities": path.resolve(process.cwd(), "src/entities"),
      "@/shared": path.resolve(process.cwd(), "src/shared"),
    };
    return config;
  },
};

export default nextConfig;

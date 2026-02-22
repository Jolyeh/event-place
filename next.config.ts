import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  allowedDevOrigins: [

    "http://10.74.164.209:3000",

  ],
};

export default nextConfig;

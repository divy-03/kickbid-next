import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "kickbid-user-images.s3.us-east-1.amazonaws.com"
      }
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;


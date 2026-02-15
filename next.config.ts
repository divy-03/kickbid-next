import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "ui-avatars.com"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

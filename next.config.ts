import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  domains: ['images.unsplash.com', 'imagedelivery.net', 'res.cloudinary.com','placehold.co','via.placeholder.com'],
},
eslint: {
        ignoreDuringBuilds: true,
      },

};

export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "images.meesho.com", "example.com"], // Allow images from tailwindui.com
  },
};

export default nextConfig;

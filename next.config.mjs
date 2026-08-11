/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add remote hosts here if photography is served from a CDN/DAM.
    remotePatterns: [],
  },
};
export default nextConfig;

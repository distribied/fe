/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure for static exports if needed (optional)
  // output: 'export',

  // Image optimization configuration
  images: {
    // Allow images from external domains if needed
    remotePatterns: [],
  },

  // Transpile specific packages if needed
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;

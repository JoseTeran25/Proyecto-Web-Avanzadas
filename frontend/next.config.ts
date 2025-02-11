import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 🔥 Ignora errores de TypeScript en el build
  },
  eslint: {
    ignoreDuringBuilds: true, // 🔥 No detiene el build por errores de ESLint
  },
};

export default nextConfig;

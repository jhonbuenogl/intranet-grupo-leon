/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
      generator: {
        filename: "static/pdf/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;

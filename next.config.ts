import type { NextConfig } from "next"

// 判断是否在 GitHub Pages 部署
const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // 👈 让 Next.js 生成静态文件
  images: {
    unoptimized: true, // 👈 GitHub Pages 不支持 Next.js 图片优化
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: true,
  },
  // 👇 basePath & assetPrefix 用于 GitHub Pages 子路径
  basePath: isProd ? "/next-web-nav" : "",
  assetPrefix: isProd ? "/next-web-nav/" : "",
}

export default nextConfig


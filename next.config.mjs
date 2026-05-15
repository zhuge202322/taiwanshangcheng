/** @type {import('next').NextConfig} */
const nextConfig = {
  // Docker 部署：构建为 standalone，运行镜像无需 node_modules
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'healthformula.com.tw' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  }
};
export default nextConfig;

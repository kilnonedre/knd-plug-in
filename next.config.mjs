/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  sassOptions: {
    additionalData: "@import '@/style/indexStyle.scss';",
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { hostname: "rocket-fun-dev.s3.us-east-1.amazonaws.com" },
      {
        hostname: "rocketfun.s3.ap-southeast-1.amazonaws.com",
      },
      {
        hostname: "rocket-fun-dev.s3.us-east-1.amazonaws.com"
      }
    ],
  },
}

export default nextConfig

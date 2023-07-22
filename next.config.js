/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["www.seriouseats.com", "theviewfromgreatisland.com", "ik.imagekit.io"]
  }
}

module.exports = nextConfig

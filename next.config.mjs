/** @type {import('next').NextConfig} */
const nextConfig = {
  /*In next 14, Server Actions are available by default now,
    `experimental.serverActions` option can be safely removed.
    that is why I commented it.
  experimental: {
    serverActions: true,
  },
  */
  images: {
    domains: ["ykocoksoxmnnmazieeba.supabase.co"],
  },
};

export default nextConfig;

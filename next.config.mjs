/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname: "wordpress-1297556-4717351.cloudwaysapps.com"
            },
            {
                protocol: "https",
                hostname: "ucarecdn.com"
            }
        ],
    },
};

export default nextConfig;

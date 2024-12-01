/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [process.env.NEXT_PUBLIC_S3_BUCKET_URL],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

module.exports = nextConfig;

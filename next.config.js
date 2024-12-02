/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.shields.io',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_S3_BUCKET_URL || '',
            },
            {
                protocol: 'https',
                hostname: 'url.kr',
            },
        ],
        contentDispositionType: 'attachment',
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack(config) {
        const fileLoaderRule = config.module?.rules?.find((rule) => {
            return (
                rule &&
                typeof rule !== 'string' &&
                rule.test instanceof RegExp &&
                rule.test.test('.svg')
            );
        });

        if (fileLoaderRule && typeof fileLoaderRule !== 'string') {
            config.module?.rules?.push(
                {
                    ...fileLoaderRule,
                    test: /\.svg$/i,
                    resourceQuery: /url/,
                },
                {
                    test: /\.svg$/i,
                    issuer: fileLoaderRule.issuer,
                    resourceQuery: {
                        not: [
                            ...(fileLoaderRule.resourceQuery?.not || []),
                            /url/,
                        ],
                    },
                    use: ['@svgr/webpack'],
                },
            );

            fileLoaderRule.exclude = /\.svg$/i;
        }

        return config;
    },
};

module.exports = nextConfig;

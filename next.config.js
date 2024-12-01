/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: process.env.NEXT_PUBLIC_S3_BUCKET_URL
            ? [process.env.NEXT_PUBLIC_S3_BUCKET_URL]
            : [''],
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

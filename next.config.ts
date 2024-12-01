import { NextConfig } from 'next';
import { Configuration } from 'webpack';

const nextConfig: NextConfig = {
    reactStrictMode: true,
    webpack(config: Configuration) {
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
                            ...((fileLoaderRule.resourceQuery as any)?.not ||
                                []),
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

export default nextConfig;

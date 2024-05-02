/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
    reactStrictMode: false,
    webpack(config, options) {
        config.module.rules.push({
            test: /.(woff|woff2|eot|ttf|otf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/_next/static/fonts/',
                    outputPath: 'static/fonts/'
                }
            }
        });

        return config;
    }
};

export default nextConfig;
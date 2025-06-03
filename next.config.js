/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getRedirects = require('./src/lib/sanity/services/get-redirects.js');

module.exports = {
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // TODO: uncomment this before deploying to production
  // async headers() {
  //   return [
  //     {
  //       source: '/animations/:all*',
  //       headers: [
  //         {
  //           key: 'Cache-Control',
  //           value: 'public, max-age=31536000, immutable',
  //         },
  //       ],
  //     },
  //   ];
  // },
  async redirects() {
    const redirects = await getRedirects();

    return [...redirects];
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        test: /(?<!inline)\.svg$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 512,
              publicPath: '/_next/static/media',
              outputPath: 'static/media',
              fallback: require.resolve('file-loader'),
            },
          },
          {
            loader: require.resolve('svgo-loader'),
          },
        ],
      },
      {
        test: /\.inline.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
            },
          },
        ],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: (filePath) => {
        const fileName = filePath.split('/').pop();

        return fileName === 'rive.wasm';
      },
      type: 'asset/resource',
      generator: {
        filename: 'static/[name].[hash][ext]',
      },
    });

    return config;
  },
};

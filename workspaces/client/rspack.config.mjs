import path from 'node:path';

import { UnoCSSRspackPlugin } from '@unocss/webpack/rspack';
import { rspack } from '@rspack/core';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const browserTargets = 'Chrome >= 134';

/** @type {import('@rspack/core').Configuration} */
const config = {
  devtool: 'source-map',
  entry: './src/main.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?(j|t)s$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
            },
            externalHelpers: true,
            transform: {
              react: {
                runtime: 'automatic',
                development: false,
                refresh: false,
              },
            },
          },
          env: {
            targets: browserTargets,
          },
        },
      },
      {
        test: /\.(j|t)sx$/,
        loader: 'builtin:swc-loader',
        exclude: [/[\\/]node_modules[\\/]/],
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
                development: false,
                refresh: false,
              },
            },
            externalHelpers: true,
          },
          env: {
            targets: browserTargets,
          },
        },
      },
      {
        test: /\.css$/,
        use: [rspack.CssExtractRspackPlugin.loader, 'css-loader'],
      },
      {
        test: /\.avif$/,
        type: 'asset/resource',
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        resourceQuery: /arraybuffer/,
        type: 'javascript/auto',
        use: {
          loader: 'arraybuffer-loader',
        },
      },
    ],
  },
  output: {
    chunkFilename: 'chunk-[contenthash].js',
    filename: 'main.js',
    path: path.resolve(import.meta.dirname, './dist'),
    publicPath: 'auto',
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({ filename: 'main.css' }),
    UnoCSSRspackPlugin({ configFile: path.resolve(import.meta.dirname, './uno.config.ts') }),
    new rspack.EnvironmentPlugin({ API_BASE_URL: '/api', NODE_ENV: '' }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
  resolve: {
    extensions: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts', '.tsx', '.jsx'],
  },
};

export default config;

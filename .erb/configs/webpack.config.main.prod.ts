/**
 * Webpack config for production electron main process
 */

import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';
import deleteSourceMaps from '../scripts/delete-source-maps';

checkNodeEnv('production');
deleteSourceMaps();

/**
 * Webpack configuration object for production build of Electron main process
 * @type {webpack.Configuration}
 */
const configuration: webpack.Configuration = {
  /** Generate source maps for debugging in production */
  devtool: 'source-map',

  /** Set webpack mode to production for optimizations */
  mode: 'production',

  /** Target Electron main process environment */
  target: 'electron-main',

  /** Entry points for main and preload scripts */
  entry: {
    main: path.join(webpackPaths.srcMainPath, 'main.ts'),
    preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
  },

  /** Output configuration for bundled files */
  output: {
    path: webpackPaths.distMainPath,
    filename: '[name].js',
    library: {
      type: 'umd',
    },
  },

  /** Optimization settings for production build */
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },

  /** Webpack plugins for production build */
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled',
      analyzerPort: 8888,
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: 'false',
      START_MINIMIZED: 'false',
    }),

    new webpack.DefinePlugin({
      'process.type': '"browser"',
    }),
    // 与@xenova/transfomers 有冲突，暂时禁用。https://github.com/bytenode/bytenode/issues/197
    // new BytenodeWebpackPlugin({
    //   compileForElectron: true,
    // }),
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false,
  },
};

export default merge(baseConfig, configuration);
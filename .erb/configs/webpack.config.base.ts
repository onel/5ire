/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { RsdoctorWebpackPlugin } from '@rsdoctor/webpack-plugin';
import { dependencies as externals } from '../../release/app/package.json';

/**
 * Base webpack configuration object that serves as foundation for other webpack configs.
 * Configures externals, module processing, output settings, resolution, and plugins.
 */
const configuration: webpack.Configuration = {
  /**
   * External dependencies that should not be bundled.
   * Includes all package.json dependencies and handles .node files and lancedb modules.
   */
  externals: [
    ...Object.keys(externals || {}),
    function ({ request }, callback) {
      if (
        request &&
        (request.endsWith('.node') || request.includes('lancedb'))
      ) {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    },
  ],

  /**
   * Controls webpack output verbosity - only shows errors.
   */
  stats: 'errors-only',

  /**
   * Module processing rules configuration.
   */
  module: {
    /**
     * Rules for processing different file types.
     */
    rules: [
      {
        /**
         * TypeScript and JavaScript file processing rule.
         * Uses ts-loader for transpilation with type checking disabled for faster builds.
         */
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'NodeNext',
            },
          },
        },
      },
    ],
  },

  /**
   * Output configuration for bundled files.
   */
  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    /**
     * File extensions to resolve automatically.
     */
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    /**
     * Directories to search when resolving modules.
     */
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    /**
     * Plugins to enhance module resolution.
     */
    plugins: [new TsconfigPathsPlugins()],
  },

  /**
   * Webpack plugins configuration.
   */
  plugins: [
    /**
     * Environment variables plugin for setting NODE_ENV.
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    /**
     * Optional RsDoctor plugin for webpack analysis when RSDOCTOR environment variable is set.
     */
    process.env.RSDOCTOR &&
      new RsdoctorWebpackPlugin({
        // 插件选项
      }),
  ].filter(Boolean),
};

export default configuration;
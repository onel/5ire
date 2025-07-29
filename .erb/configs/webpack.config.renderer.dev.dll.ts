/**
 * Builds the DLL for development electron renderer process
 */

import webpack from 'webpack';
import path from 'path';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import { dependencies } from '../../package.json';
import checkNodeEnv from '../scripts/check-node-env';

checkNodeEnv('development');

/** Distribution path for the DLL files */
const dist = webpackPaths.dllPath;

/**
 * Webpack configuration for building development DLL for electron renderer process.
 * This configuration creates a DLL bundle containing all project dependencies
 * to improve build performance during development.
 */
const configuration: webpack.Configuration = {
  /** Base context path for resolving entry points */
  context: webpackPaths.rootPath,

  /** Source map type for development debugging */
  devtool: 'eval',

  /** Build mode set to development */
  mode: 'development',

  /** Target environment for electron renderer process */
  target: 'electron-renderer',

  /** External dependencies that should not be bundled */
  externals: ['fsevents', 'crypto-browserify'],

  /**
   * Use `module` from `webpack.config.renderer.dev.js`
   */
  module: require('./webpack.config.renderer.dev').default.module,

  /** Entry point configuration using all package dependencies */
  entry: {
    renderer: Object.keys(dependencies || {}),
  },

  /** Output configuration for the generated DLL files */
  output: {
    /** Output directory path */
    path: dist,
    /** Output filename pattern */
    filename: '[name].dev.dll.js',
    /** Library configuration for the DLL */
    library: {
      name: 'renderer',
      type: 'var',
    },
  },

  /** Webpack plugins configuration */
  plugins: [
    /**
     * DLL plugin to generate the DLL manifest file
     */
    new webpack.DllPlugin({
      path: path.join(dist, '[name].json'),
      name: '[name]',
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
      NODE_ENV: 'development',
    }),

    /**
     * Loader options plugin for development configuration
     */
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: webpackPaths.srcPath,
        output: {
          path: webpackPaths.dllPath,
        },
      },
    }),
  ],
};

export default merge(baseConfig, configuration);
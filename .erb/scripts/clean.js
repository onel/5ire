/**
 * Build cleanup script that removes generated directories
 */

import { rimrafSync } from 'rimraf';
import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

/**
 * Array of folder paths that should be removed during cleanup
 * @type {string[]}
 */
const foldersToRemove = [
  webpackPaths.distPath,
  webpackPaths.buildPath,
  webpackPaths.dllPath,
];

/**
 * Remove each folder if it exists
 * Iterates through the foldersToRemove array and removes any existing directories
 */
foldersToRemove.forEach((folder) => {
  if (fs.existsSync(folder)) rimrafSync(folder);
});
/**
 * Module linking utility script that creates symbolic links between node_modules directories.
 * This script ensures that the source directory has access to node_modules by creating
 * a junction link when necessary.
 */

import fs from 'fs';
import webpackPaths from '../configs/webpack.paths';

const { srcNodeModulesPath } = webpackPaths;
const { appNodeModulesPath } = webpackPaths;

/**
 * Creates a symbolic link (junction) from appNodeModulesPath to srcNodeModulesPath
 * if the source node_modules doesn't exist but the app node_modules does.
 * This ensures the source directory can access dependencies through the symbolic link.
 */
if (!fs.existsSync(srcNodeModulesPath) && fs.existsSync(appNodeModulesPath)) {
  fs.symlinkSync(appNodeModulesPath, srcNodeModulesPath, 'junction');
}
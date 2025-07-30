import fs from 'fs';
import path from 'path';
import { rimrafSync } from 'rimraf';
import webpackPaths from '../configs/webpack.paths';

/**
 * Deletes all JavaScript source map files from webpack distribution directories.
 * Checks for the existence of main and renderer distribution paths and removes
 * all files matching the pattern '*.js.map' from those directories.
 */
export default function deleteSourceMaps() {
  if (fs.existsSync(webpackPaths.distMainPath))
    rimrafSync(path.join(webpackPaths.distMainPath, '*.js.map'), {
      glob: true,
    });
  if (fs.existsSync(webpackPaths.distRendererPath))
    rimrafSync(path.join(webpackPaths.distRendererPath, '*.js.map'), {
      glob: true,
    });
}
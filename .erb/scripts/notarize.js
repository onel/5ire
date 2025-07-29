const { notarize } = require('@electron/notarize');
const { build } = require('../../package.json');

/**
 * Notarizes a macOS Electron application using Apple's notarytool.
 * This function is typically called as part of the Electron build process
 * to ensure the app can be distributed outside the Mac App Store.
 * 
 * @param {Object} context - The build context object provided by electron-builder
 * @param {string} context.electronPlatformName - The target platform name (e.g., 'darwin', 'win32', 'linux')
 * @param {string} context.appOutDir - The output directory where the built app is located
 * @param {Object} context.packager - The packager instance containing app information
 * @param {Object} context.packager.appInfo - Application information object
 * @param {string} context.packager.appInfo.productFilename - The product filename for the app
 * 
 * @returns {Promise<void>} A promise that resolves when notarization is complete or skipped
 * 
 * @requires Environment variables:
 * - APPLE_ID: Apple ID email address for notarization
 * - APPLE_ID_PASS: App-specific password for the Apple ID
 * - APPLE_TEAM_ID: Apple Developer Team ID
 * 
 * @example
 * // This function is typically used in electron-builder configuration
 * // as an afterSign hook:
 * // "afterSign": ".erb/scripts/notarize.js"
 */
exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) {
    console.warn(
      'Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set',
    );
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  console.info(`Notarizing ${build.appId} start...`);
  await notarize({
    tool: 'notarytool',
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    teamId: process.env.APPLE_TEAM_ID,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASS,
  });
};
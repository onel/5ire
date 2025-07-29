/**
 * Custom hook that detects the current operating system platform.
 * 
 * @returns {Object} Platform information object
 * @returns {boolean} returns.isDarwin - True if running on macOS
 * @returns {boolean} returns.isLinux - True if running on Linux
 * @returns {boolean} returns.isWindows - True if running on Windows
 * @returns {string} returns.platform - Raw platform string ('darwin', 'linux', 'win32', etc.)
 */
export default function usePlatform() {
  const platform = window.electron.platform || 'darwin';
  const isDarwin = platform === 'darwin';
  const isLinux = platform === 'linux';
  const isWindows = platform === 'win32';
  return {
    isDarwin,
    isLinux,
    isWindows,
    platform,
  };
}
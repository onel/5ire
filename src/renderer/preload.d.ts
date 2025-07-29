import { ElectronHandler, EnvVars } from 'main/preload';

/**
 * Global type declarations for Electron renderer process.
 * Extends the Window interface to include Electron-specific properties.
 */
declare global {
  // eslint-disable-next-line no-unused-vars
  /**
   * Extended Window interface that includes Electron-specific properties
   * available in the renderer process.
   */
  interface Window {
    /**
     * Electron handler providing access to main process functionality
     * through the preload script's exposed API.
     */
    electron: ElectronHandler;
    
    /**
     * Environment variables exposed to the renderer process
     * through the preload script.
     */
    envVars: EnvVars;
  }
}

export {};
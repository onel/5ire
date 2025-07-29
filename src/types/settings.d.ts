import { ProviderType } from 'providers/types';
import { FontSize, ThemeType } from './appearance';

/**
 * Supported language types for the application interface
 * - 'en': English language
 * - 'zh': Chinese language  
 * - 'system': Use system default language
 */
export type LanguageType = 'en' | 'zh' | 'system';

/**
 * Configuration settings for API providers
 */
export interface IAPISettings {
  /** The type of API provider being configured */
  provider: ProviderType;
  /** Base URL for the API endpoint */
  base: string;
  /** API authentication key */
  key: string;
  /** Model identifier to use with the API */
  model: string;
  /** Optional secret key for additional authentication */
  secret?: string;
  /** Optional deployment identifier for specific API deployments */
  deploymentId?: string;
  /** Optional custom endpoint URL override */
  endpoint?: string;
}

/**
 * Main application settings configuration
 */
export interface ISettings {
  /** Visual theme setting for the application */
  theme: ThemeType;
  /** Language setting for the user interface */
  language: LanguageType;
  /** Font size setting for text display */
  fontSize: FontSize;
  /** API configuration settings */
  api: {
    /** Identifier of the currently active API provider */
    activeProvider: string;
    /** Collection of configured API providers mapped by their identifiers */
    providers: {
      [key: string]: IAPISettings;
    };
  };
}
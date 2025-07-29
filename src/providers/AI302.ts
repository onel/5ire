import { IServiceProvider } from './types';

/**
 * 302.AI service provider configuration
 * Defines the configuration settings for integrating with the 302.AI API service
 */
export default {
  /** Display name of the service provider */
  name: '302.AI',
  /** Base URL for the 302.AI API endpoints */
  apiBase: 'http://api.302.ai/v1',
  /** Currency used for pricing and billing */
  currency: 'USD',
  /** Referral link for the 302.AI service */
  referral: 'https://share.302.ai/DPDpUI',
  /** General configuration options for the service provider */
  options: {
    /** Whether the API base URL can be customized by users */
    apiBaseCustomizable: true,
    /** Endpoint path for retrieving available models */
    modelsEndpoint: '/models?llm=1',
  },
  /** Chat-specific configuration settings */
  chat: {
    /** API schema fields required for chat functionality */
    apiSchema: ['base', 'key', 'proxy'],
    /** Documentation strings for chat parameters */
    docs: {
      /** Description of the temperature parameter's effect on output creativity */
      temperature:
        'Higher values will make the output more creative and unpredictable, while lower values will make it more precise.',
      /** Description of the presence penalty parameter's effect on topic diversity */
      presencePenalty:
        "Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      /** Description of the top-p parameter for nucleus sampling */
      topP: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with topP probability mass.',
    },
    /** Default placeholder values for configuration fields */
    placeholders: {
      /** Default placeholder for the API base URL */
      base: 'http://api.302.ai/v1',
    },
    /** Configuration range and default for presence penalty parameter */
    presencePenalty: { min: -2, max: 2, default: 0 },
    /** Configuration range and default for top-p parameter */
    topP: { min: 0, max: 1, default: 1 },
    /** Configuration range and default for temperature parameter */
    temperature: { min: 0, max: 1, default: 0.9 },
    /** Chat-specific options */
    options: {
      /** Whether users can customize the model selection */
      modelCustomizable: true,
    },
    /** Array of available models (populated dynamically) */
    models: [],
  },
} as IServiceProvider;
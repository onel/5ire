import { IServiceProvider } from './types';

/**
 * Array of available Google Gemini chat models with their configurations.
 * Each model includes pricing, capabilities, context windows, and other specifications.
 */
const chatModels = [
  {
    id: 'gemini-2.5-pro-exp',
    name: 'gemini-2.5-pro-preview-05-06',
    label: 'gemini-2.5-pro-preview',
    contextWindow: 1000000,
    maxTokens: 64000,
    defaultMaxTokens: 32000,
    inputPrice: 0.00125,
    outputPrice: 0.01,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `Google's our most advanced coding model yet and is state-of-the-art across a range of benchmarks requiring enhanced reasoning.`,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'gemini-2.5-flash-preview-05-20',
    label: 'gemini-2.5-flash-preview',
    contextWindow: 1048576,
    maxTokens: 65536,
    defaultMaxTokens: 8000,
    inputPrice: 0.00015,
    outputPrice: 0.0004,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `Next generation features, superior speed, native tool use, and multimodal generation`,
  },
  {
    id: 'gemini-2.0-flash',
    name: 'gemini-2.0-flash',
    contextWindow: 1048576,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.0001,
    outputPrice: 0.0004,
    capabilities: {
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `Capable of reasoning about complex problems and possessing new thinking abilities`,
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'gemini-2.0-flash-lite',
    label: 'gemini-2.0-flash-lite',
    contextWindow: 1048576,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.000075,
    outputPrice: 0.0003,
    isDefault: true,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `Quality improvements, celebrate 1 year of Gemini`,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'gemini-1.5-pro',
    contextWindow: 1048576,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.00035,
    outputPrice: 0.0105,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `The multi-modal model from Google's Gemini family that balances model performance and speed.`,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'gemini-1.5-flash',
    contextWindow: 1048576,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.00035,
    outputPrice: 0.00105,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `Lightweight, fast and cost-efficient while featuring multimodal reasoning and a breakthrough long context window of up to one million tokens.`,
  },
  {
    id: 'gemini-1.5-flash-8b',
    name: 'gemini-1.5-flash-8b',
    contextWindow: 1048576,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.0000375,
    outputPrice: 0.00015,
    capabilities: {
      tools: {
        enabled: true,
      },
      json: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `The Gemini 1.5 Flash-8B is a small model designed for tasks that require less intelligence.`,
  },
];

/**
 * Google service provider configuration implementing the IServiceProvider interface.
 * Provides access to Google's Gemini models through the Generative Language API.
 * 
 * @property {string} name - Display name of the service provider
 * @property {string} apiBase - Base URL for the Google Generative Language API
 * @property {string} currency - Currency used for pricing (USD)
 * @property {Object} options - Provider-level configuration options
 * @property {boolean} options.apiBaseCustomizable - Whether the API base URL can be customized
 * @property {boolean} options.apiKeyCustomizable - Whether the API key can be customized
 * @property {Object} chat - Chat-specific configuration
 * @property {string[]} chat.apiSchema - Required API configuration fields
 * @property {Object} chat.presencePenalty - Presence penalty parameter configuration
 * @property {Object} chat.topP - Top-p parameter configuration for nucleus sampling
 * @property {Object} chat.temperature - Temperature parameter configuration for response randomness
 * @property {Object} chat.options - Chat-specific options
 * @property {boolean} chat.options.modelCustomizable - Whether the model can be customized
 * @property {boolean} chat.options.streamCustomizable - Whether streaming can be customized
 * @property {Array} chat.models - Array of available chat models
 */
export default {
  name: 'Google',
  apiBase: 'https://generativelanguage.googleapis.com',
  currency: 'USD',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 1 },
    temperature: { min: 0, max: 1, default: 0.9 },
    options: {
      modelCustomizable: true,
      streamCustomizable: false,
    },
    models: chatModels,
  },
} as IServiceProvider;
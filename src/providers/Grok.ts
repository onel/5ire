import { IServiceProvider } from './types';

/**
 * Array of available Grok chat models with their configurations and capabilities.
 * Each model includes pricing, context window limits, and supported features.
 */
const chatModels = [
  {
    id: 'grok-4',
    name: 'grok-4',
    contextWindow: 256000,
    defaultMaxTokens: 8000,
    maxTokens: 256000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    description: `Grok's latest and greatest flagship model, offering unparalleled performance in natural language, math and reasoning - the perfect jack of all trades.`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
  {
    id: 'grok-3',
    name: 'grok-3',
    contextWindow: 131072,
    defaultMaxTokens: 4000,
    maxTokens: 131072,
    inputPrice: 0.003,
    outputPrice: 0.015,
    description: `Grok's flagship model that excels at enterprise tasks like data extraction, programming, and text summarization.`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
  {
    id: 'grok-3-fast',
    name: 'grok-3-fast',
    contextWindow: 131072,
    defaultMaxTokens: 4000,
    maxTokens: 131072,
    inputPrice: 0.005,
    outputPrice: 0.025,
    isDefault: true,
    description: `Fast mode delivers reduced latency and a quicker time-to-first-token. Scroll down to read more.`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
  {
    id: 'grok-3-mini',
    name: 'grok-3-mini',
    contextWindow: 131072,
    defaultMaxTokens: 4000,
    maxTokens: 131072,
    inputPrice: 0.0003,
    outputPrice: 0.0005,
    isDefault: true,
    description: `A lightweight model that thinks before responding. Excels at quantitative tasks that involve math and reasoning.`,
    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
  },
  {
    id: 'grok-3-mini-fast',
    name: 'grok-3-mini-fast',
    contextWindow: 131072,
    defaultMaxTokens: 4000,
    maxTokens: 131072,
    inputPrice: 0.0006,
    outputPrice: 0.004,
    isDefault: true,
    description: `Fast mode delivers reduced latency and a quicker time-to-first-token. Scroll down to read more.`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
  {
    id: 'grok-2-vision',
    name: 'grok-2-vision',
    contextWindow: 32768,
    defaultMaxTokens: 4000,
    maxTokens: 4096,
    inputPrice: 0.002,
    outputPrice: 0.01,
    capabilities: {
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `specialized model for advanced image generation and understanding`,
  },
  {
    id: 'grok-2',
    name: 'grok-2',
    contextWindow: 128000,
    defaultMaxTokens: 128000,
    maxTokens: 128000,
    inputPrice: 0.002,
    outputPrice: 0.01,
    isDefault: true,
    description: `Comparable performance to Grok 2 but with improved efficiency, speed and capabilities.`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
];

/**
 * Grok service provider configuration implementing the IServiceProvider interface.
 * Defines the API endpoint, supported models, and configuration options for Grok AI services.
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for the Grok API
 * @property {string} currency - The currency used for pricing (USD)
 * @property {Object} options - Global configuration options for the provider
 * @property {boolean} options.apiBaseCustomizable - Whether the API base URL can be customized
 * @property {boolean} options.apiKeyCustomizable - Whether the API key can be customized
 * @property {Object} chat - Chat-specific configuration and available models
 * @property {string[]} chat.apiSchema - Required API configuration fields
 * @property {Object} chat.presencePenalty - Presence penalty parameter constraints
 * @property {Object} chat.topP - Top-p parameter constraints for nucleus sampling
 * @property {Object} chat.temperature - Temperature parameter constraints for response randomness
 * @property {Object} chat.options - Chat-specific options
 * @property {boolean} chat.options.modelCustomizable - Whether the model can be customized
 * @property {Array} chat.models - Array of available chat models with their configurations
 */
export default {
  name: 'Grok',
  apiBase: 'https://api.x.ai/v1',
  currency: 'USD',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 1 },
    temperature: { min: 0, max: 2, default: 0.9 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;
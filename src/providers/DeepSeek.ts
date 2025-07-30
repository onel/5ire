import { IServiceProvider } from './types';

/**
 * Array of available chat models for the DeepSeek service provider.
 * Each model defines its capabilities, pricing, and configuration parameters.
 */
const chatModels = [
  {
    id: 'deepseek-chat',
    name: 'deepseek-chat',
    contextWindow: 65536,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.0006,
    outputPrice: 0.002,
    isDefault: true,
    description: `60 tokens/second, Enhanced capabilities,API compatibility intact`,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
  {
    id: 'deepseek-reasoner',
    name: 'deepseek-reasoner',
    contextWindow: 65536,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.003,
    outputPrice: 0.016,
    isDefault: true,
    description: `Performance on par with OpenAI-o1`,
    capabilities: {
      tools: null,
    },
  },
];

/**
 * DeepSeek service provider configuration object.
 * Defines the API endpoints, pricing currency, customization options,
 * and chat model configurations for the DeepSeek AI service.
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for the DeepSeek API
 * @property {string} currency - The currency used for pricing (Chinese Yuan)
 * @property {Object} options - Global customization options for the provider
 * @property {Object} chat - Chat-specific configuration including models and parameters
 */
export default {
  name: 'DeepSeek',
  apiBase: 'https://api.deepseek.com/v1',
  currency: 'CNY',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 1 },
    temperature: { min: 0, max: 2, default: 1 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;
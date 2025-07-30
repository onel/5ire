import { IServiceProvider } from './types';

/**
 * Array of available Anthropic chat models with their configurations and capabilities.
 * Each model includes pricing, token limits, and supported features like JSON, tools, and vision.
 */
const chatModels = [
  {
    id: 'claude-opus-4',
    name: 'claude-opus-4-20250514',
    label: 'claude-opus-4',
    contextWindow: 200000,
    maxTokens: 32000,
    defaultMaxTokens: 10000,
    inputPrice: 0.015,
    outputPrice: 0.075,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description: `Highest level of intelligence and capability`,
  },
  {
    id: 'claude-sonnet-4',
    name: 'claude-sonnet-4-20250514',
    label: 'claude-sonnet-4',
    contextWindow: 200000,
    maxTokens: 64000,
    defaultMaxTokens: 10000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description: `High intelligence and balanced performance`,
  },
  {
    id: 'claude-3.7-sonnet',
    name: 'claude-3-7-sonnet-20250219',
    label: 'claude-3.7-sonnet',
    contextWindow: 200000,
    maxTokens: 64000,
    defaultMaxTokens: 10000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description: `High intelligence with toggleable extended thinking`,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'claude-3-5-sonnet-20241022',
    label: 'claude-3.5-sonnet',
    contextWindow: 200000,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description: `High level of intelligence and capability`,
  },
  {
    id: 'claude-3.5-haiku',
    name: 'claude-3-5-haiku-20241022',
    label: 'claude-3.5-haiku',
    contextWindow: 200000,
    maxTokens: 8192,
    defaultMaxTokens: 8000,
    inputPrice: 0.0008,
    outputPrice: 0.004,
    description: `The fastest model of Anthropic, Intelligence at blazing speeds`,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
  },
  {
    id: 'claude-3-opus',
    name: 'claude-3-opus-20240229',
    label: 'claude-3-opus',
    contextWindow: 200000,
    maxTokens: 4096,
    defaultMaxTokens: 4000,
    inputPrice: 0.015,
    outputPrice: 0.075,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description: `Powerful multilingual model for highly complex tasks, top-level performance, intelligence, fluency, and understanding`,
  },
  {
    id: 'claude-3-sonnet',
    name: 'claude-3-sonnet-20240229',
    label: 'claude-3-sonnet',
    contextWindow: 200000,
    maxTokens: 4096,
    defaultMaxTokens: 4000,
    inputPrice: 0.003,
    outputPrice: 0.015,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description:
      'A multilingual model with balance of intelligence and speed, strong utility, balanced for scaled deployments',
  },
  {
    id: 'claude-3-haiku',
    name: 'claude-3-haiku-20240307',
    label: 'claude-3-haiku',
    contextWindow: 200000,
    maxTokens: 4096,
    defaultMaxTokens: 4000,
    inputPrice: 0.000025,
    outputPrice: 0.00125,
    capabilities: {
      json: {
        enabled: true,
      },
      tools: {
        enabled: true,
      },
      vision: {
        enabled: true,
        allowBase64: true,
        allowedMimeTypes: [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
        ],
      },
    },
    description:
      'Fastest and most compact multilingual model for near-instant responsiveness, quick and accurate targeted performance',
  },
];

/**
 * Anthropic service provider configuration object that implements the IServiceProvider interface.
 * Contains provider metadata, API configuration, and chat model settings including parameter ranges and available models.
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for the Anthropic API
 * @property {string} currency - The currency used for pricing (USD)
 * @property {Object} options - Provider-level configuration options
 * @property {boolean} options.apiBaseCustomizable - Whether the API base URL can be customized
 * @property {boolean} options.apiKeyCustomizable - Whether the API key can be customized
 * @property {Object} chat - Chat-specific configuration and settings
 * @property {string[]} chat.apiSchema - Required API schema fields for chat requests
 * @property {Object} chat.presencePenalty - Presence penalty parameter configuration with min, max, and default values
 * @property {Object} chat.topP - Top-p parameter configuration with min, max, and default values
 * @property {Object} chat.temperature - Temperature parameter configuration with min, max, and default values
 * @property {Object} chat.options - Chat-specific options
 * @property {boolean} chat.options.modelCustomizable - Whether the model can be customized
 * @property {Array} chat.models - Array of available chat models with their configurations
 */
export default {
  name: 'Anthropic',
  apiBase: 'https://api.anthropic.com/v1',
  currency: 'USD',
  options: {
    apiBaseCustomizable: true,
    apiKeyCustomizable: true,
  },
  chat: {
    apiSchema: ['base', 'key', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: null },
    temperature: { min: 0, max: 1, default: 1.0 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;
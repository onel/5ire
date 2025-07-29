import { IServiceProvider } from './types';

/**
 * Array of available chat models for the 5ire AI service provider.
 * Each model contains configuration details including pricing, capabilities, and limits.
 */
const chatModels = [
  {
    id: 'o4-mini',
    name: 'o4-mini',
    label: 'o4-mini',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 100000,
    inputPrice: 0.0011,
    outputPrice: 0.0044,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    isDefault: false,
    description: `o4-mini is OpenAI's latest small o-series model. It's optimized for fast, effective reasoning with exceptionally efficient performance in coding and visual tasks.`,
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    label: 'o3-mini',
    contextWindow: 200000,
    maxTokens: 100000,
    defaultMaxTokens: 100000,
    inputPrice: 0.0011,
    outputPrice: 0.004,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
    isDefault: false,
    description: `o3-mini is OpenAI's most recent small reasoning model, providing high intelligence at the same cost and latency targets of o1-min`,
  },
  {
    id: 'o1',
    name: 'o1',
    contextWindow: 200000,
    maxTokens: 100000,
    inputPrice: 0.015,
    outputPrice: 0.05,
    capabilities: {
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `The o1 reasoning model is designed to solve hard problems across domains`,
  },
  {
    id: 'o1-mini',
    name: 'o1-mini-2024-09-12',
    label: 'o1-mini',
    contextWindow: 128000,
    maxTokens: 65536,
    defaultMaxTokens: 60000,
    inputPrice: 0.0011,
    outputPrice: 0.004,
    capabilities: {
      vision: {
        enabled: true,
        allowBase64: true,
        allowUrl: true,
      },
    },
    description: `o1-mini is a faster and more affordable reasoning model`,
  },
  {
    id: 'gpt-4.1',
    name: 'gpt-4.1',
    label: 'gpt-4.1',
    contextWindow: 1047576,
    maxTokens: 32768,
    defaultMaxTokens: 4000,
    inputPrice: 0.002,
    outputPrice: 0.008,
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
    isDefault: true,
    description: `GPT-4.1 is OpenAI's flagship model for complex tasks. It is well suited for problem solving across domains.`,
  },
  {
    id: 'gpt-4.1-nano',
    name: 'gpt-4.1-nano',
    label: 'gpt-4.1-nano',
    contextWindow: 1047576,
    maxTokens: 32768,
    defaultMaxTokens: 8000,
    inputPrice: 0.002,
    outputPrice: 0.008,
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
    isDefault: true,
    description: `GPT-4.1 nano is the fastest, most cost-effective GPT-4.1 model.`,
  },
  {
    id: 'gpt-4.1-mini',
    name: 'gpt-4.1-mini',
    label: 'gpt-4.1-mini',
    contextWindow: 1047576,
    maxTokens: 32768,
    defaultMaxTokens: 8000,
    inputPrice: 0.0004,
    outputPrice: 0.0016,
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
    isDefault: true,
    description: `GPT-4.1 mini provides a balance between intelligence, speed, and cost that makes it an attractive model for many use cases.`,
  },
  {
    id: 'gpt-4o',
    name: 'gpt-4o',
    label: 'gpt-4o',
    contextWindow: 128000,
    maxTokens: 16384,
    defaultMaxTokens: 8000,
    inputPrice: 0.0025,
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
    isDefault: true,
    description: `GPT-4o ("o" for "omni") is OpenAI's versatile, high-intelligence flagship model. It accepts both text and image inputs, and produces text outputs (including Structured Outputs). It is the best model for most tasks, and is OpenAI's most capable model outside of it's o-series models.`,
  },
  {
    id: 'gpt-4o-mini',
    name: 'gpt-4o-mini',
    label: 'gpt-4o-mini',
    contextWindow: 128000,
    maxTokens: 100000,
    defaultMaxTokens: 10000,
    inputPrice: 0.0011,
    outputPrice: 0.0044,
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
    description: `o4-mini is OpenAI's latest small o-series model. It's optimized for fast, effective reasoning with exceptionally efficient performance in coding and visual tasks.`,
  },
  {
    id: 'gpt-4',
    name: 'gpt-4',
    contextWindow: 128000,
    maxTokens: 4096,
    defaultMaxTokens: 4000,
    inputPrice: 0.03,
    outputPrice: 0.06,
    capabilities: {
      tools: {
        enabled: true,
      },
    },
  },
];

/**
 * Service provider configuration for 5ire AI service.
 * Defines the API endpoint, pricing currency, premium status, and available chat models.
 * 
 * @type {IServiceProvider}
 */
export default {
  name: '5ire',
  apiBase: 'https://openai.5ireai.com/v1',
  currency: 'USD',
  isPremium: true,
  options: {
    apiBaseCustomizable: false,
    apiKeyCustomizable: false,
  },
  chat: {
    apiSchema: ['base', 'proxy'],
    presencePenalty: { min: -2, max: 2, default: 0 },
    topP: { min: 0, max: 1, default: 1 },
    temperature: { min: 0, max: 2, default: 1 },
    options: {
      modelCustomizable: true,
    },
    models: chatModels,
  },
} as IServiceProvider;
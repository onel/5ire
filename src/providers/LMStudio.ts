import { IServiceProvider } from './types';

/**
 * LMStudio service provider configuration object.
 * Defines the configuration for connecting to and using LMStudio's local AI service.
 * LMStudio runs locally on port 1234 by default and provides both chat and embedding capabilities.
 */
export default {
  /** The display name of the service provider */
  name: 'LMStudio',
  /** The base URL for the LMStudio API endpoint */
  apiBase: 'http://localhost:1234',
  /** The currency used for pricing calculations */
  currency: 'USD',
  /** Global options for the service provider */
  options: {
    /** Whether the API base URL can be customized by users */
    apiBaseCustomizable: true,
    /** The endpoint path for retrieving available models */
    modelsEndpoint: '/models',
  },
  /** Configuration for chat/completion functionality */
  chat: {
    /** Schema defining required API configuration fields */
    apiSchema: ['base', 'model', 'proxy'],
    /** Documentation strings for chat parameters */
    docs: {
      /** Documentation for the temperature parameter */
      temperature:
        'Higher values will make the output more creative and unpredictable, while lower values will make it more precise.',
      /** Documentation for the presence penalty parameter */
      presencePenalty:
        "Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
      /** Documentation for the top-p parameter */
      topP: 'An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with topP probability mass.',
    },
    /** Placeholder values for configuration fields */
    placeholders: {
      /** Default placeholder for the base URL field */
      base: 'localhost:1234',
    },
    /** Configuration constraints for presence penalty parameter */
    presencePenalty: { min: -2, max: 2, default: 0 },
    /** Configuration constraints for top-p parameter */
    topP: { min: 0, max: 1, default: 1 },
    /** Configuration constraints for temperature parameter */
    temperature: { min: 0, max: 1, default: 0.9 },

    /** Chat-specific options */
    options: {
      /** Whether users can customize the model selection */
      modelCustomizable: true,
    },
    /** Array of available chat models (empty by default) */
    models: [],
  },
  /** Configuration for embedding functionality */
  embedding: {
    /** Schema defining required API configuration fields for embeddings */
    apiSchema: ['base'],
    /** Placeholder values for embedding configuration fields */
    placeholders: {
      /** Default placeholder for the base URL field */
      base: 'localhost:1234',
    },
    /** Embedding-specific options */
    options: {
      /** Whether users can customize the embedding model selection */
      modelCustomizable: true,
    },
    /** Array of available embedding models (empty by default) */
    models: [],
  },
} as IServiceProvider;
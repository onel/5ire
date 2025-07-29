import { IChatModelConfig, IChatProviderConfig } from 'providers/types';

/**
 * Represents a prompt template with system and user messages
 */
export interface IPrompt {
  /** Unique identifier for the prompt */
  id: string;
  /** Display name of the prompt */
  name: string;
  /** System message content for the prompt */
  systemMessage: string;
  /** User message content for the prompt */
  userMessage: string;
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  /** Temperature setting for response randomness (0.0 to 1.0) */
  temperature?: number;
}

/**
 * Represents a chat conversation with its configuration and metadata
 */
export interface IChat {
  /** Unique identifier for the chat */
  id: string;
  /** Display name of the chat */
  name: string;
  /** Brief summary of the chat content */
  summary: string;
  /** ID of the folder containing this chat, null if not in a folder */
  folderId: string | null;
  /** Chat provider identifier */
  provider?: string;
  /** Model identifier used for this chat */
  model?: string;
  /** System message for the chat context */
  systemMessage?: string | null;
  /** Maximum number of context messages to include */
  maxCtxMessages?: number;
  /** Temperature setting for response randomness */
  temperature?: number;
  /** Whether to use streaming responses */
  stream?: boolean;
  /** Additional context information */
  context?: string | null;
  /** Maximum number of tokens to generate */
  maxTokens?: number | null;
  /** Timestamp when the chat was created */
  createdAt: number | null;
  /** Associated prompt template or prompt string */
  prompt: IPrompt | string | null;
  /** Current input text */
  input: string | null;
}

/**
 * Represents a single message within a chat conversation
 */
export interface IChatMessage {
  /** Unique identifier for the message */
  id: string;
  /** Optional bookmark identifier */
  bookmarkId?: string | null;
  /** ID of the chat this message belongs to */
  chatId: string;
  /** System message used for this interaction */
  systemMessage?: string | null;
  /** User prompt or input */
  prompt: string;
  /** AI-generated reply */
  reply: string;
  /** Optional reasoning explanation for the response */
  reasoning?: string;
  /** Model used to generate the response */
  model: string;
  /** Temperature setting used for this message */
  temperature: number;
  /** Maximum tokens setting for this message */
  maxTokens: number | null;
  /** Number of input tokens consumed */
  inputTokens: number;
  /** Number of output tokens generated */
  outputTokens: number;
  /** Optional memo or note */
  memo?: string;
  /** Timestamp when the message was created */
  createdAt: number;
  /** Whether the message is currently active */
  isActive: boolean | 0 | 1;
  /** JSON string of cited file references */
  citedFiles?: string;
  /** JSON string of cited text chunks */
  citedChunks?: string;
}

/**
 * Represents a response message from the chat API
 */
export interface IChatResponseMessage {
  /** Optional reasoning explanation */
  reasoning?: string;
  /** Main content of the response */
  content?: string;
  /** Function call information if applicable */
  function?: {
    /** Function identifier */
    id: string;
    /** Function name */
    name: string;
    /** Function arguments */
    args: any;
  };
  /** Whether this is the final message in the response */
  isEnd?: boolean;
  /** Number of input tokens used */
  inputTokens?: number;
  /** Number of output tokens generated */
  outputTokens?: number;
  /** Tool calls made during the response */
  toolCalls?: any;
  /** Error information if an error occurred */
  error?: {
    /** Error code */
    code?: number;
    /** Error type */
    type?: string;
    /** Error message */
    message: string;
  };
}

/**
 * Represents a Model Context Protocol (MCP) tool definition
 */
export interface IMCPTool {
  /** Name of the tool */
  name: string;
  /** Description of what the tool does */
  description: string;
  /** JSON schema for the tool's input parameters */
  inputSchema: {
    /** Schema type */
    type: string;
    /** Schema properties */
    properties: any;
    /** Required properties */
    required: any;
    /** Whether additional properties are allowed */
    additionalProperties: any;
  };
}

/**
 * Represents an OpenAI-compatible tool definition
 */
export interface IOpenAITool {
  /** Tool type identifier */
  type: string;
  /** Function definition for the tool */
  function: {
    /** Function name */
    name: string;
    /** Function description */
    description: string;
    /** Function parameters schema */
    parameters: {
      /** Parameter type */
      type: string;
      /** Parameter properties */
      properties: any;
      /** Required parameters */
      required: any;
      /** Whether additional properties are allowed */
      additionalProperties: any;
    };
  };
}

/**
 * Represents an Anthropic-compatible tool definition
 */
export interface IAnthropicTool {
  /** Tool name */
  name: string;
  /** Tool description */
  description: string;
  /** Input schema for the tool */
  input_schema: {
    /** Schema type */
    type: string;
    /** Schema properties */
    properties: any;
    /** Required properties */
    required: any;
  };
}

/**
 * Represents a Google-compatible tool definition
 */
export interface IGoogleTool {
  /** Tool name */
  name: string;
  /** Tool description */
  description: string;
  /** Optional parameters schema */
  parameters?: {
    /** Parameter type */
    type: string;
    /** Parameter properties */
    properties?: any;
    /** Required parameters */
    required?: any;
  };
}

/**
 * Represents content within a chat request message
 */
export interface IChatRequestMessageContent {
  /** Type of content */
  type:
    | 'text'
    | 'image_url'
    | 'image'
    | 'function'
    | 'tool_result'
    | 'tool_use';
  /** Optional content identifier */
  id?: string;
  /** Optional content name */
  name?: string;
  /** Input data for the content */
  input?: any;
  /** Tool use identifier */
  tool_use_id?: string;
  /** Text content */
  text?: string;
  /** Generic content data */
  content?: any;
  /** Array of image data */
  images?: string[];
  /** Image URL information */
  image_url?: {
    /** Image URL */
    url: string;
  };
  /** Function definition */
  function?: {
    /** Function name */
    name: string;
    /** Function description */
    description?: string;
    /** Function parameters */
    parameters?: any;
  };
  /** Source information for media content */
  source?: {
    /** Source type */
    type: string;
    /** Media type */
    media_type: string;
    /** Base64 encoded data */
    data: string;
  };
}

/**
 * Represents a part of a Gemini chat request message
 */
export interface IGeminiChatRequestMessagePart {
  /** Text content */
  text?: string;
  /** Inline data for media content */
  inline_data?: {
    /** MIME type of the data */
    mimeType: string;
    /** Base64 encoded data */
    data: string;
  };
  /** Function call information */
  functionCall?: any;
  /** Function response information */
  functionResponse?: any;
}

/**
 * Represents a message in a chat request
 */
export interface IChatRequestMessage {
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system' | 'tool' | 'model';
  /** Optional name of the sender */
  name?: string;
  /** Message content as string or structured content array */
  content?: string | IChatRequestMessageContent[];
  /** Tool call identifier */
  tool_call_id?: string;
  /** Message parts for Gemini format */
  parts?: IGeminiChatRequestMessagePart[];
  /** Tool calls made in this message */
  tool_calls?: any;
}

/**
 * Represents the payload for a chat API request
 */
export interface IChatRequestPayload {
  /** Model identifier */
  model?: string;
  /** Temperature for response randomness */
  temperature?: number;
  /** Maximum tokens to generate */
  max_tokens?: number | null;
  /** Maximum completion tokens (OpenAI specific) */
  max_completion_tokens?: number | null;
  /** Presence penalty for token repetition */
  presence_penalty?: number;
  /** Top-p sampling parameter */
  top_p?: number;
  /** Whether to stream the response */
  stream?: boolean;
  /** Prompt string for Ollama */
  prompt?: string;
  /** Context array for Ollama */
  context?: number[];
  /** System message for various providers */
  system?: string;
  /** Additional options */
  options?: {
    /** Temperature setting */
    temperature?: number;
    /** Maximum tokens setting */
    max_tokens?: number | null;
  };
  /** Array of messages for the conversation */
  messages?: IChatRequestMessage[];
  /** Contents array for certain providers */
  contents?: IChatRequestMessage[];
  /** Generation configuration for Google models */
  generationConfig?: {
    /** Maximum output tokens */
    maxOutputTokens?: number;
    /** Top-p sampling */
    top_p?: number;
    /** Temperature setting */
    temperature?: number;
  };
  /** Available tools */
  tools?: any;
  /** Tool choice configuration */
  tool_choice?: any;
  /** Whether to allow parallel tool calls */
  parallel_tool_calls?: boolean;
  /** Tool configuration */
  tool_config?: any;
}

/**
 * Represents different model groups available in the system
 */
export type ModelGroup =
  | 'GPT-3.5'
  | 'GPT-4'
  | 'Gemini'
  | 'ERNIE'
  | 'Moonshot'
  | 'Open Source';

/**
 * Provides context and utility methods for chat operations
 */
export interface IChatContext {
  /** Gets the currently active chat */
  getActiveChat: () => IChat;
  /** Gets the current provider configuration */
  getProvider: () => IChatProviderConfig;
  /** Gets the current model configuration */
  getModel: () => IChatModelConfig;
  /** Gets the current system message */
  getSystemMessage: () => string | null;
  /** Gets the current temperature setting */
  getTemperature: () => number;
  /** Gets the current max tokens setting */
  getMaxTokens: () => number;
  /** Gets the chat context string */
  getChatContext: () => string;
  /** Gets context messages, optionally up to a specific message ID */
  getCtxMessages: (msgId?: string) => IChatMessage[];
  /** Checks if streaming is enabled */
  isStream: () => boolean;
  /** Checks if the chat context is ready */
  isReady: () => boolean;
}

/**
 * Represents a folder that can contain multiple chats
 */
export interface IChatFolder {
  /** Unique identifier for the folder */
  id: string;
  /** Display name of the folder */
  name: string;
  /** Default provider for chats in this folder */
  provider?: string;
  /** Default model for chats in this folder */
  model?: string;
  /** Default system message for chats in this folder */
  systemMessage?: string | null;
  /** Default maximum context messages */
  maxCtxMessages?: number;
  /** Default temperature setting */
  temperature?: number;
  /** Default streaming setting */
  stream?: boolean;
  /** Knowledge collection IDs associated with this folder */
  knowledgeCollectionIds?: string | null;
  /** Default maximum tokens setting */
  maxTokens?: number | null;
  /** Timestamp when the folder was created */
  createdAt: number | null;
  /** Whether this is a newly created folder */
  isNew?: boolean;
}

/**
 * Represents a prompt definition with variables and metadata
 */
export interface IPromptDef {
  /** Unique identifier for the prompt definition */
  id: string;
  /** Display name of the prompt */
  name: string;
  /** System message template */
  systemMessage: string;
  /** User message template */
  userMessage: string;
  /** Maximum tokens to generate */
  maxTokens?: number;
  /** Temperature setting */
  temperature?: number;
  /** Variables used in the system message */
  systemVariables?: string[];
  /** Variables used in the user message */
  userVariables?: string[];
  /** Compatible model identifiers */
  models?: string[] | null;
  /** Timestamp when created */
  createdAt: number;
  /** Timestamp when last updated */
  updatedAt: number;
  /** Timestamp when pinned, null if not pinned */
  pinedAt: number | null;
  /** Provider key for MCP server or null for built-in */
  provider: string | null;
}

/**
 * Represents a chat stage with specific configuration
 */
export interface IStage {
  /** Chat identifier for this stage */
  chatId: string;
  /** Provider to use for this stage */
  provider: string;
  /** Model to use for this stage */
  model: string;
  /** System message for this stage */
  systemMessage?: string | null;
  /** Prompt template for this stage */
  prompt?: IPrompt | null;
  /** Input text for this stage */
  input?: string;
  /** Temperature setting for this stage */
  temperature?: number;
  /** Maximum tokens for this stage */
  maxTokens?: number | null;
  /** Maximum context messages for this stage */
  maxCtxMessages?: number;
  /** Whether to use streaming for this stage */
  stream?: boolean;
}
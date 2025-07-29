/**
 * Temporary chat identifier used for transient chat sessions
 */
export const TEMP_CHAT_ID = 'temp';

/**
 * The earliest date supported by the application
 */
export const EARLIEST_DATE = new Date('2023-08-01');

/**
 * Default AI provider name
 */
export const DEFAULT_PROVIDER = 'OpenAI';

/**
 * Error model identifier used when model loading fails
 */
export const ERROR_MODEL = 'ERROR_MODEL';

/**
 * Default temperature setting for AI model responses (0.0 = deterministic, 1.0 = creative)
 */
export const DEFAULT_TEMPERATURE = 0.9;

/**
 * Default context window size in tokens
 */
export const DEFAULT_CONTEXT_WINDOW = 128000;

/**
 * Maximum allowed context window size in tokens
 */
export const MAX_CONTEXT_WINDOW = 40000000; // 40M

/**
 * Default maximum number of tokens to generate in responses
 */
export const DEFAULT_MAX_TOKENS = 4096;

/**
 * Maximum allowed tokens for generation
 */
export const MAX_TOKENS = 16384;

/**
 * Default number of context messages to include in conversations
 */
export const NUM_CTX_MESSAGES = 10;

/**
 * Maximum number of context messages allowed
 */
export const MAX_CTX_MESSAGES = 99;

/**
 * Minimum number of context messages allowed
 */
export const MIN_CTX_MESSAGES = 0;

/**
 * Maximum number of files allowed in a single knowledge import operation
 */
export const KNOWLEDGE_IMPORT_MAX_FILES = 100;

/**
 * Maximum file size allowed for knowledge import (50MB)
 */
export const KNOWLEDGE_IMPORT_MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * Mapping of supported file extensions to their MIME types for document uploads
 */
export const SUPPORTED_FILE_TYPES: { [key: string]: string } = {
  txt: 'text/plain',
  md: 'text/plain',
  csv: 'text/csv',
  epub: 'application/epub+zip',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

/**
 * Mapping of supported image file extensions to their MIME types
 */
export const SUPPORTED_IMAGE_TYPES: { [key: string]: string } = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
};

/**
 * Height of the Windows title bar in pixels
 */
export const WINDOWS_TITLE_BAR_HEIGHT = 32;
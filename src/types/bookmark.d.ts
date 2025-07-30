/**
 * Interface representing a bookmark that stores conversation data and metadata.
 */
export interface IBookmark {
  /** Unique identifier for the bookmark */
  id: string;
  /** Message identifier associated with this bookmark */
  msgId: string;
  /** The user prompt or input that was bookmarked */
  prompt: string;
  /** The AI model's response to the prompt */
  reply: string;
  /** Optional reasoning or explanation for the response */
  reasoning?: string;
  /** Name or identifier of the AI model used */
  model: string;
  /** Temperature setting used for the AI model response generation */
  temperature: number;
  /** Optional user memo or note about this bookmark */
  memo?: string;
  /** Optional flag indicating if this bookmark is marked as favorite */
  favorite?: boolean;
  /** Optional string containing referenced file information */
  citedFiles?: string;
  /** Optional string containing referenced chunk information */
  citedChunks?: string;
  /** Timestamp when the bookmark was created (Unix timestamp) */
  createdAt: number;
}
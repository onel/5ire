/**
 * Represents a collection of knowledge files
 */
export interface ICollection {
  /** Unique identifier for the collection */
  id: string;
  /** Display name of the collection */
  name: string;
  /** Optional memo or description for the collection */
  memo?: string;
  /** Optional count of files in the collection */
  numOfFiles?: number;
  /** Optional flag indicating if the collection is marked as favorite */
  favorite?: boolean;
  /** Optional timestamp when the collection was pinned, null if not pinned */
  pinedAt?: number | null;
  /** Timestamp when the collection was created */
  createdAt: number;
  /** Timestamp when the collection was last updated */
  updatedAt: number;
}

/**
 * Represents a file within a knowledge collection
 */
export interface ICollectionFile {
  /** Unique identifier for the file */
  id: string;
  /** Identifier of the collection this file belongs to */
  collectionId: string;
  /** Name of the file */
  name: string;
  /** Size of the file in bytes */
  size: number;
  /** Optional count of chunks this file is divided into */
  numOfChunks?: number;
  /** Timestamp when the file was created */
  createdAt: number;
  /** Timestamp when the file was last updated */
  updatedAt: number;
}

/**
 * Represents a chunk of content from a knowledge file
 */
export interface IKnowledgeChunk {
  /** Unique identifier for the chunk */
  id: string;
  /** Identifier of the collection this chunk belongs to */
  collectionId: string;
  /** Identifier of the file this chunk belongs to */
  fileId: string;
  /** The actual content of the chunk */
  content: string;
}
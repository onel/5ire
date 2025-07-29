import Debug from 'debug';
import { IChatResponseMessage } from 'intellichat/types';
import IChatReader from './IChatReader';
import OpenAIReader from './OpenAIReader';

const debug = Debug('5ire:intellichat:OllamaReader');

/**
 * Chat reader implementation for Ollama API responses.
 * Extends OpenAIReader to provide Ollama-specific response parsing.
 */
export default class OllamaReader extends OpenAIReader implements IChatReader {
  /**
   * Parses a response chunk from the Ollama API into a standardized chat response message.
   * Handles both streaming and final response chunks based on the 'done' flag.
   * 
   * @param chunk - JSON string containing the response data from Ollama API
   * @returns Parsed chat response message with content, completion status, and token counts
   */
  protected parseReply(chunk: string): IChatResponseMessage {
    const data = JSON.parse(chunk);
    if (data.done) {
      return {
        content: data.message.content,
        isEnd: true,
        inputTokens: data.prompt_eval_count,
        outputTokens: data.eval_count,
      };
    }
    return {
      content: data.message.content,
      isEnd: false,
      toolCalls: data.message.tool_calls,
    };
  }
}
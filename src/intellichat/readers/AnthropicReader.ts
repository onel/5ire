import Debug from 'debug';
import { IChatResponseMessage } from 'intellichat/types';
import BaseReader from './BaseReader';
import { ITool } from './IChatReader';

const debug = Debug('5ire:intellichat:AnthropicReader');

/**
 * Reader implementation for processing Anthropic API streaming responses.
 * Handles parsing of Anthropic's specific message format and converts it to the standard IChatResponseMessage format.
 */
export default class AnthropicReader extends BaseReader {
  /**
   * Processes a single chunk from the Anthropic streaming response.
   * @param chunk - Raw string chunk received from the Anthropic API stream
   * @returns Parsed chat response message or null if processing fails
   */
  protected processChunk(chunk: string): IChatResponseMessage | null {
    try {
      // Each chunk is a complete JSON message in Anthropic's format
      return this.parseReply(chunk);
    } catch (error) {
      debug('Failed to process chunk:', error);
      return null;
    }
  }

  /**
   * Parses a JSON chunk from Anthropic's streaming format into a standardized chat response message.
   * Handles various Anthropic message types including content blocks, deltas, message events, and errors.
   * @param chunk - JSON string containing Anthropic message data
   * @returns Standardized chat response message with appropriate content and metadata
   */
  protected parseReply(chunk: string): IChatResponseMessage {
    const data = JSON.parse(chunk);
    if (data.type === 'content_block_start') {
      if (data.content_block.type === 'tool_use') {
        return {
          toolCalls: [
            {
              id: data.content_block.id,
              name: data.content_block.name,
              args: '',
            },
          ],
          isEnd: false,
        };
      }
      return {
        content: data.content_block.text,
        isEnd: false,
      };
    }
    if (data.type === 'content_block_delta') {
      if (data.delta.type === 'input_json_delta') {
        return {
          content: '',
          toolCalls: [
            {
              args: data.delta.partial_json,
              index: 0,
            },
          ],
        };
      }
      return {
        content: data.delta.text,
        isEnd: false,
      };
    }
    if (data.type === 'message_start') {
      return {
        content: '',
        isEnd: false,
        inputTokens: data.message.usage.input_tokens,
        outputTokens: data.message.usage.output_tokens,
      };
    }
    if (data.type === 'message_delta') {
      return {
        content: '',
        isEnd: false,
        outputTokens: data.usage.output_tokens,
      };
    }
    if (data.type === 'message_stop') {
      return {
        content: '',
        isEnd: true,
      };
    }
    if (data.type === 'error') {
      return {
        content: '',
        error: {
          type: data.delta.type,
          message: data.delta.text,
        },
      };
    }
    if (data.type === 'ping') {
      return {
        content: '',
        isEnd: false,
      };
    }
    console.warn('Unknown message type', data);
    return {
      content: '',
      isEnd: false,
    };
  }

  /**
   * Extracts tool information from a chat response message.
   * @param respMsg - Chat response message that may contain tool calls
   * @returns Tool object with id and name, or null if no tools are present
   */
  protected parseTools(respMsg: IChatResponseMessage): ITool | null {
    if (respMsg.toolCalls && respMsg.toolCalls.length > 0) {
      return {
        id: respMsg.toolCalls[0].id,
        name: respMsg.toolCalls[0].name,
      };
    }
    return null;
  }

  /**
   * Extracts tool arguments from a chat response message.
   * @param respMsg - Chat response message containing tool call data
   * @returns Object with index and args properties, or null if no tool arguments are available
   */
  protected parseToolArgs(respMsg: IChatResponseMessage): {
    index: number;
    args: string;
  } | null {
    debug('parseToolArgs', JSON.stringify(respMsg));
    try {
      if (respMsg.isEnd || !respMsg.toolCalls) {
        return null;
      }
      return respMsg.toolCalls[0];
    } catch (err) {
      console.error('parseToolArgs', err);
    }
    return null;
  }
}
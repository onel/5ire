import Debug from 'debug';
import { IChatResponseMessage } from 'intellichat/types';
import BaseReader from './BaseReader';
import IChatReader, { ITool } from './IChatReader';

const debug = Debug('5ire:intellichat:OpenAIReader');

/**
 * OpenAI-specific implementation of the chat reader interface.
 * Handles parsing of OpenAI API responses for chat completions.
 */
export default class OpenAIReader extends BaseReader implements IChatReader {
  /**
   * Parses a raw chunk of data from OpenAI API response into a structured chat message.
   * 
   * @param chunk - Raw JSON string chunk from the OpenAI API response
   * @returns Parsed chat response message containing content, reasoning, and tool calls
   * @throws Error if the response contains an error message
   */
  protected parseReply(chunk: string): IChatResponseMessage {
    const data = JSON.parse(chunk);
    if (data.error) {
      throw new Error(data.error.message || data.error);
    }
    if (data.choices.length === 0) {
      return {
        content: '',
        reasoning: '',
        isEnd: false,
        toolCalls: [],
      };
    }
    const choice = data.choices[0];
    return {
      content: choice.delta.content || '',
      reasoning: choice.delta.reasoning_content || '',
      isEnd: false,
      toolCalls: choice.delta.tool_calls,
    };
  }

  /**
   * Extracts tool information from a chat response message.
   * 
   * @param respMsg - The chat response message to parse for tool calls
   * @returns Tool object with id and name if tool calls exist, null otherwise
   */
  protected parseTools(respMsg: IChatResponseMessage): ITool | null {
    if (respMsg.toolCalls && respMsg.toolCalls.length > 0) {
      return {
        id: respMsg.toolCalls[0].id,
        name: respMsg.toolCalls[0].function.name,
      };
    }
    return null;
  }

  /**
   * Extracts tool arguments from a chat response message.
   * 
   * @param respMsg - The chat response message to parse for tool arguments
   * @returns Object containing index and arguments string if available, null otherwise
   */
  protected parseToolArgs(respMsg: IChatResponseMessage): {
    index: number;
    args: string;
  } | null {
    try {
      if (respMsg.isEnd || !respMsg.toolCalls) {
        return null;
      }
      const toolCalls = respMsg.toolCalls[0];
      return {
        index: toolCalls.index || 0,
        args: toolCalls.function?.arguments || '',
      };
    } catch (err) {
      console.error('parseToolArgs', err);
    }
    return null;
  }
}
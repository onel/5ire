import { IChatContext } from 'intellichat/types';
import OpenAIChatService from './OpenAIChatService';
import Grok from '../../providers/Grok';
import INextChatService from './INextCharService';

/**
 * Chat service implementation that uses the Grok provider for AI conversations.
 * Extends OpenAIChatService to inherit base chat functionality while using Grok as the underlying provider.
 */
export default class GrokChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new GrokChatService instance.
   * @param name - The name identifier for this chat service
   * @param chatContext - The chat context containing configuration and state information
   */
  constructor(name: string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = Grok;
  }
}
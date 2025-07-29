import { IChatContext } from 'intellichat/types';
import OpenAIChatService from './OpenAIChatService';
import LMStudio from '../../providers/LMStudio';
import INextChatService from './INextCharService';

/**
 * Chat service implementation that uses LMStudio as the underlying provider.
 * Extends OpenAIChatService to provide LMStudio-specific chat functionality.
 */
export default class LMStudioChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new LMStudioChatService instance.
   * @param name - The name identifier for this chat service
   * @param chatContext - The chat context containing configuration and state information
   */
  constructor(name:string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = LMStudio;
  }
}
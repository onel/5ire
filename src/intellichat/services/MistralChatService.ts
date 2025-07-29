import { IChatContext } from 'intellichat/types';
import OpenAIChatService from './OpenAIChatService';
import Mistral from '../../providers/Mistral';
import INextChatService from './INextCharService';

/**
 * Chat service implementation that uses Mistral as the underlying provider.
 * Extends OpenAIChatService to inherit base chat functionality while using
 * Mistral-specific provider implementation.
 */
export default class MistralChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new MistralChatService instance.
   * @param name - The name identifier for this chat service
   * @param chatContext - The chat context containing configuration and state information
   */
  constructor(name:string, chatContext: IChatContext) {
    super(name, chatContext);
    this.provider = Mistral;
  }

}
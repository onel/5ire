import Debug from 'debug';
import { IChatContext } from 'intellichat/types';
import Moonshot from 'providers/Moonshot';
import OpenAIChatService from './OpenAIChatService';
import INextChatService from './INextCharService';

// const debug = Debug('5ire:intellichat:MoonshotChatService');

/**
 * Chat service implementation that uses the Moonshot provider.
 * Extends OpenAIChatService to provide Moonshot-specific chat functionality.
 */
export default class MoonshotChatService
  extends OpenAIChatService
  implements INextChatService
{
  /**
   * Creates a new MoonshotChatService instance.
   * @param {string} name - The name identifier for this chat service
   * @param {IChatContext} context - The chat context containing configuration and state
   */
  constructor(name:string, context: IChatContext) {
    super(name, context);
    this.provider = Moonshot;
  }

}
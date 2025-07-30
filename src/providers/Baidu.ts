import { IServiceProvider } from './types';

/**
 * Array of available Baidu ERNIE chat models with their specifications and pricing
 * Each model object contains configuration details including context window, token limits, and pricing
 */
const chatModels = [
  {
    id: 'ERNIE-4.0-8K',
    name: 'ERNIE-4.0-8K',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§è¶…å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç›¸è¾ƒERNIE 3.5å®žçŽ°äº†æ¨¡åž‹èƒ½åŠ›å…¨é�¢å�‡çº§ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚ ç™¾åº¦æ–‡å¿ƒç³»åˆ—ä¸­æ•ˆæžœæœ€å¼ºå¤§çš„â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç�†è§£ã€�ç”Ÿæˆ�ã€�é€»è¾‘ã€�è®°å¿†èƒ½åŠ›è¾¾åˆ°ä¸šç•Œé¡¶å°–æ°´å¹³ã€‚`,
    isDefault: true,
  },
  {
    id: 'ERNIE-4.0-8K-Preview',
    name: 'ERNIE-4.0-8K-Preview',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§è¶…å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç›¸è¾ƒERNIE 3.5å®žçŽ°äº†æ¨¡åž‹èƒ½åŠ›å…¨é�¢å�‡çº§ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚`,
  },
  {
    id: 'ERNIE-4.0-8K-Latest',
    name: 'ERNIE-4.0-8K-Latest',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ERNIE-4.0-8K-Latestç›¸æ¯”ERNIE-4.0-8Kèƒ½åŠ›å…¨é�¢æ��å�‡ï¼Œå…¶ä¸­è§’è‰²æ‰®æ¼”èƒ½åŠ›å’ŒæŒ‡ä»¤é�µå¾ªèƒ½åŠ›æ��å�‡è¾ƒå¤§ï¼›ç›¸è¾ƒERNIE 3.5å®žçŽ°äº†æ¨¡åž‹èƒ½åŠ›å…¨é�¢å�‡çº§ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆï¼Œæ”¯æŒ�5K tokensè¾“å…¥+2K tokensè¾“å‡ºã€‚`,
  },
  {
    id: 'ERNIE-4.0-Turbo-8K',
    name: 'ERNIE-4.0-Turbo-8K',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ERNIE 4.0 Turboæ˜¯ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§è¶…å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç»¼å�ˆæ•ˆæžœè¡¨çŽ°å‡ºè‰²ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚ç›¸è¾ƒäºŽERNIE 4.0åœ¨æ€§èƒ½è¡¨çŽ°ä¸Šæ›´ä¼˜ç§€`,
  },
  {
    id: 'ERNIE-4.0-Turbo-8K-Preview',
    name: 'ERNIE-4.0-Turbo-8K-Preview',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ERNIE 4.0 Turboæ˜¯ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§è¶…å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç»¼å�ˆæ•ˆæžœè¡¨çŽ°å‡ºè‰²ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚ç›¸è¾ƒäºŽERNIE 4.0åœ¨æ€§èƒ½è¡¨çŽ°ä¸Šæ›´ä¼˜ç§€`,
  },
  {
    id: 'ERNIE-4.0-Turbo-8K-Latest',
    name: 'ERNIE-4.0-Turbo-8K-Latest',
    contextWindow: 5120,
    maxTokens: 2048,
    inputPrice: 0.03,
    outputPrice: 0.09,
    description: `ERNIE 4.0 Turboæ˜¯ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§è¶…å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œç»¼å�ˆæ•ˆæžœè¡¨çŽ°å‡ºè‰²ï¼Œå¹¿æ³›é€‚ç”¨äºŽå�„é¢†åŸŸå¤�æ�‚ä»»åŠ¡åœºæ™¯ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚ç›¸è¾ƒäºŽERNIE 4.0åœ¨æ€§èƒ½è¡¨çŽ°ä¸Šæ›´ä¼˜ç§€`,
  },
  {
    id: 'ERNIE-3.5-8K',
    name: 'ERNIE-3.5-8K',
    contextWindow: 124000,
    maxTokens: 2048,
    inputPrice: 0.0008,
    outputPrice: 0.002,
    description: `ç™¾åº¦è‡ªç ”çš„æ——èˆ°çº§å¤§è§„æ¨¡â¼¤è¯­â¾”æ¨¡åž‹ï¼Œè¦†ç›–æµ·é‡�ä¸­è‹±æ–‡è¯­æ–™ï¼Œå…·æœ‰å¼ºå¤§çš„é€šç”¨èƒ½åŠ›ï¼Œå�¯æ»¡è¶³ç»�å¤§éƒ¨åˆ†å¯¹è¯�é—®ç­”ã€�åˆ›ä½œç”Ÿæˆ�ã€�æ�’ä»¶åº”ç”¨åœºæ™¯è¦�æ±‚ï¼›æ”¯æŒ�è‡ªåŠ¨å¯¹æŽ¥ç™¾åº¦æ�œç´¢æ�’ä»¶ï¼Œä¿�éšœé—®ç­”ä¿¡æ�¯æ—¶æ•ˆã€‚`,
  },
];

/**
 * Baidu service provider configuration object
 * Defines the API endpoints, authentication requirements, and chat model configurations for Baidu's ERNIE models
 * 
 * @property {string} name - The display name of the service provider
 * @property {string} apiBase - The base URL for API requests
 * @property {string} currency - The currency used for pricing (Chinese Yuan)
 * @property {Object} options - Configuration options for API customization
 * @property {string} description - Instructions for obtaining API credentials
 * @property {Object} chat - Chat-specific configuration including models, parameters, and API schema
 */
export default {
  name: 'Baidu',
  apiBase: 'https://api.baidu.com/v1',
  currency: 'CNY',
  options: {
    apiBaseCustomizable: false,
    apiKeyCustomizable: true,
  },
  description:
    '[API key] çš„èŽ·å�–å�‚è€ƒï¼šhttps://cloud.baidu.com/doc/qianfan-api/s/ym9chdsy5',
  chat: {
    /** API schema requirements for authentication and configuration */
    apiSchema: ['base', 'key', 'proxy'],
    /** Documentation for API key location */
    docs: {
      apiKey: 'ç”¨æˆ·è´¦å�·->å®‰å…¨è®¤è¯�->[API Key]',
    },
    /** Presence penalty parameter configuration (penalty_score) */
    presencePenalty: { min: 1, max: 2, default: 1 }, // penalty_score
    /** Top-p sampling parameter configuration */
    topP: { min: 0, max: 1, default: 0.8 }, // (0, 1]
    /** Temperature parameter configuration for response randomness */
    temperature: {
      min: 0,
      max: 1,
      default: 0.95,
      interval: {
        leftOpen: true,
        rightOpen: false,
      },
    }, // (0, 1]
    /** Chat-specific options */
    options: {
      modelCustomizable: true,
    },
    /** Available chat models */
    models: chatModels,
  },
} as IServiceProvider;
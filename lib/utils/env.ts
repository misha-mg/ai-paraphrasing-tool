export interface EnvConfig {
  openaiApiKey?: string;
  geminiApiKey?: string;
  openaiModel?: string;
  geminiModel?: string;
  openaiProject?: string;
  openaiOrg?: string;
  openaiApiBase?: string;
  appUrl: string;
  appName: string;
  aiTimeoutMs: number;
  maxInputLength: number;
  minInputLength: number;
  enableRateLimiting: boolean;
  enableAnalytics: boolean;
  logLevel: string;
}

export function getEnvConfig(): EnvConfig {
  return {
    openaiApiKey: process.env.OPENAI_API_KEY,
    geminiApiKey: process.env.GEMINI_API_KEY,
    openaiModel: process.env.OPENAI_MODEL,
    geminiModel: process.env.GEMINI_MODEL,
    openaiProject: process.env.OPENAI_PROJECT,
    openaiOrg: process.env.OPENAI_ORG,
    openaiApiBase: process.env.OPENAI_API_BASE || 'https://api.openai.com/v1',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'AI Paraphrasing Tool',
    aiTimeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '3000', 10),
    maxInputLength: parseInt(process.env.MAX_INPUT_LENGTH || '5000', 10),
    minInputLength: parseInt(process.env.MIN_INPUT_LENGTH || '10', 10),
    enableRateLimiting: process.env.ENABLE_RATE_LIMITING === 'true',
    enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
    logLevel: process.env.LOG_LEVEL || 'info',
  };
}

export function hasAIProviders(): boolean {
  const config = getEnvConfig();
  return !!(config.openaiApiKey || config.geminiApiKey);
}

export function validateEnv(): void {
  if (typeof window !== 'undefined') {
    return;
  }

  const config = getEnvConfig();

  if (!hasAIProviders()) {
    throw new Error(
      'At least one AI provider API key must be configured (OPENAI_API_KEY or GEMINI_API_KEY)'
    );
  }

  if (config.aiTimeoutMs < 1000 || config.aiTimeoutMs > 30000) {
    throw new Error('AI_TIMEOUT_MS must be between 1000 and 30000');
  }

  if (config.maxInputLength < 100) {
    throw new Error('MAX_INPUT_LENGTH must be at least 100');
  }

  if (config.minInputLength < 1) {
    throw new Error('MIN_INPUT_LENGTH must be at least 1');
  }
}

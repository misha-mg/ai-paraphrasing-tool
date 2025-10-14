import { ProviderConfig } from '@/lib/ai/types';
import { getEnvConfig } from '@/lib/utils/env';

export enum ProviderPriority {
  PRIMARY = 1,
  SECONDARY = 2,
  TERTIARY = 3,
}

export interface ProviderMetadata {
  name: string;
  displayName: string;
  priority: ProviderPriority;
  models: string[];
  defaultModel: string;
}

export const PROVIDERS_METADATA: Record<string, ProviderMetadata> = {
  openai: {
    name: 'openai',
    displayName: 'OpenAI',
    priority: ProviderPriority.PRIMARY,
    models: ['gpt-5'],
    defaultModel: 'gpt-5',
  },
  gemini: {
    name: 'gemini',
    displayName: 'Google Gemini',
    priority: ProviderPriority.SECONDARY,
    models: ['gemini-2.5-flash'],
    defaultModel: 'gemini-2.5-flash',
  },
};

export function getProviderConfigs(): ProviderConfig[] {
  const env = getEnvConfig();
  const configs: ProviderConfig[] = [];

  if (env.openaiApiKey) {
    configs.push({
      name: 'openai',
      apiKey: env.openaiApiKey,
      timeout: env.aiTimeoutMs,
      enabled: true,
    });
  }

  if (env.geminiApiKey) {
    configs.push({
      name: 'gemini',
      apiKey: env.geminiApiKey,
      timeout: env.aiTimeoutMs,
      enabled: true,
    });
  }

  return configs.sort((a, b) => {
    const priorityA = PROVIDERS_METADATA[a.name]?.priority || 999;
    const priorityB = PROVIDERS_METADATA[b.name]?.priority || 999;
    return priorityA - priorityB;
  });
}

export const createParaphrasePrompt = (text: string, instructions?: string): string => {
  const base = 'Paraphrase the following text.';
  const rules = instructions && instructions.trim() ? `\nFollow these formatting instructions precisely: ${instructions.trim()}` : '';
  return `${base}${rules}\nText: ${text}`;
};

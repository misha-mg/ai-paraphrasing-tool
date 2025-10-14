import { AIProvider, ProviderConfig } from '@/lib/ai/types';
import { getProviderConfigs } from '@/config/ai-providers.config';
import { OpenAIProvider } from '@/lib/ai/providers/openai.provider';
import { GeminiProvider } from '@/lib/ai/providers/gemini.provider';

export class ProviderFactory {
  static createProviders(): AIProvider[] {
    const configs = getProviderConfigs();
    const providers: AIProvider[] = [];

    for (const cfg of configs) {
      const instance = this.createProvider(cfg);
      if (instance && instance.isAvailable()) {
        providers.push(instance);
      }
    }

    return providers;
  }

  static createProvider(config: ProviderConfig): AIProvider | null {
    switch (config.name) {
      case 'openai':
        return new OpenAIProvider(config);
      case 'gemini':
        return new GeminiProvider(config);
      default:
        return null;
    }
  }
}

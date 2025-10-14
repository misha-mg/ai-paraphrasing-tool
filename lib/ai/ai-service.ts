import { ProviderFactory } from '@/lib/ai/provider-factory';
import { AIProvider } from '@/lib/ai/types';
import { logger } from '@/lib/utils/logger';
import { ParaphraseResult } from '@/types/paraphrase.types';
import { getEnvConfig } from '@/lib/utils/env';
import { PROVIDERS_METADATA } from '@/config/ai-providers.config';

export class AIService {
  private providers: AIProvider[];

  constructor() {
    this.providers = ProviderFactory.createProviders();
  }

  async paraphrase(text: string, model?: string): Promise<ParaphraseResult> {
    if (this.providers.length === 0) {
      throw new Error('No AI providers configured');
    }

    // If a specific model is requested, prefer providers that support it
    const providersOrdered = (() => {
      if (!model) return this.providers;
      const supports = (provider: AIProvider) => {
        const key = provider.name.toLowerCase();
        const models = PROVIDERS_METADATA[key]?.models || [];
        return models.includes(model);
      };
      const matching = this.providers.filter(supports);
      if (matching.length > 0) {
        const nonMatching = this.providers.filter((p) => !supports(p));
        return [...matching, ...nonMatching];
      }
      return this.providers;
    })();

    const [primary, ...rest] = providersOrdered;
    const startedAtByProvider: Record<string, number> = {};

    const callWrapped = async (provider: AIProvider) => {
      startedAtByProvider[provider.name] = Date.now();
      try {
        const result = await this.callProvider(provider, text, model);
        const elapsed = Date.now() - startedAtByProvider[provider.name];
        logger.info('provider.success', { provider: provider.name, ms: elapsed });
        return result;
      } catch (error: any) {
        const elapsed = Date.now() - startedAtByProvider[provider.name];
        logger.warn('provider.failed', { provider: provider.name, ms: elapsed, error: String(error?.message || error) });
        throw error;
      }
    };

    const timeoutMs = getEnvConfig().aiTimeoutMs;

    const primaryPromise = callWrapped(primary);
    const timeoutPromise = new Promise<'timeout'>((resolve) => setTimeout(() => resolve('timeout'), timeoutMs));

    const outcome = await Promise.race<
      'primary_ok' | 'primary_err' | 'timeout'
    >([
      primaryPromise.then(() => 'primary_ok', () => 'primary_err'),
      timeoutPromise,
    ]);

    if (outcome === 'primary_ok') {
      const winner = await primaryPromise;
      return {
        text: winner.text,
        provider: winner.provider,
        success: true,
        timestamp: new Date().toISOString(),
      };
    }

    const restPromises = rest.map((p) => callWrapped(p));
    const racePool = outcome === 'timeout' ? [primaryPromise, ...restPromises] : restPromises;

    const winner = await Promise.any(racePool);

    return {
      text: winner.text,
      provider: winner.provider,
      success: true,
      timestamp: new Date().toISOString(),
    };
  }

  private async callProvider(provider: AIProvider, text: string, model?: string) {
    const content = await provider.paraphrase(text, model);
    return { text: content, provider: provider.name };
  }
}



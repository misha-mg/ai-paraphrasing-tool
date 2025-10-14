import { AIProvider, ProviderConfig, ProviderTimeoutError, ProviderUnavailableError } from '@/lib/ai/types';

export abstract class BaseAIProvider implements AIProvider {
  abstract name: string;
  protected apiKey: string;
  protected timeout: number;

  constructor(config: ProviderConfig) {
    this.apiKey = config.apiKey;
    this.timeout = config.timeout;
  }

  abstract paraphrase(text: string): Promise<string>;

  isAvailable(): boolean {
    return Boolean(this.apiKey);
  }

  protected async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    let timeoutHandle: any;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => reject(new ProviderTimeoutError(this.name, timeoutMs)), timeoutMs);
    });
    try {
      const result = await Promise.race([promise, timeoutPromise]);
      return result as T;
    } finally {
      clearTimeout(timeoutHandle);
    }
  }

  protected ensureConfigured(): void {
    if (!this.isAvailable()) {
      throw new ProviderUnavailableError(this.name);
    }
  }
}

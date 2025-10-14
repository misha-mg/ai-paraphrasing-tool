export interface AIProvider {
  name: string;
  paraphrase(text: string): Promise<string>;
  isAvailable(): boolean;
}

export interface ProviderConfig {
  name: string;
  apiKey: string;
  timeout: number;
  enabled: boolean;
}

export interface ProviderResponse {
  text: string;
  provider: string;
  success: boolean;
  responseTime?: number;
  error?: string;
}

export class AIServiceError extends Error {
  constructor(
    message: string,
    public provider?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AIServiceError';
  }
}

export class ProviderTimeoutError extends AIServiceError {
  constructor(provider: string, timeout: number) {
    super(`${provider} timed out after ${timeout}ms`, provider);
    this.name = 'ProviderTimeoutError';
  }
}

export class ProviderUnavailableError extends AIServiceError {
  constructor(provider: string) {
    super(`${provider} is not available or not configured`, provider);
    this.name = 'ProviderUnavailableError';
  }
}

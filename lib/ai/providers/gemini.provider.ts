import { BaseAIProvider } from '@/lib/ai/providers/base.provider';
import { ProviderConfig } from '@/lib/ai/types';
import { createParaphrasePrompt, PROVIDERS_METADATA } from '@/config/ai-providers.config';
import { getEnvConfig } from '@/lib/utils/env';

export class GeminiProvider extends BaseAIProvider {
  name = 'Gemini';

  constructor(config: ProviderConfig) {
    super(config);
  }

  async paraphrase(text: string): Promise<string> {
    this.ensureConfigured();

    const model = getEnvConfig().geminiModel || PROVIDERS_METADATA.gemini.defaultModel;

    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: createParaphrasePrompt(text),
            },
          ],
        },
      ],
    } as const;

    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${this.apiKey}`;

    const request = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini ${res.status}: ${errText}`);
      }
      const data = await res.json();
      // Attempt to extract text from candidates → content → parts[] → text
      const parts = data?.candidates?.[0]?.content?.parts;
      let content = '';
      if (Array.isArray(parts)) {
        content = parts
          .map((p: any) => (typeof p?.text === 'string' ? p.text : ''))
          .filter(Boolean)
          .join('\n')
          .trim();
      }
      if (!content) {
        // Fallbacks for alternative response shapes
        content =
          data?.candidates?.[0]?.content?.text ||
          data?.candidates?.[0]?.output_text ||
          data?.output_text || '';
        content = typeof content === 'string' ? content.trim() : '';
      }
      if (!content) {
        throw new Error('Invalid Gemini response');
      }
      return content;
    });

    return request;
  }
}



import { BaseAIProvider } from '@/lib/ai/providers/base.provider';
import { ProviderConfig } from '@/lib/ai/types';
import { createParaphrasePrompt, PROVIDERS_METADATA } from '@/config/ai-providers.config';
import { getEnvConfig } from '@/lib/utils/env';

export class OpenAIProvider extends BaseAIProvider {
  name = 'OpenAI';

  constructor(config: ProviderConfig) {
    super(config);
  }

  async paraphrase(text: string, modelOverride?: string): Promise<string> {
    this.ensureConfigured();

    const model = modelOverride || getEnvConfig().openaiModel || PROVIDERS_METADATA.openai.defaultModel;
    const body = {
      model,
      messages: [
        { role: 'user', content: createParaphrasePrompt(text) },
      ],
      temperature: 0.3,
    } as const;

    const env = getEnvConfig();
    const apiBase = String(env.openaiApiBase || 'https://api.openai.com/v1').replace(/\/$/, '');

    const isResponsesModel = /(^|\b)(gpt-5|o3)/i.test(model);

    const endpoint = isResponsesModel
      ? `${apiBase}/responses`
      : `${apiBase}/chat/completions`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    if (env.openaiProject) headers['OpenAI-Project'] = env.openaiProject;
    if (env.openaiOrg) headers['OpenAI-Organization'] = env.openaiOrg;

    const request = fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(
        isResponsesModel
          ? {
              model,
              input: createParaphrasePrompt(text),
            }
          : body
      ),
    }).then(async (res) => {
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenAI ${res.status}: ${errText}`);
      }
      const data = await res.json();

      if (typeof data?.output_text === 'string' && data.output_text.trim()) {
        return String(data.output_text).trim();
      }
      if (Array.isArray(data?.output)) {
        const parts: string[] = [];
        for (const item of data.output) {
          const content = item && item.content;
          if (Array.isArray(content)) {
            for (const c of content) {
              if (typeof c?.text === 'string') parts.push(c.text);
              else if (typeof c?.text?.value === 'string') parts.push(c.text.value);
              else if (typeof c?.value === 'string') parts.push(c.value);
            }
          }
        }
        if (parts.length) return parts.join('\n').trim();
      }

      const content = data?.choices?.[0]?.message?.content;
      if (!content || typeof content !== 'string') {
        throw new Error('Invalid OpenAI response');
      }
      return content.trim();
    });

    return request;
  }
}



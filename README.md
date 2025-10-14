## AI Paraphrasing

A minimal Next.js app for fast, reliable paraphrasing. It supports multiple AI providers (OpenAI and Google Gemini) with automatic failover and timeouts for responsiveness.

### Features
- **Multi‑provider**: OpenAI and Gemini; auto‑fallback if one fails or times out
- **Simple UI**: Paste text, paraphrase, copy the result
- **Server API**: Clean `/api/paraphrase` endpoint with validation and basic rate‑limit guard
- **Config via env**: Models, timeouts, limits, analytics flags

### Requirements
- Node.js 18+ (recommended 18.18+)
- An API key for at least one provider: OpenAI or Google Gemini

### Quick Start
1) Install dependencies
```bash
npm install
```

2) Configure environment
```bash
cp env.example .env.local
# Open .env.local and set at least one key
# OPENAI_API_KEY=...      # or
# GEMINI_API_KEY=...
```

3) Run the dev server
```bash
npm run dev
```

4) Open the app
`http://localhost:3000`

### Scripts
- `npm run dev`: start Next.js in development
- `npm run build`: production build (also generates sitemap)
- `npm run start`: start production server
- `npm run lint`: run ESLint
- `npm run lint:fix`: run ESLint with auto-fixes
- `npm run typecheck`: run TypeScript type checker (no emit)
- `npm run check`: run typecheck then lint


### Environment Variables (common)
Copy from `env.example` and adjust as needed:
```bash
# At least one of these is required
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=sk-...

# Optional model overrides
OPENAI_MODEL=gpt-4o-mini
GEMINI_MODEL=gemini-1.5-flash

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AI Paraphrasing Tool"

# Behavior
AI_TIMEOUT_MS=3000
MAX_INPUT_LENGTH=5000
MIN_INPUT_LENGTH=10
ENABLE_RATE_LIMITING=false
ENABLE_ANALYTICS=false
LOG_LEVEL=info
```

### How It Works
- **UI** (`components/paraphrase/*`): The `useParaphraseFlow` hook posts input to the API and handles loading/error/success.
- **API** (`app/api/paraphrase/route.ts`): Validates input, sanitizes text, calls the AI service, returns paraphrase.
- **AI service** (`lib/ai/ai-service.ts`): Calls all configured providers in parallel and returns the first successful result.
- **Providers** (`lib/ai/providers/*`): Thin wrappers for OpenAI and Gemini HTTP APIs with per‑call timeouts.

### Project Structure (high level)
```text
app/
  api/paraphrase/route.ts   # POST endpoint
  page.tsx                  # UI entry
components/
  paraphrase/               # UI components
lib/
  ai/                       # AI service and providers
  api/paraphrase.ts         # Client fetcher
  utils/env.ts              # Env loading/validation
config/
  ai-providers.config.ts    # Provider metadata and prompts
```

### Troubleshooting
- **"At least one AI provider API key must be configured"**: Set `OPENAI_API_KEY` or `GEMINI_API_KEY` in `.env.local`.
- **Timeouts**: Increase `AI_TIMEOUT_MS` cautiously (1000–30000 ms supported).
- **Validation errors**: Input must be within `MIN_INPUT_LENGTH` and `MAX_INPUT_LENGTH`.

### Production
```bash
npm run build
npm run start
```
Set `NEXT_PUBLIC_APP_URL` to your deployed URL. Works well on platforms like Vercel or any Node host.



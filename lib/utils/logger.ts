type Level = 'debug' | 'info' | 'warn' | 'error';

const levelOrder: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const envLevel = (process.env.LOG_LEVEL as Level) || 'info';

function shouldLog(level: Level) {
  return levelOrder[level] >= levelOrder[envLevel];
}

export const logger = {
  debug: (...args: any[]) => {
    if (shouldLog('debug')) console.debug('[debug]', ...args);
  },
  info: (...args: any[]) => {
    if (shouldLog('info')) console.info('[info]', ...args);
  },
  warn: (...args: any[]) => {
    if (shouldLog('warn')) console.warn('[warn]', ...args);
  },
  error: (...args: any[]) => {
    if (shouldLog('error')) console.error('[error]', ...args);
  },
};



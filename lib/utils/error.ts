export function toErrorMessage(err: unknown, fallback = 'Unexpected error') {
  if (!err) return fallback;
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message || fallback;
  if (typeof (err as any).message === 'string') return (err as any).message;
  try {
    return JSON.stringify(err);
  } catch {
    return fallback;
  }
}



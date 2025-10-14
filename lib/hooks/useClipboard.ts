'use client';

import { useState } from 'react';
import { readFromClipboard, writeToClipboard } from '@/lib/utils/clipboard';

export function useClipboard() {
  const [error, setError] = useState<string | null>(null);

  const paste = async (): Promise<string | null> => {
    try {
      setError(null);
      const text = await readFromClipboard();
      return text;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  };

  const copy = async (text: string): Promise<boolean> => {
    try {
      setError(null);
      await writeToClipboard(text);
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    }
  };

  return { paste, copy, error };
}


import { ERROR_MESSAGES } from './constants';

export async function readFromClipboard(): Promise<string> {
  if (!navigator?.clipboard) {
    throw new Error(ERROR_MESSAGES.CLIPBOARD_NOT_SUPPORTED);
  }

  try {
    const text = await navigator.clipboard.readText();
    if (!text || text.trim().length === 0) {
      throw new Error(ERROR_MESSAGES.CLIPBOARD_EMPTY);
    }
    return text;
  } catch (error: any) {
    if (error?.message === ERROR_MESSAGES.CLIPBOARD_EMPTY) {
      throw error;
    }
    throw new Error(ERROR_MESSAGES.CLIPBOARD_PERMISSION_DENIED);
  }
}

export async function writeToClipboard(text: string): Promise<void> {
  if (!navigator?.clipboard) {
    throw new Error(ERROR_MESSAGES.CLIPBOARD_NOT_SUPPORTED);
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    throw new Error(ERROR_MESSAGES.CLIPBOARD_PERMISSION_DENIED);
  }
}


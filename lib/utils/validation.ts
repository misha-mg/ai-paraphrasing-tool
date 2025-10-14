import { INPUT_CONSTRAINTS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateParaphraseInput(text: string): ValidationResult {
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      error: INPUT_CONSTRAINTS.REQUIRED_MESSAGE,
    };
  }

  const trimmedText = text.trim();

  if (trimmedText.length < INPUT_CONSTRAINTS.MIN_LENGTH) {
    return {
      isValid: false,
      error: INPUT_CONSTRAINTS.MIN_LENGTH_MESSAGE,
    };
  }

  if (trimmedText.length > INPUT_CONSTRAINTS.MAX_LENGTH) {
    return {
      isValid: false,
      error: INPUT_CONSTRAINTS.MAX_LENGTH_MESSAGE,
    };
  }

  return { isValid: true };
}

export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
}

export function isTextEmpty(text: string): boolean {
  return !text || text.trim().length === 0;
}

export function getCharacterCount(text: string): number {
  return text.length;
}

export function getWordCount(text: string): number {
  if (isTextEmpty(text)) {
    return 0;
  }
  return text.trim().split(/\s+/).length;
}

export function isValidLength(text: string): boolean {
  const length = text.trim().length;
  return (
    length >= INPUT_CONSTRAINTS.MIN_LENGTH &&
    length <= INPUT_CONSTRAINTS.MAX_LENGTH
  );
}

export function getRemainingCharacters(text: string): number {
  return INPUT_CONSTRAINTS.MAX_LENGTH - text.length;
}

export function validateAPIResponse(response: any): ValidationResult {
  if (!response) {
    return {
      isValid: false,
      error: 'Empty response received',
    };
  }

  if (response.error) {
    return {
      isValid: false,
      error: response.error,
    };
  }

  if (!response.paraphrasedText || typeof response.paraphrasedText !== 'string') {
    return {
      isValid: false,
      error: 'Invalid response format',
    };
  }

  return { isValid: true };
}

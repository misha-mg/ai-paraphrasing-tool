'use client';

import { useEffect, useState } from 'react';
import { ParaphraseStatus, initialParaphraseState, ParaphraseState } from '@/types/paraphrase.types';
import { paraphraseRequest } from '@/lib/api/paraphrase';
import { useClipboard } from './useClipboard';
import { validateParaphraseInput } from '@/lib/utils/validation';
import { DEFAULT_SAMPLE_TEXT, ERROR_MESSAGES, STORAGE_KEYS } from '@/lib/utils/constants';

export function useParaphraseFlow() {
  const [state, setState] = useState<ParaphraseState>(initialParaphraseState);
  const [rules, setRules] = useState<string>('');
  const clipboard = useClipboard();

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEYS.CUSTOM_RULES_V1) : null;
      if (stored && typeof stored === 'string') {
        setRules(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (rules && rules.trim()) {
          window.localStorage.setItem(STORAGE_KEYS.CUSTOM_RULES_V1, rules);
        } else {
          window.localStorage.removeItem(STORAGE_KEYS.CUSTOM_RULES_V1);
        }
      }
    } catch {}
  }, [rules]);

  const handleInputChange = (text: string) => {
    setState((prev) => ({
      ...prev,
      inputText: text,
      status: ParaphraseStatus.IDLE,
      error: null,
    }));
  };

  const handlePaste = async () => {
    const text = await clipboard.paste();
    if (text) {
      handleInputChange(text);
    } else if (clipboard.error) {
      setState((prev) => ({ ...prev, error: clipboard.error }));
    }
  };

  const handleSampleText = () => {
    handleInputChange(DEFAULT_SAMPLE_TEXT);
  };

  const handleParaphrase = async () => {
    const validation = validateParaphraseInput(state.inputText);
    if (!validation.isValid) {
      setState((prev) => ({ ...prev, error: validation.error || null }));
      return;
    }

    setState((prev) => ({ ...prev, status: ParaphraseStatus.LOADING, error: null }));

    let result: Awaited<ReturnType<typeof paraphraseRequest>> | null = null;
    try {
      result = await paraphraseRequest({ text: state.inputText, rules });
    } catch (e: any) {
      setState((prev) => ({
        ...prev,
        status: ParaphraseStatus.ERROR,
        error: e?.message || ERROR_MESSAGES.GENERIC,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      status: ParaphraseStatus.SUCCESS,
      outputText: result.paraphrasedText,
      usedProvider: result.provider,
      error: null,
    }));
  };

  const handleClear = () => {
    setState(initialParaphraseState);
  };

  const handleCopy = async () => {
    const success = await clipboard.copy(state.outputText);
    if (!success && clipboard.error) {
      setState((prev) => ({ ...prev, error: clipboard.error }));
    }
  };

  const handleNewText = () => {
    setState(initialParaphraseState);
  };

  const isParaphraseDisabled = !validateParaphraseInput(state.inputText).isValid;

  return {
    state,
    rules,
    setRules,
    handleInputChange,
    handlePaste,
    handleSampleText,
    handleParaphrase,
    handleClear,
    handleCopy,
    handleNewText,
    isParaphraseDisabled,
  };
}

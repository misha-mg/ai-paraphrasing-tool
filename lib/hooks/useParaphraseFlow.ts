'use client';

import { useState } from 'react';
import { ParaphraseStatus, initialParaphraseState, ParaphraseState } from '@/types/paraphrase.types';
import { paraphraseRequest } from '@/lib/api/paraphrase';
import { useClipboard } from './useClipboard';
import { validateParaphraseInput } from '@/lib/utils/validation';
import { DEFAULT_SAMPLE_TEXT, ERROR_MESSAGES, AVAILABLE_MODELS, MODEL_AUTO_VALUE } from '@/lib/utils/constants';

export function useParaphraseFlow() {
  const [state, setState] = useState<ParaphraseState>(initialParaphraseState);
  const [selectedModel, setSelectedModel] = useState<string>(MODEL_AUTO_VALUE);
  const [instructions, setInstructions] = useState<string>('');
  const clipboard = useClipboard();

  const handleInputChange = (text: string) => {
    setState((prev) => ({
      ...prev,
      inputText: text,
      status: ParaphraseStatus.IDLE,
      error: null,
    }));
  };

  const handleInstructionsChange = (text: string) => {
    setInstructions(text);
    setState((prev) => ({ ...prev, status: ParaphraseStatus.IDLE, error: null }));
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

    try {
      const payload = selectedModel === MODEL_AUTO_VALUE
        ? { text: state.inputText, instructions: instructions || undefined }
        : { text: state.inputText, model: selectedModel, instructions: instructions || undefined };
      const result = await paraphraseRequest(payload);
      setState((prev) => ({
        ...prev,
        status: ParaphraseStatus.SUCCESS,
        outputText: result.paraphrasedText,
        usedProvider: result.provider,
        error: null,
      }));
    } catch (e: any) {
      setState((prev) => ({
        ...prev,
        status: ParaphraseStatus.ERROR,
        error: e.message || ERROR_MESSAGES.GENERIC,
      }));
    }
  };

  const handleClear = () => {
    setState(initialParaphraseState);
  };

  const handleRetry = async () => {
    await handleParaphrase();
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
    selectedModel,
    setSelectedModel,
    instructions,
    handleInstructionsChange,
    handleInputChange,
    handlePaste,
    handleSampleText,
    handleParaphrase,
    handleClear,
    handleRetry,
    handleCopy,
    handleNewText,
    isParaphraseDisabled,
  };
}


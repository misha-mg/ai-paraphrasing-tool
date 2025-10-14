export enum ParaphraseStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ParaphraseState {
  inputText: string;
  outputText: string;
  status: ParaphraseStatus;
  error: string | null;
  usedProvider: string | null;
}

export interface ParaphraseResult {
  text: string;
  provider: string;
  success: boolean;
  timestamp: string;
  error?: string;
}

export const initialParaphraseState: ParaphraseState = {
  inputText: '',
  outputText: '',
  status: ParaphraseStatus.IDLE,
  error: null,
  usedProvider: null,
};

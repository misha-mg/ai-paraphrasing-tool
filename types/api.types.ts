export interface ParaphraseRequest {
  text: string;
  rules?: string;
}

export interface ParaphraseResponse {
  paraphrasedText: string;
  provider: string;
  timestamp: string;
}

export interface APIError {
  error: string;
  code?: string;
  details?: any;
  timestamp: string;
}

export type APIResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: APIError };

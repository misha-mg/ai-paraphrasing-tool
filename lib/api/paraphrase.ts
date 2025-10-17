import { API_ENDPOINTS } from '@/lib/utils/constants';
import { ParaphraseRequest, ParaphraseResponse } from '@/types/api.types';

export async function paraphraseRequest(payload: ParaphraseRequest): Promise<ParaphraseResponse> {
  const res = await fetch(API_ENDPOINTS.PARAPHRASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errorMessage = errorBody?.error || `Request failed with status ${res.status}`;
    throw new Error(errorMessage);
  }

  const data = (await res.json()) as ParaphraseResponse;
  return data;
}

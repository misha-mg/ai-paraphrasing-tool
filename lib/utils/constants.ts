export const INPUT_CONSTRAINTS = {
  MAX_LENGTH: 5000,
  MAX_LENGTH_MESSAGE: 'Text must not exceed 5000 characters',
  REQUIRED_MESSAGE: 'Enter text here or upload file to humanize it.',
} as const;

export const SAMPLE_TEXTS = [
  `The Border Collie is a highly intelligent and versatile breed known for its exceptional herding abilities. Originating from the border region between England and Scotland, this breed has been recognized as one of the most skilled working dogs in the world. With their distinctive appearance and remarkable intelligence, Border Collies have become a popular choice for both working and companion dogs.
Physically, Border Collies are medium-sized dogs with a well-proportioned body and a strong, agile build. They have a dense double coat that comes in a variety of colors, including black and white, red and white, and tricolor. Their expressive eyes, usually brown but sometimes blue, are one of their most striking features, reflecting their intelligence and eagerness to please.
Known for their boundless energy and drive, Border Collies thrive in an active lifestyle. They require ample exercise and mental stimulation to keep them happy and healthy. These dogs excel in various dog sports, such as agility, obedience, and flyball. They are also frequently used in search and rescue operations due to their exceptional scenting abilities.
Border Collies are highly trainable and eager to learn. Their intelligence and problem-solving skills make them quick learners, and they excel in obedience training. They have a natural instinct for herding, and even without formal training, they can display remarkable herding behaviors. However, their high energy levels and intense focus can sometimes make them challenging for novice dog owners.
In addition to their working abilities, Border Collies make excellent family pets for active households. They are known for their loyalty, affection, and strong bond with their owners. However, their herding instincts may lead them to nip or try to herd small children or other pets, so early socialization and training are crucial.
While Border Collies are generally healthy dogs, they may be prone to certain genetic health conditions such as hip dysplasia and epilepsy. Regular veterinary check-ups, a nutritious diet, and regular exercise are essential for maintaining their overall well-being.
In summary, the Border Collie is a remarkable breed with outstanding intelligence, agility, and herding instincts. Whether as a working dog or a loyal family companion, they bring joy, enthusiasm, and unwavering devotion to their owners.`
] as const;

export const DEFAULT_SAMPLE_TEXT = SAMPLE_TEXTS[0];

export const API_ENDPOINTS = {
  PARAPHRASE: '/api/paraphrase',
} as const;

export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NO_PROVIDERS: 'No AI providers are currently available. Please check your configuration.',
  ALL_PROVIDERS_FAILED: 'All AI providers failed to respond. Please try again later.',
  NETWORK_ERROR: 'Network error. Please check your internet connection and try again.',
  TIMEOUT: 'Request timed out. Please try again.',
  INVALID_RESPONSE: 'Received invalid response from server.',
  CLIPBOARD_NOT_SUPPORTED: 'Clipboard is not supported in your browser.',
  CLIPBOARD_PERMISSION_DENIED: 'Permission to access clipboard was denied.',
  CLIPBOARD_EMPTY: 'Clipboard is empty or contains no text.',
} as const;

export const SUCCESS_MESSAGES = {
  COPIED: 'Text copied to clipboard!',
  PARAPHRASED: 'Text successfully paraphrased!',
} as const;

export const BUTTON_LABELS = {
  PASTE: 'Paste Text',
  SAMPLE: 'Sample Text',
  PARAPHRASE: 'Paraphrase',
  CLEAR: 'Clear Input',
  TRY_AGAIN: 'Try Again',
  COPY: 'Copy to Clipboard',
  NEW_TEXT: 'Paraphrase New Text',
} as const;

export const A11Y_LABELS = {
  INPUT_AREA: 'Enter text to paraphrase',
  OUTPUT_AREA: 'Paraphrased text result',
  LOADING: 'Processing your text',
  ERROR: 'Error message',
} as const;


// Available model ids (flat list across providers; used for UI select)
export const AVAILABLE_MODELS = [
  'gpt-5',
  'gemini-2.5-flash',
] as const;

export const MODEL_AUTO_VALUE = 'auto';


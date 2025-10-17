'use client';

import { Box, Button, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextInputArea from './TextInputArea';
import { BUTTON_LABELS } from '@/lib/utils/constants';
import { editorOverlayButtonSx, editorRootBoxSx, editorClearButtonSx, editorParaphraseButtonSx, errorTextSx } from './styles';

interface ParaphraseEditorProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onPaste: () => void;
  onSampleText: () => void;
  onParaphrase: () => void;
  onClear: () => void;
  isParaphraseDisabled: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export default function ParaphraseEditor({
  inputText,
  onInputChange,
  onPaste,
  onSampleText,
  onParaphrase,
  onClear,
  isParaphraseDisabled,
  isLoading = false,
  isSuccess = false,
  isError = false,
  errorMessage,
}: ParaphraseEditorProps) {
  const hasText = inputText.trim().length > 0;
  return (
    <Box sx={editorRootBoxSx}>
      <TextInputArea
        value={inputText}
        onChange={onInputChange}
        disabled={isLoading}
        textColor={isSuccess ? '#000000' : undefined}
        overlay={
          !hasText && !isLoading && !isSuccess ? (
            <>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={onPaste}
                sx={editorOverlayButtonSx}
              >
                {BUTTON_LABELS.PASTE}
              </Button>
              <Button
                variant="outlined"
                startIcon={<DescriptionOutlinedIcon />}
                onClick={onSampleText}
                sx={editorOverlayButtonSx}
              >
                {BUTTON_LABELS.SAMPLE}
              </Button>
            </>
          ) : null
        }
        bottomOverlay={
          !isSuccess ? (
            <>
             {hasText && !isLoading && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CloseIcon />}
                  onClick={onClear}
                sx={editorClearButtonSx}
                >
                  {BUTTON_LABELS.CLEAR}
                </Button>
              )}
              <Button
                variant="contained"
                onClick={onParaphrase}
                disabled={isParaphraseDisabled || isLoading}
                sx={editorParaphraseButtonSx}
              >
                {isLoading ? 'Paraphrasing' : BUTTON_LABELS.PARAPHRASE}
              </Button>
            </>
          ) : undefined
        }
      />
      {isError && errorMessage && (
        <Typography sx={errorTextSx}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}



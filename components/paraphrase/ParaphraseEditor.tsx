'use client';

import { Box, Button, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextInputArea from './TextInputArea';
import { BUTTON_LABELS } from '@/lib/utils/constants';

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
  onCopy?: () => void;
  onNewText?: () => void;
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
  onCopy,
  onNewText,
}: ParaphraseEditorProps) {
  const hasText = inputText.trim().length > 0;
  const overlayButtonSx = {
    minWidth: { xs: '8.75rem', sm: '12.25rem' },
    height: { xs: '4rem', sm: '5rem' },
    px: { xs: '0.375rem', sm: '0.5rem' },
    py: { xs: '0.75rem', sm: '1rem' },
    borderRadius: { xs: '0.5rem', sm: '0.6875rem' },
    borderWidth: '1px',
    color: '#76777A',
    borderColor: '#76777A',
    backgroundColor: '#FFFFFF',
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: '0.25rem', sm: '0.5rem' },
    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
    '& .MuiButton-startIcon': { margin: 0 },
    '& .MuiSvgIcon-root': { color: 'currentColor', fontSize: { xs: '1.25rem', sm: '1.5rem' } },
  } as const;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <TextInputArea
        value={inputText}
        onChange={onInputChange}
        label="Enter your text to paraphrase"
        disabled={isLoading}
        textColor={isSuccess ? '#000000' : undefined}
        overlay={
          !hasText && !isLoading && !isSuccess ? (
            <>
              <Button
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={onPaste}
                sx={overlayButtonSx}
              >
                {BUTTON_LABELS.PASTE}
              </Button>
              <Button
                variant="outlined"
                startIcon={<DescriptionOutlinedIcon />}
                onClick={onSampleText}
                sx={overlayButtonSx}
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
                sx={{
                  borderRadius: '9999px',
                  px: { xs: 2, sm: 3 },
                  width: 'fit-content',
                  background: '#EEF0F5',
                  color: '#254699',
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  '& .MuiSvgIcon-root': { fontSize: { xs: '1.125rem', sm: '1.25rem' } }
                }}
                >
                  {BUTTON_LABELS.CLEAR}
                </Button>
              )}
              <Button
                variant="contained"
                onClick={onParaphrase}
                disabled={isParaphraseDisabled || isLoading}
                sx={{
                  borderRadius: '9999px',
                  px: { xs: 2, sm: 3 },
                  width: 'fit-content',
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                }}
              >
                {isLoading ? 'Paraphrasing' : BUTTON_LABELS.PARAPHRASE}
              </Button>
            </>
          ) : undefined
        }
      />
      {isError && errorMessage && (
        <Typography sx={{ mt: { xs: '0.5rem', sm: '0.75rem' }, px: { xs: '0.75rem', sm: '1rem' }, color: '#FF3B30', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}



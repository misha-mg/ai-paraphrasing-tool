'use client';

import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextInputArea from './TextInputArea';
import { BUTTON_LABELS, AVAILABLE_MODELS, MODEL_AUTO_VALUE } from '@/lib/utils/constants';

interface InitialScreenProps {
  inputText: string;
  onInputChange: (text: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
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

export default function InitialScreen({
  inputText,
  onInputChange,
  selectedModel,
  onModelChange,
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
}: InitialScreenProps) {
  const hasText = inputText.trim().length > 0;
  const overlayButtonSx = {
    minWidth: { xs: '140px', sm: '196px' },
    height: { xs: '64px', sm: '80px' },
    px: { xs: '6px', sm: '8px' },
    py: { xs: '12px', sm: '16px' },
    borderRadius: { xs: '8px', sm: '11px' },
    borderWidth: '1px',
    color: '#76777A',
    borderColor: '#76777A',
    backgroundColor: '#FFFFFF',
    textTransform: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: '4px', sm: '8px' },
    fontSize: { xs: '13px', sm: '14px' },
    '& .MuiButton-startIcon': { margin: 0 },
    '& .MuiSvgIcon-root': { color: 'currentColor', fontSize: { xs: '20px', sm: '24px' } },
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
              <FormControl size="small" color="secondary" sx={{ minWidth: 200 }}>
                <InputLabel id="model-select-label">Model</InputLabel>
                <Select
                  labelId="model-select-label"
                  id="model-select"
                  value={selectedModel}
                  label="Model"
                  onChange={(e) => onModelChange(String(e.target.value))}
                >
                  <MenuItem value={MODEL_AUTO_VALUE}>Fastest (auto)</MenuItem>
                  {AVAILABLE_MODELS.map((m) => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                    fontSize: { xs: '13px', sm: '14px' },
                    '& .MuiSvgIcon-root': { fontSize: { xs: '18px', sm: '20px' } }
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
                  fontSize: { xs: '13px', sm: '14px' },
                }}
              >
                {isLoading ? 'Paraphrasing' : BUTTON_LABELS.PARAPHRASE}
              </Button>
            </>
          ) : undefined
        }
      />
      {isError && errorMessage && (
        <Typography sx={{ mt: { xs: '8px', sm: '12px' }, px: { xs: '12px', sm: '16px' }, color: '#FF3B30', fontSize: { xs: '12px', sm: '14px' } }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}


'use client';

import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { overlayButtonSxShared } from './styles';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TextInputArea from './TextInputArea';
import { BUTTON_LABELS, AVAILABLE_MODELS, MODEL_AUTO_VALUE, A11Y_LABELS } from '@/lib/utils/constants';
import { useState } from 'react';

interface ParaphraseEditorProps {
  inputText: string;
  onInputChange: (text: string) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  instructions?: string;
  onInstructionsChange?: (text: string) => void;
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
  selectedModel,
  onModelChange,
  instructions,
  onInstructionsChange,
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
  const hasInstructions = Boolean(instructions && instructions.trim().length > 0);
  const overlayButtonSx = overlayButtonSxShared;
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const CUSTOM_RULES_STORAGE_KEY = 'customRules';

  const handleSaveRules = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CUSTOM_RULES_STORAGE_KEY, instructions || '');
      }
    } catch (_e) {
      // ignore storage errors
    }
  };

  const handleOpenRules = () => {
    try {
      if (typeof window !== 'undefined') {
        const saved = window.localStorage.getItem(CUSTOM_RULES_STORAGE_KEY);
        if (saved != null && saved !== (instructions || '')) {
          onInstructionsChange?.(saved);
        }
      }
    } catch (_e) {
      // ignore storage errors
    }
    setIsRulesOpen(true);
  };

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
              <Button
                variant="outlined"
                color="primary"
                onClick={handleOpenRules}
                sx={{ borderRadius: '9999px', px: { xs: 2, sm: 3 }, width: { xs: '100%', sm: 'fit-content' }, fontSize: { xs: '13px', sm: '14px' } }}
              >
                Custom rules
              </Button>
              <FormControl size="small" color="secondary" fullWidth sx={{ minWidth: { sm: 200 }, width: { xs: '100%', sm: 'auto' } }}>
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
                  fullWidth
                  sx={{
                    borderRadius: '9999px',
                    px: { xs: 2, sm: 3 },
                    width: { xs: '100%', sm: 'fit-content' },
                    background: '#A68F97',
                    color: '#1F2024',
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
                fullWidth
                sx={{
                  borderRadius: '9999px',
                  px: { xs: 2, sm: 3 },
                  width: { xs: '100%', sm: 'fit-content' },
                  fontSize: { xs: '13px', sm: '14px' },
                }}
              >
                {isLoading ? 'Paraphrasing' : BUTTON_LABELS.PARAPHRASE}
              </Button>
            </>
          ) : undefined
        }
      />
      <Dialog open={isRulesOpen} onClose={() => setIsRulesOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Custom rules</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            multiline
            minRows={6}
            label="Formatting rules"
            placeholder="E.g., Use bullet points, keep sentences under 20 words, preserve citations..."
            value={instructions || ''}
            onChange={(e) => onInstructionsChange?.(e.target.value)}
            inputProps={{ 'aria-label': A11Y_LABELS.INSTRUCTIONS }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSaveRules}>Save</Button>
          <Button variant="text" onClick={() => setIsRulesOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {isError && errorMessage && (
        <Typography sx={{ mt: { xs: '8px', sm: '12px' }, px: { xs: '12px', sm: '16px' }, color: '#A68F97', fontSize: { xs: '12px', sm: '14px' } }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}


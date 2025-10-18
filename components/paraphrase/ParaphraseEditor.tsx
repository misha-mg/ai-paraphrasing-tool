'use client';

import React from 'react';
import { Box, Button, Typography, Chip, Stack } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TextInputArea from './TextInputArea';
import { BUTTON_LABELS } from '@/lib/utils/constants';
import { editorOverlayButtonSx, editorRootBoxSx, editorClearButtonSx, editorParaphraseButtonSx, errorTextSx, settingsBadgeContainerSx, settingsButtonSx } from './styles';
import CustomRulesDialog from './CustomRulesDialog';

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
  rules?: string;
  onRulesChange?: (value: string) => void;
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
  rules,
  onRulesChange,
}: ParaphraseEditorProps) {
  const hasText = inputText.trim().length > 0;
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [rulesText, setRulesText] = React.useState(rules || '');
  React.useEffect(() => {
    setRulesText(rules || '');
  }, [rules]);
  const hasRules = rulesText.trim().length > 0;

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);
  const handleSaveRules = () => {
    if (onRulesChange) onRulesChange(rulesText);
    setIsSettingsOpen(false);
  };
  return (
    <Box sx={editorRootBoxSx}>
      <Box sx={settingsBadgeContainerSx}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<SettingsOutlinedIcon />}
          onClick={openSettings}
          sx={settingsButtonSx}
        >
          Settings
          {hasRules && (
            <Chip size="small" color="primary" label="1" sx={{ ml: 1, height: 18 }} />
          )}
        </Button>
      </Box>
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
      <CustomRulesDialog
        open={isSettingsOpen}
        value={rulesText}
        onChange={setRulesText}
        onClose={closeSettings}
        onSave={handleSaveRules}
      />
    </Box>
  );
}



'use client';

import { TextField, Box, Typography } from '@mui/material';
import { createTextAreaSx } from './styles';
import { ReactNode, useMemo } from 'react';
import { A11Y_LABELS, INPUT_CONSTRAINTS } from '@/lib/utils/constants';
import { getCharacterCount } from '@/lib/utils/validation';

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  overlay?: ReactNode;
  bottomOverlay?: ReactNode;
  textColor?: string;
}

export default function TextInputArea({
  value,
  onChange,
  placeholder = 'Enter your text here...',
  disabled = false,
  label,
  overlay,
  bottomOverlay,
  textColor,
}: TextInputAreaProps) {
  const charCount = getCharacterCount(value);
  const isOverLimit = charCount > INPUT_CONSTRAINTS.MAX_LENGTH;
  const hasValue = value.trim().length > 0;

  const textAreaSx = useMemo(() => createTextAreaSx({ hasValue, textColor }), [hasValue, textColor]);

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          multiline
          rows={12}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          variant="outlined"
          inputProps={{
            'aria-label': A11Y_LABELS.INPUT_AREA,
            maxLength: INPUT_CONSTRAINTS.MAX_LENGTH,
          }}
          error={isOverLimit}
          sx={textAreaSx}
        />
        {overlay && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <Box sx={{ display: 'flex', gap: { xs: 0.75, sm: 1 }, pointerEvents: 'auto', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
              {overlay}
            </Box>
          </Box>
        )}
      </Box>
      {bottomOverlay && (
        <Box
          sx={{
            mt: { xs: 1, sm: 1.25 },
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: { xs: 'stretch', sm: 'flex-end' },
            p: { xs: 0.75, sm: 1 },
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: { xs: '12px', sm: '16px' },
          }}
        >
          <Box sx={{ display: 'flex', gap: { xs: '8px', sm: '8px' }, alignItems: { xs: 'stretch', sm: 'center' }, flexDirection: { xs: 'column', sm: 'row' }, width: { xs: '100%', sm: 'auto' } }}>
            {bottomOverlay}
          </Box>
        </Box>
      )}
    </Box>
  );
}

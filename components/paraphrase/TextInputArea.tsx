'use client';

import { TextField, Box, Typography } from '@mui/material';
import { createTextAreaSx } from './styles';
import { ReactNode } from 'react';
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

  return (
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
        sx={createTextAreaSx({ hasValue, textColor })}
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
      {bottomOverlay && (
        <Box
          sx={{
            position: 'absolute',
            left: 1,
            right: 1,
            bottom: 1,
            zIndex: 2,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'flex-end',
            p: { xs: 0.75, sm: 1 },
            pointerEvents: 'none',
            borderBottomLeftRadius: { xs: '12px', sm: '16px' },
            borderBottomRightRadius: { xs: '12px', sm: '16px' },
            borderTop: hasValue ? '1px solid rgba(0, 0, 0, 0.23)' : 'none',
          }}
        >
          <Box sx={{ display: 'flex', gap: { xs: '6px', sm: '8px' }, alignItems: 'center', pointerEvents: 'auto' }}>
            {bottomOverlay}
          </Box>
        </Box>
      )}
    </Box>
  );
}

'use client';

import { TextField, Box, Typography } from '@mui/material';
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const bottomOverlayRef = useRef<HTMLDivElement | null>(null);
  const [bottomOverlayHeight, setBottomOverlayHeight] = useState<number>(0);

  // Measure bottom overlay height to add adequate padding so text isn't obscured
  useLayoutEffect(() => {
    if (!bottomOverlayRef.current) {
      setBottomOverlayHeight(0);
      return;
    }
    setBottomOverlayHeight(bottomOverlayRef.current.offsetHeight || 0);
  }, [bottomOverlay, hasValue]);

  useEffect(() => {
    const handleResize = () => {
      if (!bottomOverlayRef.current) return;
      setBottomOverlayHeight(bottomOverlayRef.current.offsetHeight || 0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: hasValue ? '#FFFFFF' : '#EEF0F5',
            borderRadius: { xs: '0.75rem', sm: '1rem' },
            '& fieldset': {
              borderRadius: { xs: '0.75rem', sm: '1rem' },
            },
            boxShadow: 'none',
          },
          '& .MuiOutlinedInput-input': textColor ? {
            color: textColor,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: { xs: 1.4, sm: 1.5 },
            paddingBottom: bottomOverlay ? `${Math.max(bottomOverlayHeight, 0) + 8}px` : undefined,
          } : {
            fontSize: { xs: '0.875rem', sm: '1rem' },
            lineHeight: { xs: 1.4, sm: 1.5 },
            paddingBottom: bottomOverlay ? `${Math.max(bottomOverlayHeight, 0) + 8}px` : undefined,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderWidth: '1px',
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            boxShadow: 'none',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderWidth: '1px',
          },
        }}
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
          ref={bottomOverlayRef}
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
            borderBottomLeftRadius: { xs: '0.75rem', sm: '1rem' },
            borderBottomRightRadius: { xs: '0.75rem', sm: '1rem' },
            borderTop: hasValue ? '1px solid rgba(0, 0, 0, 0.23)' : 'none',
          }}
        >
          <Box sx={{ display: 'flex', gap: { xs: '0.375rem', sm: '0.5rem' }, alignItems: 'center', pointerEvents: 'auto' }}>
            {bottomOverlay}
          </Box>
        </Box>
      )}
    </Box>
  );
}

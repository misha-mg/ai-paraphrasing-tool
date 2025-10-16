'use client';

import { TextField, Box, Typography } from '@mui/material';
import { textInputWrapperSx, getTextFieldSx, overlayContainerSx, overlayInnerSx, getBottomOverlayContainerSx, bottomOverlayInnerSx } from './styles';
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
    <Box sx={textInputWrapperSx}>
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
        sx={getTextFieldSx({
          hasValue,
          hasBottomOverlay: Boolean(bottomOverlay),
          bottomOverlayHeight,
          textColor,
        })}
      />
      {overlay && (
        <Box sx={overlayContainerSx}>
          <Box sx={overlayInnerSx}>
            {overlay}
          </Box>
        </Box>
      )}
      {bottomOverlay && (
        <Box
          ref={bottomOverlayRef}
          sx={getBottomOverlayContainerSx(hasValue)}
        >
          <Box sx={bottomOverlayInnerSx}>
            {bottomOverlay}
          </Box>
        </Box>
      )}
    </Box>
  );
}

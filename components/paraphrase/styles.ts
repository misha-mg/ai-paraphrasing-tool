import { SxProps, Theme } from '@mui/material/styles';

// ParaphraseContainer styles
export const containerSx: SxProps<Theme> = {
  maxWidth: '90rem',
  margin: '0 auto',
  px: { xs: 2, sm: 3 },
};

export const contentBoxSx: SxProps<Theme> = {
  py: { xs: 3, sm: 4, md: 6 },
};

export const titleSx: SxProps<Theme> = {
  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
  mb: { xs: 1, sm: 2 },
};

export const subtitleSx: SxProps<Theme> = {
  mb: { xs: 3, sm: 4, md: 6 },
  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.375rem' },
};

// ParaphraseEditor styles
export const editorRootBoxSx: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
};

export const editorOverlayButtonSx: SxProps<Theme> = {
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
};

export const editorClearButtonSx: SxProps<Theme> = {
  borderRadius: '9999px',
  px: { xs: 2, sm: 3 },
  width: 'fit-content',
  background: '#EEF0F5',
  color: '#254699',
  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
  '& .MuiSvgIcon-root': { fontSize: { xs: '1.125rem', sm: '1.25rem' } },
};

export const editorParaphraseButtonSx: SxProps<Theme> = {
  borderRadius: '9999px',
  px: { xs: 2, sm: 3 },
  width: 'fit-content',
  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
};

export const errorTextSx: SxProps<Theme> = {
  mt: { xs: '0.5rem', sm: '0.75rem' },
  px: { xs: '0.75rem', sm: '1rem' },
  color: '#FF3B30',
  fontSize: { xs: '0.75rem', sm: '0.875rem' },
};

// TextInputArea styles
export const textInputWrapperSx: SxProps<Theme> = {
  position: 'relative',
};

export const getTextFieldSx = (params: {
  hasValue: boolean;
  hasBottomOverlay: boolean;
  bottomOverlayHeight: number;
  textColor?: string;
}): SxProps<Theme> => {
  const { hasValue, hasBottomOverlay, bottomOverlayHeight, textColor } = params;
  const baseInput = {
    fontSize: { xs: '0.875rem', sm: '1rem' },
    lineHeight: { xs: 1.4, sm: 1.5 },
    paddingBottom: hasBottomOverlay ? `${Math.max(bottomOverlayHeight, 0) + 8}px` : undefined,
    paddingRight: '12px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(59, 90, 174, 0.5) transparent',
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(59, 90, 174, 0.5)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(59, 90, 174, 0.8)',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-corner': {
      background: 'transparent',
    },
  } as const;

  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: hasValue ? '#FFFFFF' : '#EEF0F5',
      borderRadius: { xs: '0.75rem', sm: '1rem' },
      '& fieldset': {
        borderRadius: { xs: '0.75rem', sm: '1rem' },
      },
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-input': textColor ? { ...baseInput, color: textColor } : baseInput,
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
  };
};

export const overlayContainerSx: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  pointerEvents: 'none',
};

export const overlayInnerSx: SxProps<Theme> = {
  display: 'flex',
  gap: { xs: 0.75, sm: 1 },
  pointerEvents: 'auto',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
};

export const getBottomOverlayContainerSx = (hasValue: boolean): SxProps<Theme> => ({
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
});

export const bottomOverlayInnerSx: SxProps<Theme> = {
  display: 'flex',
  gap: { xs: '0.375rem', sm: '0.5rem' },
  alignItems: 'center',
  pointerEvents: 'auto',
};


// Settings badge (Custom Rules) styles
export const settingsBadgeContainerSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mb: { xs: 0.5, sm: 1 },
};

export const settingsButtonSx: SxProps<Theme> = {
  textTransform: 'none',
  fontSize: { xs: '0.75rem', sm: '0.875rem' },
  borderRadius: '9999px',
  px: { xs: 1, sm: 1.5 },
  py: 0.5,
};


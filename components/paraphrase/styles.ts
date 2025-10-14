export const createTextAreaSx = (
  options: {
    hasValue?: boolean;
    textColor?: string;
    reservedBottomSpace?: number;
  } = {}
) => {
  const { hasValue = false, textColor } = options;
  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: hasValue ? '#FFFFFF' : '#f5f5f5',
      borderRadius: { xs: '12px', sm: '16px' },
      '& fieldset': {
        borderRadius: { xs: '12px', sm: '16px' },
      },
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-input': textColor
      ? {
          color: textColor,
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: { xs: 1.4, sm: 1.5 },
        }
      : {
          fontSize: { xs: '14px', sm: '16px' },
          lineHeight: { xs: 1.4, sm: 1.5 },
        },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A68F97',
      borderWidth: '1px',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A68F97',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A68F97',
      borderWidth: '1px',
    },
  } as const;
};

export const overlayButtonSxShared = {
  minWidth: { xs: '140px', sm: '196px' },
  height: { xs: '64px', sm: '80px' },
  px: { xs: '6px', sm: '8px' },
  py: { xs: '12px', sm: '16px' },
  borderRadius: { xs: '8px', sm: '11px' },
  borderWidth: '1px',
  color: '#79717A',
  borderColor: '#79717A',
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

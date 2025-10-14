import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004F4D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A68F97',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#1F2024',
      secondary: '#79717A',
    },
  },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '9999px',
          padding: '12px 16px',
          fontSize: '14px',
          boxShadow: 'none',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            backgroundColor: '#004F4D',
            color: '#FFFFFF',
            boxShadow: 'none',
            border: 'solid 1px #004F4D',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#004F4D',
              boxShadow: 'none',
              border: 'solid 1px #004F4D',
            },
            '&:disabled': {
              border: 'solid 1px #79717A',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary', disabled: true },
          style: {
            '&.Mui-disabled': {
              backgroundColor: '#79717A',
              color: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#A68F97',
            color: '#1F2024',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#004F4D',
              color: '#FFFFFF',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            color: '#004F4D',
            borderColor: '#004F4D',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#004F4D',
              color: '#FFFFFF',
              borderColor: '#004F4D',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            color: '#A68F97',
            borderColor: '#A68F97',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#A68F97',
              color: '#1F2024',
              borderColor: '#A68F97',
            },
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            color: '#004F4D',
            '&:hover': {
              backgroundColor: '#004F4D',
              color: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            color: '#A68F97',
            '&:hover': {
              backgroundColor: '#A68F97',
              color: '#1F2024',
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      variants: [
        {
          props: { size: 'small', color: 'secondary' },
          style: {
            borderRadius: '9999px',
            backgroundColor: '#EEF0F5',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A68F97',
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A68F97',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#A68F97',
              borderWidth: '1px',
            },
            '& .MuiSelect-select': {
              padding: '10px 16px',
            },
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#A68F97',
        },
        select: {
          paddingRight: '40px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        selected: {
          backgroundColor: '#A68F97 !important',
          color: '#1F2024',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

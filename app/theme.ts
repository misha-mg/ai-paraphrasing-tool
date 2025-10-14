import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3B5AAE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#254699',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
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
            backgroundColor: '#3B5AAE',
            color: '#FFFFFF',
            boxShadow: 'none',
            border: 'solid 1px #3B5AAE',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              color: '#3B5AAE',
              boxShadow: 'none',
              border: 'solid 1px #3B5AAE',
            },
            '&:disabled': {
              border: 'solid 1px #AEAFB1',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'primary', disabled: true },
          style: {
            '&.Mui-disabled': {
              backgroundColor: '#AEAFB1',
              color: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            backgroundColor: '#EEF0F5',
            color: '#254699',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#254699',
              color: '#EEF0F5',
              boxShadow: 'none',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            color: '#3B5AAE',
            borderColor: '#3B5AAE',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#3B5AAE',
              color: '#FFFFFF',
              borderColor: '#3B5AAE',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'secondary' },
          style: {
            color: '#254699',
            borderColor: '#254699',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#254699',
              color: '#EEF0F5',
              borderColor: '#254699',
            },
          },
        },
        {
          props: { variant: 'text', color: 'primary' },
          style: {
            color: '#3B5AAE',
            '&:hover': {
              backgroundColor: '#3B5AAE',
              color: '#FFFFFF',
            },
          },
        },
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            color: '#254699',
            '&:hover': {
              backgroundColor: '#254699',
              color: '#EEF0F5',
            },
          },
        },
      ],
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

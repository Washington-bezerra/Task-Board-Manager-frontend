import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#7c3aed',
        contrastText: '#fff',
      },
      secondary: {
        main: '#f59e42',
      },
      ...(mode === 'light'
        ? {
            background: {
              default: '#f6f7fb',
              paper: '#f9fafb',
            },
            text: {
              primary: '#222',
            },
          }
        : {
            background: {
              default: '#181a20',
              paper: '#23262f',
            },
            text: {
              primary: '#f5f5f5',
            },
          }),
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: [
        'Inter',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ].join(','),
      h3: {
        fontWeight: 800,
        letterSpacing: '-1px',
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 12,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: 'none',
            fontWeight: 600,
            paddingLeft: 24,
            paddingRight: 24,
            fontSize: '1rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0 2px 16px 0 rgba(124,58,237,0.08)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  }); 
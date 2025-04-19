import {createTheme} from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#E2A04A',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: '#90caf9',
          textDecoration: 'underline',
          '&:hover': {
            color: '#E2A04A',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1e1e1e, #121212)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '0.6em 1.2em',
          transition: 'background-color 0.25s, border-color 0.25s',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#90caf9',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#90caf9',
            },
          },
        },
      },
    },
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#1e1e1e',
    //       color: '#ffffff',
    //       borderRadius: '8px',
    //     },
    //     footerContainer: {
    //       backgroundColor: '#121212',
    //       color: '#ffffff',
    //     },
    //   },
    // },
  },
});

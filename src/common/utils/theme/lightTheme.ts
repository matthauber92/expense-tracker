import {createTheme, ThemeOptions} from '@mui/material/styles'
// import '@mui/x-data-grid/themeAugmentation'

// Shared configuration for the light theme
const commonOptions: Omit<ThemeOptions, 'palette'> = {
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h6: {fontWeight: 600},
    button: {textTransform: 'none' as const, fontWeight: 500},
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {margin: 0, padding: 0},
        a: {textDecoration: 'none', '&:hover': {opacity: 0.8}},
      },
    },
    MuiAppBar: {styleOverrides: {root: {boxShadow: 'none'}}},
    MuiButton: {styleOverrides: {root: {borderRadius: 4, padding: '0.5rem 1rem'}}},
    MuiTextField: {
      styleOverrides: {root: {'& .MuiOutlinedInput-root': {borderRadius: 4}}},
    },
    // MuiDataGrid: {
    //   styleOverrides: {
    //     root: { border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif' },
    //     columnHeaders: { fontWeight: 600 },
    //     cell: { borderBottom: 'none' },
    //     row: { '&:nth-of-type(odd)': {} },
    //   },
    // },
  },
}

// Assemble full theme options
type LightThemeOptions = ThemeOptions & { palette: { mode: 'light' } }
const lightThemeOptions: LightThemeOptions = {
  palette: {mode: 'light'},
  ...commonOptions,
}

// Create and export the light theme
export const lightTheme = createTheme(lightThemeOptions)

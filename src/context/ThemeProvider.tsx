import {createContext, useContext, useMemo, useState, useEffect, ReactNode} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {lightTheme, darkTheme} from '@utils/theme'

// Context for theme mode
interface ThemeModeContextValue {
  mode: 'light' | 'dark'
  toggleMode: () => void
}

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined)

// Hook to access theme mode
export function useThemeMode() {
  const context = useContext(ThemeModeContext)
  if (!context) throw new Error('useThemeMode must be used within ThemeModeProvider')
  return context
}

// Provider component
interface ThemeModeProviderProps {
  children: ReactNode
}

export function ThemeModeProvider({children}: ThemeModeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    // initialize from localStorage or default to light
    const stored = localStorage.getItem('themeMode')
    return stored === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleMode = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeModeContext.Provider value={{mode, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}
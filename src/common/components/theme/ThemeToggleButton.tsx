import {IconButton} from "@mui/material";
import {useThemeMode} from "@context/ThemeProvider.tsx";
import {Brightness4, Brightness7} from '@mui/icons-material'

const ThemeToggleButton = () => {
  const {mode, toggleMode} = useThemeMode()
  return (
    <IconButton color="inherit" onClick={toggleMode} aria-label="toggle theme">
      {mode === 'light' ? <Brightness4/> : <Brightness7/>}
    </IconButton>
  )
}

export default ThemeToggleButton;
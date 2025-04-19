import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers'
import '@assets/fonts'
import {ThemeModeProvider} from "@context/ThemeProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App/>
      </LocalizationProvider>
    </ThemeModeProvider>
  </StrictMode>
)

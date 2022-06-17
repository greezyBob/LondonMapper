import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App'
import theme from './components/helpers/theme'
import { ThemeProvider } from '@emotion/react'

createRoot(document.getElementById('root')).render(<ThemeProvider theme={theme}> <App /></ThemeProvider>)
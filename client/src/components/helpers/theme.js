import { createTheme } from '@mui/material/styles'
import { cyan, red } from '@mui/material/colors'
const theme = createTheme({
  palette: {
    primary: {
      main: cyan[700],
    },
    secondary: {
      main: red[900],
    },
  },
})

export default theme
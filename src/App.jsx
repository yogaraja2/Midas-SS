import React from 'react'
import { mainRoute } from './routes'
import RouteMapper from './utils/Router/RouteMapper'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009FFD'
    },
    secondary: {
      main: '#3eb0b4'
    }
  },
  typography: {
    fontFamily: 'Phenomena, sans-serif',
    textTransform: 'none'
  },
  button: {
    textTransform: 'none'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="midas-container">
          <RouteMapper data={mainRoute} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

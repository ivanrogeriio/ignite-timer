// Router DOM
import { Routes, Route, BrowserRouter } from 'react-router-dom'

// Pages
import { History } from './pages/History'
import { Home } from './pages/Home'

// Theme
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}

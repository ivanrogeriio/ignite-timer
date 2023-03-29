// Router DOM
import { Routes, Route, BrowserRouter } from 'react-router-dom'

// Pages
import { History } from './pages/History'
import { Home } from './pages/Home'

// Theme
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { DefaultLayout } from './layouts/DefaultLayout'

export const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}

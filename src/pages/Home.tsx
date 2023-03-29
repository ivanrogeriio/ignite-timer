import { Button } from '../components/Button';

// Theme
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';
import { GlobalStyle } from '../styles/global';

export const Home = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='primary' />
      <Button variant='secondary' />
      <Button variant='success' />
      <Button variant='warning' />
      <Button variant='danger' />

      <GlobalStyle />
    </ThemeProvider>
  );
};

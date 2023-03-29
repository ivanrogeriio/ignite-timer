import { Button } from '../components/Button';

// Theme
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../styles/themes/default';

export const Home = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='primary' />
      <Button variant='secondary' />
      <Button variant='success' />
      <Button variant='warning' />
      <Button variant='danger' />
    </ThemeProvider>
  );
};

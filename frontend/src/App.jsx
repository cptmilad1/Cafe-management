import { BrowserRouter } from 'react-router';
import Router from './features/router/router';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    glass: {
      base: 'rgba(255, 255, 255, 0.06)',
      border: 'rgba(255, 255, 255, 0.18)',
    },
    accent: '#06b6d4',
  },
  fonts: {
    heading: "'cafe_font', ui-sans-serif, system-ui, sans-serif",
    body: "'cafe_font', ui-sans-serif, system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: '#0f172a',
        color: '#f1f5f9',
        overflowX: 'hidden',
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './App.scss';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

const App = () => {
  let theme = createTheme({
    typography: {
      fontFamily: ['"Kanit"', 'sans-serif'].join(','),
      fontSize: 12,
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
};

export default App;

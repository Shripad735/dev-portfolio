import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import useDarkMode from 'use-dark-mode';
// import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme } from './theme/themes';

function App() {
  window.matchMedia = null;
  // const darkMode = useDarkMode(true);

  return (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
  );
}

export default App;

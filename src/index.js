import React from 'react';
import ReactDOM from 'react-dom';
import { ColorModeScript } from '@chakra-ui/react';
import App from './app';
import theme from './app/theme';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
    />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

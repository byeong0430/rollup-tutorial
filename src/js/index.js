// Application entry point
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

// Load up the application styles
import '../scss/main.scss';

// Add a debugger
import debug from 'debug';
const log = debug('app:log');

// Disable logging in production
if (process.env.NODE_ENV !== 'production') {
  debug.enable('*');
  log('Logging is enabled!');

  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1" async></' + 'script>');
} else {
  debug.disable();
}

render(<App />, document.getElementById('react-root'));
// Load stylesheet
import '../styles/main.scss';

// Add a debugger
import debug from 'debug';
const log = debug('app:log');

// Disable logging in production
if (ENV !== 'production') {
  debug.enable('*');
  log('Logging is enabled!');

  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>');
} else {
  debug.disable();
}

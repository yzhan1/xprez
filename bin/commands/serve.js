import logSymbols from 'log-symbols';
import { log, marks } from '../utils';

export default (path) => {
  let message, success;

  try {
    const server = require(path).default;
    const port = server._events.request.config.port;
    
    message = `|  ${marks('success')}   App live on port ${port}...  ${marks('success')}  |`;
    success = true;
  } catch (e) {
    console.log(logSymbols.error, e);
    
    message = `|  ${marks('error')}   Failed to run Xprez app   ${marks('error')}  |`;
  } finally {
    log(success, '-----------------------------------------');
    log(success, message);
    log(success, '-----------------------------------------');
  }
}
import logSymbols from 'log-symbols';
import { log, marks } from '../utils';

export default (path) => {
  let message, success;

  try {
    require(path);
    
    message = `|  ${marks('success')}   Starting Xprez app.....   ${marks('success')}  |`;
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
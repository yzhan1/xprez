import chalk from 'chalk';
import logSymbols from 'log-symbols';

const log = (success, msg) => {
  success
    ? console.log(chalk.green.bold(msg))
    : console.log(chalk.red.bold(msg));
};

const marks = (flag) => `${logSymbols[flag]}${logSymbols[flag]}${logSymbols[flag]}`;

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
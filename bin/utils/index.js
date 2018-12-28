import chalk from 'chalk';
import logSymbols from 'log-symbols';
import TemplateUtils from './template-utils';

const log = (success, msg) => {
  success
    ? console.log(chalk.green.bold(msg))
    : console.log(chalk.red.bold(msg));
};

const marks = (flag) => `${logSymbols[flag]}${logSymbols[flag]}${logSymbols[flag]}`;

const capitalize = (word) => word[0].toUpperCase() + word.substr(1);

export {
  log, marks, capitalize, TemplateUtils
};
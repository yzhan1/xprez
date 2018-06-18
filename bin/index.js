#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const program = require('commander');

require = require('esm')(module);

const serve = require('./lib/serve').default;
const generate = require('./lib/generate').default;

const appFile = `${process.cwd()}/config/server`;

program
  .version('1.0.0', '-v, --version');

program
  .command('s')
  .description('[S]tart app server (cwd must be the project root directory with `src/config` inside it)')
  .action(() => serve(appFile));

program 
  .command('g <targetName>')
  .option('-c, --controller', '[G]enerate controller')
  .option('-s, --service', '[G]enerate a new service')
  .option('-v, --view', '[G]enerate a new view')
  .description('[G]enerate a new project/controller/service/view')
  .action(generate);
  
program.parse(process.argv);

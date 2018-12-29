#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const program = require('commander');

require = require('esm')(module);

const serve = require('./commands/serve').default;
const generate = require('./commands/generate').default;

const appFile = `${process.cwd()}/config/server`;

program
  .version('1.0.0', '-v, --version');

program
  .command('s')
  .description('[S]tart app server (cwd must be the project root directory with `./app` and `./config` inside it)')
  .action(() => serve(appFile));

program 
  .command('g <targetName>')
  .option('-c, --controller', 'Generate controller')
  .option('-s, --service', 'Generate a new service')
  .option('-u, --utility', 'Generate a new utility class')
  .description('[G]enerate a new project/controller/service/utility')
  .action(generate);
  
program.parse(process.argv);

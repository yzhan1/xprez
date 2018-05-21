#!/usr/bin/env node
'use strict';

const program = require('commander');

require('babel-register')({ presets: ['env'] });

const serve = require('./lib/serve').default;

const folderPath = `${process.cwd()}/src/config`;

program
  .version('1.0.0', '-v, --version')
  .option('s, serve', 'start app server (cwd must be the project root directory with `src/config` inside it)')
  .parse(process.argv);

if (program.serve) serve(folderPath);

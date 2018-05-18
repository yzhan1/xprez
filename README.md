# Xprez

[![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability) [![npm version](https://badge.fury.io/js/xprez.svg)](https://badge.fury.io/js/xprez) ![npm downloads](https://img.shields.io/npm/dt/xprez.svg)

A minimal opinionated web framework (built on top of [Express.js](https://github.com/expressjs/express/)) that separates router, controllers and services. 
Heavily inspired by [Egg.js](https://github.com/eggjs/egg).

### Getting Started

+ To install, run `npm i xprez --save`
+ To run the example, either
  + Clone the repo, `cd example` and run `npm install`, then run `npm start`
  + Or download the `./example` folder, change all `require('../../..')` to `require('xprez')`, and run `npm install` + `npm start`
+ To contribute, please first clone the repo, then run `npm install`

### Example Code Snippet

Sample directory is located in `./example`. 

![Example Code](./code.png)

### Required Folder Structure

To start app, run `node src/config`.

```
.
├── package-lock.json
├── package.json
└── src
    ├── config
        ├── dev.js
        ├── prod.js
        ├── index.js      ------> App's entry point
        └── routes.js  
    ├── controllers
        └── user.controller.js
    ├── services
        └── user.service.js
    └── views
        └── user.ejs
```
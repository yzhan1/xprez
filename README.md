# Xprez

![npm downloads](https://img.shields.io/npm/dt/xprez.svg?style=flat-square) ![npm](https://img.shields.io/npm/v/xprez.svg?style=flat-square) [![Maintainability](https://api.codeclimate.com/v1/badges/18a4dfac6bbc30040e34/maintainability)](https://codeclimate.com/github/yzhan1/xprez/maintainability) 

#### Notification: This is still a Work in Progress

A minimal opinionated ES6 web framework (built on top of [Express.js](https://github.com/expressjs/express/)) that separates router, controllers and services. 

Full documentation and CLI generator will be available soon.

Heavily inspired by [Egg.js](https://github.com/eggjs/egg) and [Ruby on Rails](https://github.com/rails/rails).

## Purpose of this Library
Imagine you work in a team of Express.js developers and everyone puts their code everywhere in the project (because Express.js has no restriction on code structure). This will soon make the code base messy and hard to maintain. With Xprez.js, you can easily apply MVC pattern to your web project, have a nice and clean Rails-ish folder structure and stop worrying about messy code base.

## Getting Started

To install:
```
npm i -S xprez
```
To run the example:
```
git clone https://github.com/yzhan1/xprez.git
cd xprez/
npm i
cd example/
xprez s
```
To contribute:
```
git clone https://github.com/yzhan1/xprez.git
cd xprez/
npm i
```

### Executable Bin

Apps need to be run with `xprez s` or `xprez serve`. The command-line runner will have a scaffolding option available soon.

### Example Code Snippet

Sample directory is located in `./example`. 

![Example Code](./code.png)

### Required Folder Structure

To start app, run `xprez s` or `xprez serve` in the root directory of your project. Notice that you need to strictly follow
this structure in order to make your app executable. You can run `xprez -h` to see all the available options.

```
.
├── package-lock.json
├── package.json
├── app
    ├── controllers
        └── user.controller.js
    ├── services
        └── user.service.js
    └── views
        └── user.ejs
└── config
    ├── environments
        ├── development.js
        ├── test.js
        └── production.js
    ├── server.js      ------> App's entry point
    └── routes.js 
```
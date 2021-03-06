# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2018-12-26

### Added

+ Finished project scaffolding option in CLI
+ Finished Controller/Service scaffolding option

### Changed

+ Improved README.md and documentation

## [2.2.1] - 2018-12-27

### Added

+ Travis CI integration
+ Documentation site using Docsify
+ `/test` folder generation

### Changed

+ Improved test documentation

## [2.2.3] - 2018-12-28

### Added

+ Added guidelines to extend framework
+ Added command to install package globally in README.md

### Changed

+ Changed morgan logger to use Rails style logging

### Removed

+ Deleted default EJS view engine

## [2.2.4] - 2018-12-29

### Added

+ Auto-loading for utility classes/functions
+ Documentation for utilities
+ Better testing support and documentation

### Changed

+ Modified `server.js` template to not run app server when testing

## [2.2.5] - 2018-12-30

### Added

+ Middlewares support. User can define middlewares that will be used before/after requests
+ Documentation on middlewares
+ Added `bodyParser` for request data parsing

### Changed

+ Fixed bugs for `POST` and `PUT` requests
+ Refactored middleware setup for the framework

## [2.3.0] - 2019-05-01

### Changed

+ Controller and Service instances now have `this` reference by default
+ Separated application and server startup logic in different files
+ Controller now extend from an `ApplicationController` class

# AngularSeed

This project will be used as a boilerplate for all angular project. Things that are used on a project:

## SCSS

Check SCSS documentation and get acquainted with it, also your component classes should be writted in BEM syntax. In short nested elements should have two underscores before name and states with two hyphen.

<nav class="navigation">
<a [class.navigation__button--active]="active " class="navigation__button"></a>
</nav>

## JSON-API

Check https://www.npmjs.com/package/angular2-jsonapi for json api documentation and also check `/demo/json-api` route when you run the project for implementation examples.

## Service Worker

Service worker already set up to cache static assets and can easily be extended to fit your needs (PWA, push notifications...)

## Loaders

There are two types of loaders: local and global. Local once will be displayed inside button, inputs.., globals will be displayed when fetch some data.

To implement local loader check `/demo/library` for it's implementation and also if you wish to replace current gif you just add one that you want and change name to one that is used by directive.

/_ TO ADD GLOBAL LOADER_/

## Components

/_ TO ADD COMPONENTS DESCRIPTION_/

## Clean code

After you've examined everything, clean up a code. To do that just run command `npm run clean`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

When creating components first enter module to which they belong and then name (lets say we have admin module and in it we want to create user component), so command will go like this `ng g c admin-user`.

## Build

Added `dop` flag so it doens't break connection with container when building app.

`git pull origin ${environment}`

`npm install`

environment: [development]

`npm run build`

environment: [stage]

`npm run build --configuration=stage`

environment: [master]

`npm run build --prod`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

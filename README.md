# AngularSeed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.26.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

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

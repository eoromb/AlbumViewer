##Docker deployment

1) Build image using `docker build -t albumviewer:1.0.0 -f nginx.dockerfile .` <br/>
2) Run image using `docker run -d -p 8080:80 albumviewer:1.0.0` <br/>
3) Navigate to `http://localhost:8080`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

1) Run `npm install` to install npm packages.
2) Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

1) Run `npm install` to install npm packages.
2) Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

1) Run `npm install` to install npm packages.
2) Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation

1) Run `npm install` to install npm packages.
2) Run `npm run compodoc` to generate documentation.
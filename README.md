## Description

Simple SPA to consume JSONPlaceholder Album API. <br/> 
Has 3 pages:
* Albums page
    * Displays albums in a grid
    * Uses different image placeholder color for each user
    * Displays title and user's name of album's owner
    * Supports server side pagination
* Photo page
    * Displays a page title consisting of album's owner and album's title
    * Displays the photos in a grid
    * Displays the title of the photo
    * Supports server side pagination of the photo thumbnails
* Photo detail modal
    * Displays the photo in full size
    * Displays the photo's owner, album and title

## Tech summary

* Angular + NgRx + CSS Grid + Material design
* Jasmine for testing
* Compodoc for documenting
* Docker for deployment

## Docker deployment

1) Build image using `docker build -t albumviewer:1.0.0 -f nginx.dockerfile .` <br/>
2) Run image using `docker run -d -p 8080:80 albumviewer:1.0.0` <br/>
3) Navigate to `http://localhost:8080`

## Development server

1) Run `npm install` to install npm packages. <br/>
2) Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

1) Run `npm install` to install npm packages. <br/>
2) Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

1) Run `npm install` to install npm packages. <br/>
2) Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

1) Run `npm install` to install npm packages. <br/>
2) Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation

1) Run `npm install` to install npm packages. <br/>
2) Run `npm run compodoc` to generate documentation.

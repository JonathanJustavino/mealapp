# The Meal App Frontend Client

This is the Frontend Client of the Meal App. In order to ensure that the project is running correctly follow
the instructions in the Setup section.

## Setup

1. Clone the repository
2. Install dependencies
3. Run the backend server
4. Run the frontend server

### Install dependencies

- run the following command in the frontend folder and the backend folder respectively

```bash
npm install
```

## Run the backend development server

- To start the local backend server in dev mode, run:

```zsh
npm run dev
```

## Run the frontend development server

- To start a local development server, run:

```bash
npm run start
```

Once the server and the frontend are running, open your browser and navigate to `http://localhost:4200/`.

### Additional Information

The meal data was scraped from [TheMealDB](https://www.themealdb.com/)
in order to bypass the rather slow fetching of each meal thumbnail.

#### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

#### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

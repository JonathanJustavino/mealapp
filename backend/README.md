# The Meal App Backend Server

This is the Backend Server of the Meal App. In order to ensure that the project is running correctly follow
the instructions in the Setup section.

## Setup

There are two ways to run this project:

1. Using git's worktree feature (recommended)
2. Cloning the repository twice

### 1. Using git worktree

1. Clone the `bare` repository:
```bash
git clone --bare git@github.com:JonathanJustavino/mealapp.git ./mealapp/.git/
```

2. Navigate into the mealapp directory and add both the `main` and the `backend` branch as worktrees
```bash
git worktree add main main
git worktree add backend backend
```

### 2. Cloning the repository twice

1. Clone the repository twice
2. Respectively check out the main and the backend branch


### Install dependencies

- Install all required dependencies in each branch/workstree respectively via:
```bash
npm install
```

## Run the frontend development server

- To start a local development server, run:

```bash
ng serve
```

## Run the backend development server

- To start the local backend server in dev mode, run:
```zsh
pn run dev
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

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
